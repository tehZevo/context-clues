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
  const box = (s: FlowStep, i: number) => `<div class="fstep"><span class="fs-num">${String(i + 1).padStart(2, '0')}</span><p class="fs-t">${esc(s.t)}</p><p class="fs-d">${s.d}</p></div>`;
  const perRow = steps.length === 4 ? 2 : steps.length;
  const rows: string[] = [];
  for (let r = 0; r < steps.length; r += perRow) {
    const end = Math.min(r + perRow, steps.length);
    const parts: string[] = [];
    for (let i = r; i < end; i++) {
      parts.push(box(steps[i], i));
      if (i < end - 1) parts.push('<span class="farrow"><svg width="28" height="16" viewBox="0 0 28 16" aria-hidden="true"><line x1="1" y1="8" x2="19" y2="8" stroke="currentColor" stroke-width="2"/><polygon points="18,2 28,8 18,14" fill="currentColor"/></svg></span>');
    }
    rows.push(`<div class="frow">${parts.join('')}</div>`);
  }
  return `<div class="flow">${rows.join('<span class="fdown"><svg width="16" height="28" viewBox="0 0 16 28" aria-hidden="true"><line x1="8" y1="1" x2="8" y2="19" stroke="currentColor" stroke-width="2"/><polygon points="2,18 8,28 14,18" fill="currentColor"/></svg></span>')}</div>`;
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

export function perceptron(): string {
  return `<figure class="perc" role="img" aria-label="A perceptron: three weighted inputs feed a summing node that produces one output">
  <svg viewBox="0 0 524 190">
    <line class="edge" x1="78" y1="37" x2="246" y2="90"/>
    <line class="edge" x1="78" y1="95" x2="244" y2="95"/>
    <line class="edge" x1="78" y1="153" x2="246" y2="100"/>
    <text class="w" x="150" y="52">w₁</text>
    <text class="w" x="156" y="87">w₂</text>
    <text class="w" x="150" y="148">w₃</text>
    <circle class="in" cx="60" cy="35" r="18"/><text class="tin" x="60" y="36">x₁</text>
    <circle class="in" cx="60" cy="95" r="18"/><text class="tin" x="60" y="96">x₂</text>
    <circle class="in" cx="60" cy="155" r="18"/><text class="tin" x="60" y="156">x₃</text>
    <circle class="node" cx="282" cy="95" r="38"/>
    <text class="sigma" x="282" y="96">Σ</text>
    <line class="edge" x1="320" y1="95" x2="416" y2="95"/>
    <polygon class="tip" points="416,89 430,95 416,101"/>
    <rect class="outbox" x="436" y="76" width="84" height="38" rx="10"/>
    <text class="tout" x="478" y="96">output</text>
  </svg>
  <figcaption>Numbers in, weighted and summed, one decision out.</figcaption>
</figure>`;
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
