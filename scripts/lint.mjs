import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import parser from '../node_modules/next/dist/compiled/babel/parser.js';

const root = process.cwd();
const extensions = new Set(['.js', '.jsx', '.mjs']);
const ignored = new Set(['.git', '.next', 'node_modules']);

async function collect(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (ignored.has(entry.name)) continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collect(fullPath));
    if (entry.isFile() && extensions.has(path.extname(entry.name))) files.push(fullPath);
  }

  return files;
}

const files = await collect(root);
const failures = [];

for (const file of files) {
  const source = await readFile(file, 'utf8');
  try {
    parser.parse(source, { sourceType: 'unambiguous', plugins: ['jsx'] });
  } catch (error) {
    failures.push(`${path.relative(root, file)}: ${error.message}`);
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Syntax lint passed for ${files.length} JavaScript files.`);
}
