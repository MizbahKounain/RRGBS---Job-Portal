import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(__dirname, '..', 'server', 'storage', 'db.json');
const db = JSON.parse(fs.readFileSync(file, 'utf8'));

console.log(`\nRRGBS data file: ${file}\n`);
for (const [key, value] of Object.entries(db)) {
  console.log(`${key}: ${Array.isArray(value) ? value.length : 'object'}`);
}
console.log('\nTo inspect the full data, open server/storage/db.json in VS Code.\n');
