import type { Section } from '../types.ts';
import { callout } from '../../components/ui.ts';

export const SECTION: Section = {
  code: 'costs',
  num: 5,
  title: 'Picking the right model',
  tagline: 'Right-size the model for the job, and know why long sessions cost more.',
  prose() {
    return `<div class="prose">
<p>Model providers offer their models in <strong>tiers</strong>: a light model that is fast and cheap, and a heavy one that is slower and pricier but better at reasoning. Claude Haiku versus Opus, ChatGPT Luna versus Sol. Picking the right model for the job is a big part of using agents well: a light model to summarize an email thread, a heavy one to plan a trip across five cities.</p>
${callout('note', 'Pick the model per task', '<p>Routine jobs like summarizing a page or tidying files run fine on a cheap model. Multi-step work that needs judgment is where a heavy model earns its price. In practice you choose a model when you start a task, not mid-task.</p>')}
<p>Cost follows from what the model does: it is billed per token. Reading material the provider has already seen this session (cache) is cheapest; new input like files and web pages costs more to process; generating output is the most expensive of all. A long agent task that reads and writes all day stacks up all three, so it costs far more than a single chat. Keep an eye on long-running sessions: the longer one runs, the more it costs to keep feeding it.</p>
<p>This is why cloud AI is sold as subscriptions with usage windows (per month, or per few hours) rather than unlimited plans: the provider has to cap how much reading and writing one person can do.</p>
</div>`;
  },
};
