import type { Section } from '../types.ts';
import { callout } from '../../components/ui.ts';

export const SECTION: Section = {
  code: 'costs',
  num: 5,
  title: 'Picking the right model',
  tagline: 'Right-size the model for the job, and know why long sessions cost more.',
  prose() {
    return `<div class="prose">
<p>Model providers offer their models in <strong>tiers</strong>: a light model that is fast and cheap, and a heavy one that is slower and pricier but better at reasoning. Claude Haiku versus Opus, ChatGPT Luna versus Sol. Picking the right model for the job is a big part of using agents well: judge how much planning and complexity the task needs, then match the model to it — a light model to summarize an email thread, a heavy one to plan a trip across five cities.</p>
${callout('note', 'Pick the model per task', '<p>Routine jobs like summarizing a page or tidying files run fine on a cheap model. Multi-step work that needs judgment is where a heavy model is worth the cost. You should choose an appropriate model before starting the task, but you can switch later if a lighter model isn\u2019t pulling its weight.</p>')}
<p>A model is billed per token, so cost follows from how much it reads and writes. Reading material the provider has already seen this session (cache) is cheapest; new input like files and web pages costs more to process; generating output is the most expensive of all. A long agent task that reads and writes all day stacks up all three. Keep an eye on long-running sessions: they consume your usage faster.</p>
<p>Cloud AI is commonly sold as subscriptions with usage windows (per month, or per few hours) rather than unlimited plans: the provider has to cap how much reading and writing one person can do.</p>
</div>`;
  },
};
