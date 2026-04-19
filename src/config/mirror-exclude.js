/**
 * Files and directories that must NEVER ship to any public mirror
 * (GitHub mirror via p3x tools, or cdn.corifeus.com rsync via
 * home/server-scripts webhook). Shared so both pipelines stay in sync.
 *
 * `files` are removed with `find -maxdepth 1 -iname <name> -exec rm -f`.
 * `dirs`  are removed with `find -maxdepth 1 -iname <name> -type d -exec rm -rf`.
 */

module.exports = {
    files: [
        'CLAUDE.md',
        'AGENTS.md',
    ],
    dirs: [
        '.claude',
        '.codex',
        '.vscode',
        '.idea',
        '.DS_Store',
        'agents',
        'secure',
    ],
};
