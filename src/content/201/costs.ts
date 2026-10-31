import type { Section } from '../types.ts';
import { callout } from '../../components/ui.ts';

export const SECTION: Section = {
  code: 'costs',
  num: 4,
  title: 'Why agents cost what they do',
  tagline: 'New reading costs, rereading is cached, writing costs most.',
  prose() {
    return `<div class="prose">
<p>Every step of the loop re-sends the whole conversation: the system prompt, the goal, every tool result so far. That context window from 101 keeps growing, and the provider charges for it. The pricing has three tiers:</p>
<ul>
<li><strong>Cache reads</strong> — material the provider has already processed this session. Cheapest by far; continuing a session costs a fraction of starting one.</li>
<li><strong>Prompt processing</strong> — new input: your files, a fetched web page, fresh tool output. Must be read from scratch, so it costs more.</li>
<li><strong>Generation</strong> — the model writing its own output. The most expensive per token.</li>
</ul>
<p>A single long agent task reads and writes far more text than a single chat, so it can cost many times as much. That is why cloud AI is sold as subscriptions with usage windows (per month, or per few hours) rather than unlimited plans. Providers also sell models in <strong>tiers</strong>: a light model that is fast and cheap, and a heavy one that is slower and pricier but better at planning. Picking the right tier for each job is most of what “using agents efficiently” means.</p>
${callout('note', 'Pick the model per task', '<p>Routine jobs like summarizing a page or tidying files run fine on a cheap model. Multi-step work that needs judgment is where a heavy model earns its price. In practice you choose a model when you start a task, not mid-task.</p>')}
</div>`;
  },
};
