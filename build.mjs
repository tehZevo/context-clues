import { build } from 'esbuild';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const src = (p) => join(here, 'src', p);
const distDir = join(here, 'dist');

const bundle = async (entry, minify = false) => {
  const res = await build({
    entryPoints: [entry],
    bundle: true,
    write: false,
    format: 'esm',
    platform: 'neutral',
    target: 'es2020',
    minify,
  });
  return res.outputFiles[0].text;
};

const inject = (s, token, val) => s.split(token).join(val);

const siteCode = await bundle(src('site.ts'));
const mod = await import(`data:text/javascript;base64,${Buffer.from(siteCode).toString('base64')}`);
const { PAGES, shell } = mod;

const css = (
  await Promise.all(['tokens', 'layout', 'diagrams'].map((f) => readFile(src(`styles/${f}.css`), 'utf8')))
).join('\n');
const demos = await bundle(src('client/demos.ts'), true);

await rm(distDir, { recursive: true, force: true });
let bytes = 0;
for (const p of PAGES) {
  const html = inject(inject(shell(p), '__STYLE_CSS__', css), '__SCRIPT_DEMOS__', demos);
  bytes += html.length;
  const file = join(distDir, p.out);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
}
console.log(`built ${PAGES.length} pages (${Math.round(bytes / 1024)} KB total) -> dist/`);

if (process.argv.includes('--serve')) {
  const port = Number(process.env.PORT || 4173);
  createServer(async (req, res) => {
    let path = decodeURIComponent(new URL(req.url, 'http://x').pathname).replace(/^\/+/, '');
    if (!extname(path)) path = join(path, 'index.html');
    try {
      const body = await readFile(join(distDir, path));
      res.writeHead(200, { 'content-type': extname(path) === '.html' ? 'text/html; charset=utf-8' : 'application/octet-stream' });
      res.end(body);
    } catch {
      res.writeHead(404).end('not found');
    }
  }).listen(port, () => console.log(`serving dist at http://localhost:${port}/`));
}
