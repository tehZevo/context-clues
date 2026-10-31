import { esc } from '../frame.ts';

export function venn(): string {
  return `<figure class="venn" role="img" aria-label="Venn diagram: deep learning inside machine learning inside artificial intelligence">
  <span class="ring r-ai"></span><span class="ring r-ml"></span><span class="ring r-dl"></span>
  <figcaption class="rlab l-ai">AI<small>any intelligent action or output chosen by a machine</small></figcaption>
  <span class="rlab l-ml">ML<small>systems that learn patterns from examples</small></span>
    <span class="rlab l-dl">DL<small>a slice of ML: neural networks with many layers</small></span>
</figure>`;
}

export interface FlowStep { t: string; d: string }

export function flow(steps: FlowStep[]): string {
  const parts = steps.map((s, i) => {
    const box = `<div class="fstep"><span class="fs-num">${String(i + 1).padStart(2, '0')}</span><p class="fs-t">${esc(s.t)}</p><p class="fs-d">${s.d}</p></div>`;
    return i === steps.length - 1 ? box : `${box}<span class="farrow">&rarr;</span>`;
  });
  return `<div class="flow">${parts.join('')}</div>`;
}

export interface TokenOption { t: string; p: number }

export function nextToken(promptText: string, opts: TokenOption[]): string {
  const rows = opts
    .map(
      (o) => `<div class="ntrow"><span class="nt-t">${esc(o.t)}</span><div class="nt-track"><div class="nt-fill" style="width:${o.p}%"></div></div><span class="nt-p">${o.p}%</span></div>`,
    )
    .join('\n');
  return `<div class="ntq">${esc(promptText)}<span class="caret">&#9613;</span></div>\n${rows}`;
}

export function chips(items: string[], note?: string): string {
  return `<div class="chips">${items.map((t) => `<span class="chip">${esc(t)}</span>`).join('')}${note ? `<p class="chips-note">${esc(note)}</p>` : ''}</div>`;
}

export function tokenDemo(sample: string): string {
  return `<div class="demo" data-demo="tokens">
  <label for="tok-${sample.length}">Try it — type anything and watch it get chopped into tokens</label>
  <input type="text" id="tok-${sample.length}" value="${esc(sample)}" spellcheck="false">
  <p class="out-label" data-count></p>
  <div class="chips chips-target"></div>
  <p class="chips-note">Approximate. Real tokenizers split words into learned subword pieces — this is the same idea, simplified.</p>
</div>`;
}

export function ctxWinDemo(text: string): string {
  return `<div class="demo" data-demo="ctxwin">
  <label for="ctx-${text.length}">Try it — drag to shrink what fits in the context window</label>
  <p class="ctx-text">${esc(text)}</p>
  <input type="range" id="ctx-${text.length}" min="4" max="100" value="20">
  <div class="cw-meta"></div>
</div>`;
}

export interface Turn { role: 'user' | 'ai'; html: string }

export function chat(turns: Turn[]): string {
  return `<div class="chat">${turns
    .map(
      (t) =>
        `<div class="msg ${t.role}"><span class="who">${t.role === 'user' ? 'you' : 'AI'}</span>${t.html}</div>`,
    )
    .join('\n')}</div>`;
}
