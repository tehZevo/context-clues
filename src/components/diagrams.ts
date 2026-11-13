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

export function toolSim(): string {
  const step = (who: string, content: string, code = false) =>
    `<li class="ts-step"><span class="ts-who">${who}</span>${code ? `<code>${esc(content)}</code>` : `<span>${esc(content)}</span>`}</li>`;
  const scene = (i: number, q: string, steps: string[], hidden: boolean) =>
    `<div class="ts-scene"${hidden ? ' hidden' : ''} data-scene="${i}"><p class="ts-q">${q}</p><ol class="ts-steps">${steps.join('\n')}</ol></div>`;
  const scenes = [
    scene(0, 'You: <span>check the weather in Lisbon and tell me if I need a jacket</span>', [
      step('model', 'tool request: get_weather(city="Lisbon")', true),
      step('harness', 'recognizes the request and runs the real tool'),
      step('result', '17°C, partly cloudy', true),
      step('model', '17°C and partly cloudy in Lisbon — a light layer is enough.'),
    ], false),
    scene(1, 'You: <span>find the restaurant Sam recommended last week</span>', [
      step('model', 'tool request: search_email(query="Sam restaurant")', true),
      step('harness', 'searches the connected mailbox'),
      step('result', 'email from Sam: “you have to try Taberna Forno”', true),
      step('model', 'Sam recommended Taberna Forno.'),
    ], true),
    scene(2, 'You: <span>what time does it open on Saturday?</span> <em>(follow-up)</em>', [
      step('model', 'tool request: web_search(query="Taberna Forno opening hours")', true),
      step('harness', 'runs the search and reads the result'),
      step('result', 'Tue–Sun 17:00–23:00', true),
      step('model', 'It opens at 17:00 on Saturdays.'),
    ], true),
  ];
  return `<div class="demo" data-demo="toolsim">
  <label for="ts-select">Try it — pick a request and run one turn of the agent loop</label>
  <select class="ts-select" id="ts-select">
    <option>Check the weather in Lisbon</option>
    <option>Find Sam's restaurant recommendation</option>
    <option>Follow-up: what time does it open?</option>
  </select>
  ${scenes.join('\n')}
  <button class="ts-run" type="button">Run the loop</button>
</div>`;
}

export function skillSim(): string {
  const step = (who: string, content: string, code = false) =>
    `<li class="ts-step"><span class="ts-who">${who}</span>${code ? `<code>${esc(content)}</code>` : `<span>${esc(content)}</span>`}</li>`;
  const steps = [
    step('skills', 'names in context: meeting-summary, weekly-report, title-rewrite'),
    step('agent', 'load_skill("meeting-summary")', true),
    step('harness', 'skill content: "attendees → decisions → follow-ups with owners"', true),
    step('agent', 'Attendees: Ana, Sam, Maya. Decisions: ship Thursday. Follow-up: Sam writes the release notes.'),
  ];
  return `<div class="demo" data-demo="toolsim">
  <label>Try it — watch an agent find and use a skill</label>
  <div class="ts-scene" data-scene="0"><p class="ts-q">You: <span>summarize the standup notes I pasted</span></p><ol class="ts-steps">${steps.join('\n')}</ol></div>
  <button class="ts-run" type="button">Run it</button>
</div>`;
}

export function agentDefs(): string {
  return `<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <symbol id="cc-agent" viewBox="0 0 64 64">
    <line x1="32" y1="14" x2="32" y2="8" stroke="currentColor" stroke-width="2"/>
    <circle cx="32" cy="5" r="2.5" fill="currentColor"/>
    <rect x="10" y="14" width="44" height="38" rx="9" fill="currentColor" fill-opacity="0.12" stroke="currentColor" stroke-width="2"/>
    <circle cx="24" cy="30" r="3" fill="currentColor"/>
    <circle cx="40" cy="30" r="3" fill="currentColor"/>
    <line x1="25" y1="42" x2="39" y2="42" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </symbol>
</svg>`;
}

const head = (x: number, y: number, s: number) =>
  `<use href="#cc-agent" width="64" height="64" transform="translate(${x} ${y}) scale(${s})"/>`;
const tip = (x: number, y: number, deg: number) =>
  `<polygon points="0,-3.5 7,0 0,3.5" fill="currentColor" transform="translate(${x} ${y}) rotate(${deg})"/>`;
const line = (x1: number, y1: number, x2: number, y2: number) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`;

export function lvlChat(): string {
  return `<svg viewBox="0 0 68 114" style="width:110px" role="img" aria-label="An agent with tools">
  ${head(5.2, 0, 0.9)}
  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" transform="translate(25.8 58.8) scale(1.6) rotate(-16 17.5 9.5)"/>
  <g transform="translate(1.6 61.7) scale(1.9) rotate(-33 12 12)" fill="none" stroke="currentColor" stroke-width="1.05" stroke-linecap="round" stroke-linejoin="round">
    <rect x="6" y="2" width="12" height="7" rx="2"/>
    <rect x="10.5" y="9" width="3" height="14" rx="1.5"/>
  </g>
</svg>`;
}

export function lvlDesktop(): string {
  return `<svg viewBox="0 0 112 84" role="img" aria-label="An agent inside an application window">
  <rect x="1" y="1" width="110" height="82" rx="8" fill="currentColor" fill-opacity="0.12" stroke="currentColor" stroke-width="2"/>
  <circle cx="10" cy="10" r="2" fill="currentColor"/>
  <circle cx="17" cy="10" r="2" fill="currentColor"/>
  <circle cx="24" cy="10" r="2" fill="currentColor"/>
  ${line(1, 16, 111, 16)}
  ${line(30, 16, 30, 83)}
  ${head(38, 22, 0.35)}
  ${line(66, 27, 96, 27)}
  ${line(66, 35, 90, 35)}
  ${line(40, 50, 92, 50)}
  ${line(40, 58, 80, 58)}
  ${line(30, 74, 111, 74)}
</svg>`;
}

export function lvlSubagents(): string {
  return `<svg viewBox="0 0 84 96" role="img" aria-label="An agent with two smaller agents below it">
  ${head(10, 0, 1)}
  ${head(4, 60, 0.55)}
  ${head(45, 60, 0.55)}
</svg>`;
}

export function lvlPersistent(): string {
  return `<svg viewBox="0 0 120 120" role="img" aria-label="An agent with arrows circling it">
  ${head(28, 28, 1)}
  <circle cx="20" cy="17" r="15" fill="none" stroke="currentColor" stroke-width="2"/>
  ${line(20, 17, 20, 9)}
  ${line(20, 17, 25, 20)}
  <path d="M60 8 A52 52 0 0 1 112 60" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  ${tip(112, 60, 90)}
  <path d="M60 112 A52 52 0 0 1 8 60" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  ${tip(8, 60, -90)}
</svg>`;
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
