import { COURSES, SITE_NAME } from './catalog.ts';

export interface PageDef {
  out: string;
  title: string;
  desc?: string;
  variant: 'page';
  root: string;
  activeTab?: string;
  body: string;
}

export function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function tabBar(root: string, active?: string): string {
  const items = COURSES.map((c) =>
    c.live
      ? `<a class="tab${c.code === active ? ' active' : ''}" href="${root}${c.code}/">${c.code} · ${esc(c.title)}</a>`
      : `<span class="tab soon" title="Coming soon">${c.code} · ${esc(c.title)}</span>`,
  ).join('\n      ');
  return `<nav class="tabs" aria-label="Courses">
      ${items}
    </nav>`;
}

export function shell(p: PageDef): string {
  const header =
    p.variant === 'page'
      ? `  <header class="topbar">
    <div class="wrap topbar-in">
      <a class="brand" href="${p.root}index.html"><span class="brand-dot"></span>${SITE_NAME}</a>
      ${tabBar(p.root, p.activeTab)}
    </div>
  </header>`
      : '';

  const footer =
    p.variant === 'page'
      ? `  <footer class="foot">
    <div class="wrap">${SITE_NAME} · AI curriculum — <a href="${p.root}index.html">all courses</a></div>
  </footer>`
      : '';

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.title)} · ${SITE_NAME}</title>
${p.desc ? `<meta name="description" content="${esc(p.desc)}">` : ''}
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%234f46e5'/%3E%3Cstop offset='.55' stop-color='%237c3aed'/%3E%3Cstop offset='1' stop-color='%239333ea'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='16' height='16' rx='5' fill='url(%23g)'/%3E%3C/svg%3E">
<style>__STYLE_CSS__</style>
</head>
<body class="${p.variant}">
${header}
  <main class="main${p.variant === 'page' ? ' wrap' : ''}">
${p.body}
  </main>
${footer}
<script>__SCRIPT_DEMOS__</script>
</body>
</html>
`;
}
