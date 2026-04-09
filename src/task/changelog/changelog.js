const fs = require('fs').promises
const fsSync = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const getCommitsSinceLastBump = (repoDir) => {
    try {
        const bumps = execSync(
            'git log --oneline --grep="bump version" --grep="chore: bump" --grep="chore(release):" --format="%H" -2',
            { cwd: repoDir, encoding: 'utf-8' }
        ).trim().split('\n').filter(Boolean)

        if (bumps.length >= 1) {
            const afterBump = execSync(
                `git log --oneline --no-merges ${bumps[0]}..HEAD`,
                { cwd: repoDir, encoding: 'utf-8' }
            ).trim()
            if (afterBump) return afterBump
        }

        if (bumps.length >= 2) {
            const log = execSync(
                `git log --oneline --no-merges ${bumps[1]}..${bumps[0]}`,
                { cwd: repoDir, encoding: 'utf-8' }
            ).trim()
            if (log) return log
        }
    } catch (e) {}

    try {
        return execSync('git log --oneline --no-merges -20', { cwd: repoDir, encoding: 'utf-8' }).trim()
    } catch (e) {
        return ''
    }
}

const getLastPublishedVersion = async (packageName, repoDir) => {
    const nodeModulesPkgPath = path.resolve(repoDir, 'node_modules', packageName, 'package.json')
    try {
        const content = await fs.readFile(nodeModulesPkgPath, 'utf8')
        return JSON.parse(content).version
    } catch (e) {
        return null
    }
}

const getCommitForVersion = (repoDir, version) => {
    try {
        const commit = execSync(
            `git log --all --oneline --grep="v${version}" --grep="${version}" --format="%H" -1`,
            { cwd: repoDir, encoding: 'utf-8' }
        ).trim()
        if (commit) return commit
    } catch (e) {}

    try {
        const commit = execSync(
            `git log --all --oneline -S '"version": "${version}"' --format="%H" -- package.json | tail -1`,
            { cwd: repoDir, encoding: 'utf-8' }
        ).trim()
        if (commit) return commit
    } catch (e) {}

    return null
}

/**
 * Collect git logs from multiple repos.
 */
const collectLogs = async (options) => {
    const { cwd, repos } = options

    if (!repos || repos.length === 0) {
        const log = getCommitsSinceLastBump(cwd)
        return log ? [log] : []
    }

    const logs = []
    for (const repoCfg of repos) {
        const repoDir = path.resolve(cwd, repoCfg.dir)
        try {
            if (repoCfg.npmName) {
                const bumpLog = getCommitsSinceLastBump(repoDir)
                if (bumpLog) {
                    logs.push(`## ${repoCfg.dir}\n${bumpLog}`)
                    continue
                }

                const lastPublishedVersion = await getLastPublishedVersion(repoCfg.npmName, cwd)
                let sinceCommit = null
                if (lastPublishedVersion) {
                    sinceCommit = getCommitForVersion(repoDir, lastPublishedVersion)
                }

                let logCmd
                if (sinceCommit) {
                    logCmd = `git log --oneline --no-merges ${sinceCommit}..HEAD`
                } else {
                    let lastTag = ''
                    try {
                        lastTag = execSync('git describe --tags --abbrev=0 2>/dev/null', { cwd: repoDir, encoding: 'utf-8' }).trim()
                    } catch (e) {}
                    logCmd = lastTag ? `git log --oneline --no-merges ${lastTag}..HEAD` : 'git log --oneline --no-merges -20'
                }
                const log = execSync(logCmd, { cwd: repoDir, encoding: 'utf-8' }).trim()
                if (log) logs.push(`## ${repoCfg.dir}\n${log}`)
            } else {
                const bumpLog = getCommitsSinceLastBump(repoDir)
                if (bumpLog) {
                    logs.push(`## ${repoCfg.dir}\n${bumpLog}`)
                    continue
                }
                let lastTag = ''
                try {
                    lastTag = execSync('git describe --tags --abbrev=0 2>/dev/null', { cwd: repoDir, encoding: 'utf-8' }).trim()
                } catch (e) {}
                const logCmd = lastTag ? `git log --oneline --no-merges ${lastTag}..HEAD` : 'git log --oneline --no-merges -20'
                const log = execSync(logCmd, { cwd: repoDir, encoding: 'utf-8' }).trim()
                if (log) logs.push(`## ${repoCfg.dir}\n${log}`)
            }
        } catch (e) {
            console.error(`Failed to get git log for ${repoCfg.dir}:`, e.message)
        }
    }
    return logs
}

