import type { Section } from '../types.ts';
import { callout, exercise } from '../../components/ui.ts';

const skillFile = `<div class="skill-file"><pre>---
name: meeting-summary
description: Summarize meeting notes into decisions and follow-ups.
---
When summarizing meeting notes:
- List the attendees
- Bullet the decisions that were made
- List follow-ups, each with an owner</pre></div>`;

export const SECTION: Section = {
  code: 'skills',
  num: 6,
  title: 'Skills',
  tagline: 'Write a procedure once; your agent follows it every time.',
  prose() {
    return `<div class="prose">
<p>Agents get more useful as they know how <em>you</em> want work done. A <strong>skill</strong> is the common way to teach that: a short, written procedure for a repeatable task, like summarizing meeting notes or formatting a weekly report.</p>
<p>A skill is deliberately plain. At minimum it has a <strong>name</strong> and a <strong>description</strong>. The model normally sees only that one-line list of names and descriptions; when one matches the task at hand, the harness loads the full instructions into the context window. Nothing is trained into the model. A skill is just text, added when relevant.</p>
${skillFile}
<p>Some agents store skills as markdown files like the one above; others give you separate fields for name, description, and instructions. It is the same thing either way. More advanced tools let a skill folder carry reference material or scripts the agent can pull in when it needs them.</p>
${callout('note', 'Skills vs memory', '<p>Memory stores facts about you and your world. Skills store procedures: how you like a task done. Both are plain text the harness feeds into the context window, and both are worth reviewing now and then.</p>')}
${exercise('Try it: create a simple skill', [
  'Pick a small task you repeat: summarizing meeting notes, rewriting titles, turning a thread into a to-do list.',
  'Write it as a skill: a name, a one-line description, and a few lines of instructions. Save it as a markdown file if your agent reads those, or paste the same text into its name/description/instructions fields.',
  'Start a fresh session and hand it a matching task. Some agents load the skill automatically when the description fits; others let you call it by name.',
], 'A skill is just text the harness adds when relevant. Write the procedure once and the agent follows it every time.')
}</div>`;
  },
};
