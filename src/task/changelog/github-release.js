const https = require('https')
const { getChangelogEntry } = require('./changelog')

const githubRequest = (token, method, apiPath, body) => new Promise((resolve, reject) => {
    const options = {
        hostname: 'api.github.com',
        path: apiPath,
        method,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.github+json',
            'User-Agent': 'corifeus-builder',
            'X-GitHub-Api-Version': '2022-11-28',
        },
    }
    if (body) {
        options.headers['Content-Type'] = 'application/json'
    }
    const req = https.request(options, (res) => {
        let data = ''
        res.on('data', chunk => data += chunk)
        res.on('end', () => {
            try { resolve({ status: res.statusCode, data: JSON.parse(data) }) }
            catch { resolve({ status: res.statusCode, data }) }
        })
    })
    req.on('error', reject)
    if (body) req.write(JSON.stringify(body))
    req.end()
})

/**
 * Create or update a GitHub release with changelog.
 *
 * @param {Object} options
 * @param {string} options.token - GitHub token
 * @param {string} options.owner - GitHub owner (e.g. "patrikx3")
 * @param {string} options.repo - GitHub repo name (e.g. "network-mcp")
 * @param {string} options.version - version string (e.g. "2026.4.105")
 * @param {string} options.projectName - display name (e.g. "P3X Network MCP")
 * @param {string} options.changelogPath - path to change-log.md
 * @param {string} [options.extraBody] - extra content to append to release body
 */
const createOrUpdateRelease = async (options) => {
    const { token, owner, repo, version, projectName, changelogPath, extraBody } = options
    const releaseTag = `v${version}`

    try {
        const changelogEntry = getChangelogEntry(changelogPath, version)
        const bodyParts = [changelogEntry]
        if (extraBody) bodyParts.push(extraBody)
        const releaseBody = bodyParts.filter(Boolean).join('\n\n')

        // Check if release exists
        const listRes = await githubRequest(token, 'GET', `/repos/${owner}/${repo}/releases?per_page=10`)
        if (listRes.status === 200) {
            const existing = listRes.data.find(r => r.tag_name === releaseTag)
            if (existing) {
                if (existing.draft) {
                    // Promote draft to published
                    const patchRes = await githubRequest(token, 'PATCH', `/repos/${owner}/${repo}/releases/${existing.id}`, {
                        tag_name: releaseTag,
                        draft: false,
                        body: releaseBody,
                        name: `${projectName} ${releaseTag}`,
                    })
                    if (patchRes.status === 200) {
                        console.log(`GitHub release ${releaseTag} promoted from draft to published`)
                    } else {
                        console.error(`Failed to promote release: ${patchRes.status}`, patchRes.data)
                    }
                } else {
                    // Update existing
                    const patchRes = await githubRequest(token, 'PATCH', `/repos/${owner}/${repo}/releases/${existing.id}`, {
                        body: releaseBody,
                        name: `${projectName} ${releaseTag}`,
                    })
                    if (patchRes.status === 200) {
                        console.log(`GitHub release ${releaseTag} updated with changelog`)
                    } else {
                        console.error(`Failed to update release: ${patchRes.status}`, patchRes.data)
                    }
                }
                return
            }

            // Check for untagged draft (electron-builder)
            const untaggedDraft = listRes.data.find(r => r.draft === true && r.tag_name.startsWith('untagged'))
            if (untaggedDraft) {
                const patchRes = await githubRequest(token, 'PATCH', `/repos/${owner}/${repo}/releases/${untaggedDraft.id}`, {
                    tag_name: releaseTag,
                    draft: false,
                    body: releaseBody,
                    name: `${projectName} ${releaseTag}`,
                })
                if (patchRes.status === 200) {
                    console.log(`GitHub untagged draft promoted to ${releaseTag}`)
                } else {
                    console.error(`Failed to promote untagged draft: ${patchRes.status}`, patchRes.data)
                }
                return
            }
        }

        // Create new release
        const createRes = await githubRequest(token, 'POST', `/repos/${owner}/${repo}/releases`, {
            tag_name: releaseTag,
            name: `${projectName} ${releaseTag}`,
            body: releaseBody,
            draft: false,
            prerelease: false,
        })
        if (createRes.status === 201) {
            console.log(`GitHub release ${releaseTag} created: ${createRes.data.html_url}`)
        } else {
            console.error(`Failed to create release: ${createRes.status}`, createRes.data)
        }
    } catch (e) {
        console.error('Failed to manage GitHub release:', e.message)
    }
}

module.exports = {
    createOrUpdateRelease,
    githubRequest,
}
