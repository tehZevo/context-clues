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
<p>A scheduled task is a saved setup: a prompt, the connections it needs (email, files, Slack, a repo), and a cadence. “Every Monday at 9, summarize last week's messages in the team channel.” Provider-hosted tasks keep running with your laptop closed; you read the result when it's ready.</p>
<p>Other providers may let you run a task automatically in other ways: on a <strong>webhook</strong> (the task gets a URL and a token, so another system can trigger it), or on an <strong>event</strong> like a new email, a price change, or a file change. A similar setup covers monitoring: the agent checks something on a schedule and only messages you when it judges the change is worth reporting.</p>
<p>A finished run isn't automatically a correct one. Read the first few results and tighten the prompt before putting a task on a permanent schedule.</p>
${callout('note', 'Routines vs skills', '<p>A skill is how you want a task done. A scheduled task is when to do it. The two can be combined: schedule a task that runs a skill every Monday morning.</p>')}
${exercise('Try it: schedule one recurring task', [
  'Pick something you already ask an agent for weekly: a summary, a check, a rewrite.',
  'Create a scheduled task for it, using the same wording you would use in chat, and set a cadence.',
  'Read the first two runs and tighten the prompt before you trust it on autopilot.',
], 'A saved prompt on a clock is the simplest form of automation. Start with one task, watch it for a week, then add more.')}
<p>You now have the whole picture of 201: an agent is a model plus a harness that gives it tools, and everything else — assistants, memory, skills, scheduled tasks — is plumbing around that pair.</p>
</div>`;
  },
};
