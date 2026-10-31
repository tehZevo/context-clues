import type { Section } from '../types.ts';
import { callout } from '../../components/ui.ts';

export const SECTION: Section = {
  code: 'what-is-agentic',
  num: 1,
  title: 'What “agentic” means',
  tagline: 'From answering questions to getting things done.',
  prose() {
    return `<div class="prose">
<p>In 101, AI answered you: you ask, it writes, it stops. Agentic AI is given a <strong>goal</strong> and acts on your behalf until it's done: reading and writing files, browsing the web, sending mail, running programs.</p>
<p>Real examples of what people hand to these systems:</p>
<ul>
<li>“Tidy my downloads folder, sorted by project.”</li>
<li>“Watch this inbox and draft replies to customer questions.”</li>
<li>“Check competitor prices every morning and write me a summary.”</li>
</ul>
<p>The shift is that the output becomes an <strong>action</strong>. The model itself hasn't changed: it still only produces text, exactly as 101 described. What changed is what that text gets plugged into.</p>
<p>You may have already seen agentic behavior inside an ordinary chat app: some search the web before answering, or generate a chart as part of the reply. That is the same setup at a smaller scale: the chat app calls tools behind the scenes, and the model uses one when a plain answer isn't enough.</p>
${callout('note', 'Not a new kind of model', '<p>An agent is not a new kind of model. It is the same chat model you already know, wired to tools and run in a loop. Nothing about the model itself changed.</p>')}
</div>`;
  },
};
