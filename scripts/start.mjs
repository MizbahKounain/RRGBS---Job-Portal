import { spawn } from 'node:child_process';
const server = spawn(process.execPath, ['server/index.mjs'], {
  stdio: 'inherit',
  env: { ...process.env, NODE_ENV: 'production' }
});
process.on('SIGINT', () => server.kill('SIGTERM'));
process.on('SIGTERM', () => server.kill('SIGTERM'));
