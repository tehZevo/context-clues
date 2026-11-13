import type { Section } from '../types.ts';
import { callout, exercise } from '../../components/ui.ts';

export const SECTION: Section = {
  code: 'scheduled-tasks',
  num: 8,
  title: 'Scheduled tasks',
  tagline: 'A saved prompt on a clock: recurring agent work.',
  prose() {
    return `<div class="prose">
<p>Once you trust an agent with a task you do regularly, the next step is to stop asking for it: give it a schedule. Cloud AI providers use different names for this, such as routines, scheduled tasks, or scheduled actions.</p>
<p>A scheduled task is a saved setup: a prompt, the connections it needs (email, files, Slack, a repo), and a cadence. “Every Monday at 9, summarize last week's messages in the team channel.” The task runs on the provider's servers, so it keeps running with your laptop closed, and you read the result when it's ready.</p>
<p>Two triggers exist besides the clock. An <strong>API call</strong>: the task gets a URL and a token, so your alerting system or a deploy hook can fire it like a function. An <strong>event</strong>: a new pull request, a price change, a package delivery. Monitoring tasks use the same setup: the agent checks something on a schedule and only messages you when it judges the change is worth reporting.</p>
<p>A finished run isn't automatically a correct one. Read the first few results and tighten the prompt before putting a task on a permanent schedule.</p>
${callout('note', 'Routines vs skills', '<p>A skill is how you want a task done. A scheduled task is when to do it. The two combine: schedule a task that runs a skill every Monday morning.</p>')}
${exercise('Try it: schedule one recurring task', [
  'Pick something you already ask an agent for weekly: a summary, a check, a rewrite.',
  'Create a scheduled task for it, using the same wording you would use in chat, and set a cadence.',
  'Read the first two runs and tighten the prompt before you trust it on autopilot.',
], 'A saved prompt on a clock is the simplest form of automation. Start with one task, watch it for a week, then add more.')}
</div>`;
  },
};
