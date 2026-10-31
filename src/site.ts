import { shell } from './frame.ts';
import type { PageDef } from './frame.ts';
import { esc } from './frame.ts';
import { COURSES, SITE_NAME } from './catalog.ts';
import { SECTIONS } from './content/101/index.ts';
import { sectionHtml } from './components/ui.ts';

function indexPage(): PageDef {
  const cards = COURSES.map((c) => {
    const inner = `<span class="code-badge">${c.code}</span>
      <h3>${esc(c.title)}</h3>
      <p class="tagline">${esc(c.tagline)}</p>`;
    return c.live
      ? `<a class="card" href="${c.code}/">${inner}<span class="meta">${SECTIONS.length} sections · ${SECTIONS.length} slide decks</span></a>`
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
    <p class="lede">No math required, no hype tolerated. Each course is a single page you can read start to finish — every section ships with its own slide deck if you'd rather present it.</p>
    <div class="cards">
    ${cards}
    </div>
  </section>`,
  };
}

function coursePage(): PageDef {
  const jump = SECTIONS.map(
    (s) => `<a href="#${s.code}"><span class="n">${String(s.num).padStart(2, '0')}</span>${esc(s.title)}</a>`,
  ).join('\n      ');

  return {
    out: '101/index.html',
    title: 'AI Foundations · 101',
    desc: 'What AI, ML, and LLMs actually are — models, tokens, context windows, chat framing, and where the machinery lies.',
    variant: 'page',
    root: '../',
    activeTab: '101',
    body: `<section class="course-hero">
    <span class="code-badge big">101</span>
    <div>
      <h1 style="margin-bottom:4px">AI Foundations</h1>
      <p class="lede" style="font-size:16.5px">${SECTIONS.length} sections · each with its own slide deck · ~25 min read</p>
    </div>
  </section>
  <nav class="jumpnav" aria-label="Sections">
      ${jump}
  </nav>
${SECTIONS.map((s) => sectionHtml(s)).join('\n')}`,
  };
}

function deckPages(): PageDef[] {
  return SECTIONS.map((sec) => {
    const st = `${String(sec.num).padStart(2, '0')} · ${esc(sec.title)}`;
    const slides = [
      `<section class="slide lead"><p class="st">AI Foundations · 101</p><h1>${esc(sec.title)}</h1><p class="sub">${esc(sec.tagline)}</p></section>`,
      ...sec.slides().map((s) => `<section class="slide"><p class="st">${st}</p>${s}</section>`),
    ].join('\n');

    return {
      out: `101/slides/${sec.code}.html`,
      title: `${sec.num} · ${sec.title}`,
      desc: sec.tagline,
      variant: 'deck',
      root: '../',
      activeTab: '101',
      body: `<div class="progress"></div>
    <div class="deck-stage">
${slides}
    </div>
    <p class="hint">&larr; &rarr; navigate · F fullscreen</p>
    <div class="controls">
      <span class="counter"></span>
      <button class="deck-btn prev" aria-label="Previous slide">&larr;</button>
      <button class="deck-btn next" aria-label="Next slide">&rarr;</button>
      <button class="deck-btn fs" aria-label="Toggle fullscreen">&#x26F6;</button>
    </div>`,
    };
  });
}

export { shell } from './frame.ts';
export const PAGES: PageDef[] = [indexPage(), coursePage(), ...deckPages()];
