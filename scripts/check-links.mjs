import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('dist');
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const groups = await Promise.all(entries.map(entry => entry.isDirectory() ? walk(path.join(dir, entry.name)) : path.join(dir, entry.name)));
  return groups.flat();
}
const htmlFiles = (await walk(root)).filter(file => file.endsWith('.html'));
if (htmlFiles.length === 0) throw new Error('No built pages found. Run npm run build successfully first.');
let count = 0;
const errors = [];
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const sourcePath = '/' + path.relative(root, file).split(path.sep).join('/').replace(/index\.html$/, '');
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const href = match[1].replaceAll('&amp;', '&');
    if (/^(?:https?:|data:|mailto:|tel:)/.test(href)) continue;
    const url = new URL(href, `https://local.invalid${sourcePath}`);
    const pathname = decodeURIComponent(url.pathname);
    const target = path.resolve(root, '.' + pathname, pathname.endsWith('/') ? 'index.html' : '');
    if (!target.startsWith(root + path.sep)) { errors.push(`${sourcePath}: invalid path ${href}`); continue; }
    try {
      if (!(await stat(target)).isFile()) throw Error('not a file');
      count++;
      if (url.hash && target.endsWith('.html')) {
        const content = target === file ? html : await readFile(target, 'utf8');
        const id = decodeURIComponent(url.hash.slice(1));
        if (!content.includes(`id="${id}"`)) errors.push(`${sourcePath}: missing anchor ${href}`);
      }
    } catch { errors.push(`${sourcePath}: missing ${href}`); }
  }
}
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log(`Checked ${htmlFiles.length} pages and ${count} local links/assets: all passed.`);
