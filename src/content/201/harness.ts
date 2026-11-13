import type { Section } from '../types.ts';
import { esc } from '../../frame.ts';
import { toolSim } from '../../components/diagrams.ts';
import { callout, exercise } from '../../components/ui.ts';

const ARROW_R = '<svg width="28" height="16" viewBox="0 0 28 16" aria-hidden="true"><line x1="1" y1="8" x2="19" y2="8" stroke="currentColor" stroke-width="2"/><polygon points="18,2 28,8 18,14" fill="currentColor"/></svg>';
const ARROW_L = '<svg width="28" height="16" viewBox="0 0 28 16" aria-hidden="true"><line x1="9" y1="8" x2="27" y2="8" stroke="currentColor" stroke-width="2"/><polygon points="10,2 0,8 10,14" fill="currentColor"/></svg>';
const ARROW_D = '<svg width="16" height="28" viewBox="0 0 16 28" aria-hidden="true"><line x1="8" y1="1" x2="8" y2="19" stroke="currentColor" stroke-width="2"/><polygon points="2,18 8,28 14,18" fill="currentColor"/></svg>';
const ARROW_U = '<svg width="16" height="28" viewBox="0 0 16 28" aria-hidden="true"><line x1="8" y1="27" x2="8" y2="9" stroke="currentColor" stroke-width="2"/><polygon points="2,10 8,0 14,10" fill="currentColor"/></svg>';

const loop = () => {
  const steps = [
    { t: 'Think', d: 'the model reads the task and the results so far, and decides the next step' },
    { t: 'Act', d: 'it writes a tool request: search this, open that file, run this command' },
    { t: 'Observe', d: 'the harness runs the tool and pastes the real result back into the conversation' },
    { t: 'Repeat', d: 'loop until the goal is met, then report back in plain language' },
  ];
  const box = (s: { t: string; d: string }, i: number, area: string) =>
    `<div class="fstep" style="grid-area:${area}"><span class="fs-num">${String(i + 1).padStart(2, '0')}</span><p class="fs-t">${esc(s.t)}</p><p class="fs-d">${s.d}</p></div>`;
  return `<div class="loop" role="img" aria-label="The agent loop: think, act, observe, then repeat back to think">
  ${box(steps[0], 0, '1 / 1')}
  <span class="farrow" style="grid-area:1 / 2">${ARROW_R}</span>
  ${box(steps[1], 1, '1 / 3')}
  <span class="fdown" style="grid-area:2 / 3">${ARROW_D}</span>
  <span class="fdown" style="grid-area:2 / 1">${ARROW_U}</span>
  ${box(steps[3], 3, '3 / 1')}
  <span class="farrow" style="grid-area:3 / 2">${ARROW_L}</span>
  ${box(steps[2], 2, '3 / 3')}
</div>`;
};

export const SECTION: Section = {
  code: 'harness',
  num: 2,
  title: 'Agent = LLM + harness',
  tagline: 'The model writes text; the harness makes it act.',
  prose() {
    return `<div class="prose">
<p>A model's output is a stream of predicted tokens, so how can it book a flight or fix a file? The answer is the <strong>harness</strong>: the software wrapped around the model. The harness gives the model a system prompt and a menu of tools (“you can search, read files, run commands”). When the model wants to act, it writes a structured request like <code>search: flights to Lisbon Friday</code>. The harness recognizes that, actually performs the search, and pastes the results back into the conversation as more text. The model reads them and continues.</p>
${loop()}
<p>That loop, repeated several times, is what allows an agent to do useful work.</p>
${toolSim()}
${callout('tip', 'Why this matters for safety', '<p>What an agent can reach is set by the harness: which folders, apps, and accounts you connect, and which actions need your approval first. That is where the safety controls live: permissions, approval prompts, and an activity log you can read.</p>')}
${exercise('Try it: watch an agent use its tools', [
  'Ask any agent to research something or read and summarize a web page for you, like \u201cread this page and give me five bullet points\u201d.',
  'Look for the paper trail while it works: many agents show the tool calls as they happen (\u201csearching\u2026\u201d, \u201cfetching page\u2026\u201d) or list web references in the answer.',
  'Open one of the pages it cited and check the summary against what the page actually says.',
], 'The model did not magically know the page. It asked the harness to fetch it, then read the result like any other text.')}
</div>`;
  },
};