/**
 * Archive previous year entries from change-log.md into change-log.YYYY.md
 * Only runs when the current year differs from the year of existing entries.
 */
const archivePreviousYear = async (changelogPath, cwd) => {
    const currentYear = new Date().getFullYear()

    let changelog
    try {
        changelog = await fs.readFile(changelogPath, 'utf-8')
    } catch (e) {
        return
    }

    // Find all version entries with their years (format: ### vYYYY.M.P)
    const entryRegex = /### v(\d{4})\.\d+\.\d+/g
    const years = new Set()
    let match
    while ((match = entryRegex.exec(changelog)) !== null) {
        years.add(parseInt(match[1]))
    }

    // Find years that are not the current year and need archiving
    for (const year of years) {
        if (year >= currentYear) continue

        const archivePath = path.resolve(cwd, `change-log.${year}.md`)
        try {
            await fs.access(archivePath)
            // Archive already exists, skip
            continue
        } catch (e) {}

        // Extract entries for this year
        const yearEntries = []
        const allEntriesRegex = /### v(\d{4}\.\d+\.\d+)\n([\s\S]*?)(?=\n### v|\n\[\/\/\]|$)/g
        let entryMatch
        while ((entryMatch = allEntriesRegex.exec(changelog)) !== null) {
            const entryYear = parseInt(entryMatch[1].split('.')[0])
            if (entryYear === year) {
                yearEntries.push(`### v${entryMatch[1]}\n${entryMatch[2].trimEnd()}`)
            }
        }

        if (yearEntries.length === 0) continue

        // Write archive file
        const archiveContent = yearEntries.join('\n\n') + '\n'
        await fs.writeFile(archivePath, archiveContent)
        console.log(`Archived ${yearEntries.length} entries from ${year} to change-log.${year}.md`)

        // Remove archived entries from main changelog
        for (const entry of yearEntries) {
            const escapedHeader = entry.split('\n')[0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
            const removeRegex = new RegExp(`\\n?${escapedHeader}\\n[\\s\\S]*?(?=\\n### v|\\n\\[\/\/\\]|$)`)
            changelog = changelog.replace(removeRegex, '')
        }

        await fs.writeFile(changelogPath, changelog)

        // Git add the archive
        try {
            execSync(`git add change-log.${year}.md`, { cwd, stdio: 'inherit' })
        } catch (e) {}
    }
}

/**
 * Auto-create change-log.md if it doesn't exist.
 */
const ensureChangelog = async (changelogPath, projectName) => {
    try {
        await fs.access(changelogPath)
    } catch (e) {
        const content = `[//]: #@corifeus-header

# ${projectName}


[//]: #@corifeus-header:end
`
        await fs.writeFile(changelogPath, content)
        console.log(`Created change-log.md for ${projectName}`)
    }
}

/**
 * Generate changelog entry using Claude AI and update change-log.md
 *
 * @param {Object} options
 * @param {string} options.cwd - project root
 * @param {string} options.projectName - e.g. "P3X Network MCP" or "P3X Redis UI"
 * @param {Array<{dir: string, npmName?: string}>} [options.repos] - workspace repos
 * @param {boolean} [options.skipCommit] - skip git commit (useful when called from grunt)
 */
const generateChangelog = async (options) => {
    const { cwd, projectName, repos, skipCommit } = options
    const pkg = JSON.parse(await fs.readFile(path.resolve(cwd, 'package.json'), 'utf-8'))
    const version = pkg.version
    const today = new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })
    const changelogPath = path.resolve(cwd, 'change-log.md')

    // Auto-create change-log.md if missing
    await ensureChangelog(changelogPath, projectName || pkg.description || pkg.name)

    // Archive previous year entries
    await archivePreviousYear(changelogPath, cwd)

    const logs = await collectLogs({ cwd, repos })
    const allLogs = logs.join('\n\n')
    if (!allLogs) {
        console.log('No new commits for changelog')
        return
    }

    const existingChangelog = await fs.readFile(changelogPath, 'utf-8')
    let previousEntry = ''
    const prevMatch = existingChangelog.match(/### v[\d.]+\nReleased on [^\n]+\n([\s\S]*?)(?=\n### v|\n$)/)
    if (prevMatch) {
        previousEntry = prevMatch[0]
    }

    let changelogEntry = ''
    try {
        const repoNote = repos && repos.length > 1
            ? `- The commits come from MULTIPLE repos (${repos.map(r => r.dir).join(', ')}) — include significant changes from ALL repos, not just the parent`
            : ''

        const prompt = `Generate a changelog entry for version v${version} of ${projectName}.
Based on these recent git commits, write changelog bullet points.

${allLogs}

IMPORTANT: The following is the PREVIOUS version's changelog entry. Do NOT repeat any of these items. Only include changes that are NEW in this version:

${previousEntry}

Rules:
- Use this EXACT format:
### v${version}
Released on ${today}
* CATEGORY: Description.

- Valid categories: FEATURE, BUGFIX, PERF, REFACTOR, DOCS, CHORE
- Each bullet starts with "* CATEGORY: " (with the asterisk)
- Only include user-facing or significant changes
- SKIP these types of commits entirely:
  - Version bumps, submodule updates, typo fixes, changelog updates
  - Anything related to the secure/ folder
  - Internal CI/CD, build pipeline, or release automation changes
  - Co-Authored-By lines or merge commits
- Keep descriptions concise (one line each)
- Do NOT repeat anything from the previous changelog entry shown above
- Do NOT use markdown code fences
- Output ONLY the changelog entry starting with ### — absolutely NO extra text
${repoNote}
- If there are many feature commits, list each feature separately`

        const tmpPrompt = path.resolve(cwd, '.changelog-prompt.tmp')
        await fs.writeFile(tmpPrompt, prompt)
        changelogEntry = execSync(
            `cat ${JSON.stringify(tmpPrompt)} | claude -p - --no-session-persistence`,
            { encoding: 'utf-8', timeout: 60000 }
        ).trim()
        try { await fs.unlink(tmpPrompt) } catch (e) {}

        const headerIndex = changelogEntry.indexOf('### v')
        if (headerIndex > 0) {
            changelogEntry = changelogEntry.substring(headerIndex)
        }

        const lines = changelogEntry.split('\n')
        const lastBulletIndex = lines.reduce((last, line, i) => line.startsWith('* ') ? i : last, -1)
        if (lastBulletIndex >= 0) {
            changelogEntry = lines.slice(0, lastBulletIndex + 1).join('\n')
        }

        console.log('Claude generated changelog:\n' + changelogEntry)
    } catch (e) {
        console.error('Claude changelog generation failed, using fallback:', e.message)
        changelogEntry = `### v${version}\nReleased on ${today}\n* CHORE: Release v${version}.`
    }

    let changelog = await fs.readFile(changelogPath, 'utf-8')
    const headerEnd = '[//]: #@corifeus-header:end'
    const headerEndIndex = changelog.indexOf(headerEnd)
    if (headerEndIndex !== -1) {
        const insertPos = headerEndIndex + headerEnd.length
        changelog = changelog.slice(0, insertPos) + '\n\n' + changelogEntry + '\n' + changelog.slice(insertPos).replace(/^\n+/, '\n')
        await fs.writeFile(changelogPath, changelog)
        console.log(`Changelog updated for v${version}`)
    } else {
        console.error('Could not find header end marker in change-log.md')
    }

    if (!skipCommit) {
        execSync(`git add change-log.md change-log.*.md 2>/dev/null; git commit -m "chore: update changelog for v${version}" || true`, {
            cwd,
            stdio: 'inherit',
        })
    }

    return changelogEntry
}

/**
 * Get changelog entry for a specific version
 */
const getChangelogEntry = (changelogPath, version) => {
    try {
        const changelog = fsSync.readFileSync(changelogPath, 'utf-8')
        const versionEscaped = version.replace(/\./g, '\\.')
        const regex = new RegExp(`### v${versionEscaped}\\n([\\s\\S]*?)(?=\\n### v|\\n\\[//\\]|$)`)
        const match = changelog.match(regex)
        if (match) {
            return `### v${version}\n${match[1].trim()}`
        }
    } catch (e) {}
    return ''
}

module.exports = {
    generateChangelog,
    getChangelogEntry,
    collectLogs,
    getCommitsSinceLastBump,
    archivePreviousYear,
    ensureChangelog,
}
