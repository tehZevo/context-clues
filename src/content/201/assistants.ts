import type { Section } from '../types.ts';
import { callout } from '../../components/ui.ts';

export const SECTION: Section = {
  code: 'assistants',
  num: 3,
  title: 'Agentic assistants',
  tagline: 'From desktop helpers to agents with their own computers.',
  prose() {
    return `<div class="prose">
<p>Agents come in different levels of autonomy: how much room the product gives the model to act on its own. The levels, from least autonomous to most:</p>
<p><strong>1. Chat apps with tools.</strong> The level you already know from 101: ChatGPT, Claude, and Gemini answering a question after quietly searching the web or running a quick calculation.</p>
<p><strong>2. Desktop apps.</strong> ChatGPT, Claude, and Gemini all ship desktop versions, and this is where tools matter most: reading and editing files on your machine, connecting to your calendar or email through <strong>connectors</strong> (the open standard for these is called MCP, Model Context Protocol), and in some cases watching your screen to use an app the way you would. The agent works <em>on your computer</em>, under an app you launch.</p>
<p><strong>3. Persistent agents.</strong> Open-source assistants like OpenClaw and Hermes run all the time instead of when you open an app: a standing work environment, tasks on a schedule (“every morning, sort my inbox”), and memory that grows as you use them.</p>
<p><strong>4. Agents with their own accounts.</strong> A recent class of hosted products gives agents an identity of their own: Grok’s bot, Meta’s Muse, OpenAI’s Dots. The agent posts, messages, and acts on platforms under its own name, doing work for several people at once.</p>
<p><strong>5. Sub-agents.</strong> A common trick inside all of the above: the main agent hands a subtask to a helper agent with its own fresh context (“research these five vendors and report back in ten lines”), then keeps the short report and throws away the noisy working notes. It keeps the main conversation small and cheap.</p>
${callout('note', 'Names age fast', '<p>This list is a snapshot of late 2026. Product names will change, but the levels are the stable part: more access, more autonomy, more accounts. The safety habits in the next section apply at every level.</p>')}
</div>`;
  },
};
