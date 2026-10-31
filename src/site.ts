import { shell } from './frame.ts';
import type { PageDef } from './frame.ts';
import { esc } from './frame.ts';
import { COURSES, SITE_NAME } from './catalog.ts';
import { SECTIONS as S101 } from './content/101/index.ts';
import { SECTIONS as S201 } from './content/201/index.ts';
import { sectionHtml } from './components/ui.ts';
import type { Section } from './content/types.ts';

const COURSE_SECTIONS: Record<string, Section[]> = { '101': S101, '201': S201 };

function indexPage(): PageDef {
  const cards = COURSES.map((c) => {
    const inner = `<span class="code-badge">${c.code}</span>
      <h3>${esc(c.title)}</h3>
      <p class="tagline">${esc(c.tagline)}</p>`;
    return c.live
      ? `<a class="card" href="${c.code}/">${inner}<span class="meta">${COURSE_SECTIONS[c.code]?.length ?? 0} sections</span></a>`
      : `<div class="card soon"><span class="soon-tag">coming soon</span>${inner}</div>`;
  }).join('\n    ');

  return {
    out: 'index.html',
    title: 'AI courses',
    desc: 'A practical, hype-free curriculum for understanding artificial intelligence.',
    variant: 'page',
    root: '',
    body: `<section class="hero">
    <p class="kicker">${SITE_NAME} · curriculum</p>
    <h1>Understand AI the way it actually works.</h1>
    <p class="lede">No math required, no hype tolerated. Each course is a single page you can read start to finish, with interactive demos that make the ideas click.</p>
    <div class="cards">
    ${cards}
    </div>
  </section>`,
  };
}

function coursePage(code: string): PageDef | null {
  const SECTIONS = COURSE_SECTIONS[code];
  const meta = COURSES.find((c) => c.code === code);
  if (!SECTIONS || !meta) return null;
  const mins = Math.round(SECTIONS.length * 2.5);
  const toc = SECTIONS.map(
    (s) => `<a class="toc-link" href="#${s.code}"><span class="n">${String(s.num).padStart(2, '0')}</span>${esc(s.title)}</a>`,
  ).join('\n      ');

  const descs: Record<string, string> = {
    '101': 'What AI, ML, and LLMs actually are: models, tokens, context windows, chat framing, and where the machinery lies.',
    '201': 'AI that acts on your behalf: harnesses and tools, prompt injection, what agents cost, and how agent memory really works.',
  };
  return {
    out: `${code}/index.html`,
    title: `${meta.title} · ${code}`,
    desc: descs[code] ?? meta.tagline,
    variant: 'page',
    root: '../',
    activeTab: code,
    body: `<div class="course-layout">
    <aside class="toc">
      <p class="toc-title">Sections</p>
      <button class="toc-toggle" aria-expanded="false" aria-controls="toc-list">
        <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true"><path d="M0 1h18M0 7h18M0 13h18" stroke="currentColor" stroke-width="2"/></svg>
        Sections
      </button>
      <nav class="toc-list" id="toc-list" aria-label="Sections">
      ${toc}
      </nav>
    </aside>
    <div class="course-main">
      <section class="course-hero">
        <span class="code-badge big">${code}</span>
        <div>
          <h1 style="margin-bottom:4px">${esc(meta.title)}</h1>
          <p class="lede" style="font-size:16.5px">${SECTIONS.length} sections · ~${mins} min read</p>
        </div>
      </section>
${SECTIONS.map((s) => sectionHtml(s)).join('\n')}
    </div>
  </div>`,
};
}

export { shell } from './frame.ts';
export const PAGES: PageDef[] = [indexPage(), coursePage('101'), coursePage('201')].flatMap((p) => (p ? [p] : []));
