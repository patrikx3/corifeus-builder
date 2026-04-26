const exec = require('mz/child_process').exec;

// Each promise resolves to null when not in a git repo, instead of rejecting
// noisily. Importing this module at top level previously dumped four
// "fatal: not a git repository" errors whenever cwd had no .git (e.g. webhook
// post-update tmp dirs where .git was just removed).
const safe = (cmd, mapStdout) => exec(cmd).then(
    (stdout) => mapStdout(stdout),
    () => null,
);

const commit = safe('git rev-list --all --count', (stdout) => parseInt(stdout.join('').toString()));
const date = safe('git log -1 --format=%at', (stdout) => parseInt(stdout.join('').toString()));
const branch = safe('git rev-parse --abbrev-ref HEAD', (stdout) => stdout.join('').toString().trim());
const repo = safe('git config remote.origin.url', (stdout) => {
    const data = stdout.join('').toString().split('/');
    let repo = data[data.length - 1].trim();
    const remove = '.git';
    if (repo.toLowerCase().endsWith(remove)) {
        repo = repo.substr(0, repo.length - remove.length);
    }
    return repo;
});

const settings = {
    "branch": branch,
    "date": date,
    "commit": commit,
    "repo": repo
};


module.exports = settings;

