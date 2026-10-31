import type { Section } from '../types.ts';
import { flow } from '../../components/diagrams.ts';
import { callout } from '../../components/ui.ts';

const loop = () =>
  flow([
    { t: 'Think', d: 'the model reads the goal and the results so far, and decides the next step' },
    { t: 'Act', d: 'it writes a tool request: search this, open that file, run this command' },
    { t: 'Observe', d: 'the harness runs the tool and pastes the real result back into the conversation' },
    { t: 'Repeat or finish', d: 'loop until the goal is met, then report back in plain language' },
  ]);

export const SECTION: Section = {
  code: 'harness',
  num: 2,
  title: 'Agent = LLM + harness',
  tagline: 'The model writes text; the harness makes it act.',
  prose() {
    return `<div class="prose">
<p>Remember the catch from 101: a model can't <em>do</em> anything. It predicts tokens and that's all it ever does. So how does an agent book a flight or fix a file?</p>
<p>The answer is the <strong>harness</strong>: ordinary software wrapped around the model. The harness gives the model a system prompt and a menu of tools (“you can search, read files, run commands”). When the model wants to act, it writes a structured request like <code>search: flights to Lisbon Friday</code>. The harness recognizes that, actually performs the search, and pastes the results back into the conversation as more text. The model reads them and continues.</p>
${loop()}
<p>That loop, repeated a few dozen times, is what looks like an AI “using a computer.” The model decides each step; the harness carries it out.</p>
${callout('tip', 'Why this matters for safety', '<p>The model never touches your files or your bank. The harness does, and the harness is ordinary software you control: it is where approvals, permissions and activity logs live.</p>')}
</div>`;
  },
};
