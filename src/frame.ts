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

export function themeSwitch(): string {
  return `<div class="theme-switch" role="group" aria-label="Color theme">
        <button type="button" data-theme-set="light" title="Light" aria-label="Light theme"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg></button>
        <button type="button" data-theme-set="dark" title="Dark" aria-label="Dark theme"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg></button>
        <button type="button" data-theme-set="system" title="System" aria-label="System theme"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></svg></button>
      </div>`;
}

export function shell(p: PageDef): string {
  const header =
    p.variant === 'page'
      ? `  <header class="topbar">
    <div class="wrap topbar-in">
      <a class="brand" href="${p.root}index.html"><span class="brand-dot"></span>${SITE_NAME}</a>
      <div class="tb-right">
      ${tabBar(p.root, p.activeTab)}
      ${themeSwitch()}
      </div>
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
<meta name="color-scheme" content="light dark">
<script>(function(){try{var t=localStorage.getItem('cc-theme');if(t&&t!=='system')document.documentElement.setAttribute('data-theme',t);}catch(e){}})();</script>
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
