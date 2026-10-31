import { COURSES, SITE_NAME } from './catalog.ts';

export interface PageDef {
  out: string;
  title: string;
  desc?: string;
  variant: 'page' | 'deck';
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
<style>__STYLE_CSS__</style>
</head>
<body class="${p.variant}">
${header}
  <main class="main${p.variant === 'page' ? ' wrap' : ''}">
${p.body}
  </main>
${footer}
<script>__SCRIPT_ENGINE__</script>
<script>__SCRIPT_DEMOS__</script>
</body>
</html>
`;
}
