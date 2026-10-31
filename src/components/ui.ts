import { esc } from '../frame.ts';
import type { Section } from '../content/types.ts';

export function pill(href: string, label: string, cls = ''): string {
  return `<a class="pill ${cls}" href="${href}">${label}</a>`;
}

export function callout(kind: 'note' | 'warn' | 'tip', title: string, bodyHtml: string): string {
  return `<aside class="callout ${kind}"><span class="c-title">${esc(title)}</span>${bodyHtml}</aside>`;
}

/** collapsible iframe embed of a section's standalone deck (relative to the course page) */
export function slideEmbed(sec: Section): string {
  const href = `slides/${sec.code}.html`;
  return `<details class="deckembed">
    <summary>Slides<span class="d-actions"><a class="pill" href="${href}" target="_blank" rel="noopener">Open / present ↗</a></span></summary>
    <iframe data-src="${href}" title="${esc(sec.title)} slides"></iframe>
  </details>`;
}

export function sectionHtml(sec: Section): string {
  return `<section class="lesson" id="${sec.code}">
  <span class="sec-num">${String(sec.num).padStart(2, '0')}</span>
  <h2 class="sec-title">${esc(sec.title)}</h2>
  <p class="tagline sec-tag">${esc(sec.tagline)}</p>
  ${sec.prose()}
  ${slideEmbed(sec)}
</section>`;
}
