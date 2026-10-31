import { esc } from '../frame.ts';
import type { Section } from '../content/types.ts';

export function callout(kind: 'note' | 'warn' | 'tip', title: string, bodyHtml: string): string {
  return `<aside class="callout ${kind}"><span class="c-title">${esc(title)}</span>${bodyHtml}</aside>`;
}

export function sectionHtml(sec: Section): string {
  return `<section class="lesson" id="${sec.code}">
  <span class="sec-num">${String(sec.num).padStart(2, '0')}</span>
  <h2 class="sec-title">${esc(sec.title)}</h2>
  <p class="tagline sec-tag">${esc(sec.tagline)}</p>
  ${sec.prose()}
</section>`;
}
