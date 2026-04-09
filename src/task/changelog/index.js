const { generateChangelog, getChangelogEntry } = require('./changelog')
const { createOrUpdateRelease, githubRequest } = require('./github-release')

// Export as a library (not a grunt task) — tokens must come from secure/ in each project
module.exports = {
    generateChangelog,
    getChangelogEntry,
    createOrUpdateRelease,
    githubRequest,
}
