const spawn = require('child_process').spawnSync;

/**
 * Run a shell command.
 *
 * @param {string} cmd - Command to run.
 */
module.exports = cmd => spawn(cmd, { shell: true, stdio: 'inherit' });
