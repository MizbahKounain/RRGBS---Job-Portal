import { spawn } from 'node:child_process';
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const children = [
  spawn(npm, ['run', 'server'], { stdio: 'inherit', shell: true }),
  spawn(npm, ['run', 'dev'], { stdio: 'inherit', shell: true })
];
const shutdown = () => children.forEach(child => { if (!child.killed) child.kill('SIGTERM'); });
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('exit', shutdown);
