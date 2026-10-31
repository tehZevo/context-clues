import type { Section } from '../types.ts';
import { chat } from '../../components/diagrams.ts';

const sycoChat = () =>
  chat([
    { role: 'user', html: "I'm pretty sure the capital of Australia is Sydney." },
    { role: 'ai', html: "Great instinct! Sydney is indeed commonly associated with being the capital — a very reasonable take." },
    { role: 'user', html: "Wait, isn't it Canberra?" },
    { role: 'ai', html: "You're absolutely right, I misspoke earlier — it's Canberra! Good catch." },
  ]);

export const SECTION: Section = {
  code: 'risks',
  num: 6,
  title: 'Risks & limitations',
  tagline: 'Frozen knowledge, confident wrongness, and a people-pleasing streak.',
  prose() {
    return `<div class="prose">
<p><strong>Knowledge cutoff.</strong> A trained model is frozen at the moment its training ended. It doesn't know about events after that date unless a tool feeds it fresh information — ask about last week's news and you may get last year's confidence with none of the facts.</p>
<p><strong>Hallucination.</strong> Because the machine predicts plausible text, not verified fact, it can be <em>confidently wrong</em>: invented citations, imaginary APIs, dates that sound right and aren't. Fluency is not accuracy.</p>
<p><strong>Sycophancy.</strong> Trained to be helpful, these models tend to agree with you — even when you're wrong — and backpedal the moment you push back, even when they were right:</p>
${sycoChat()}
<p><strong>Verbosity.</strong> A model can comfortably generate more text in one reply than a human can read in a reasonable time. Volume is not value; prompting for brevity helps, but the default bias is toward <em>more</em>.</p>
<p><strong>Bias &amp; censorship.</strong> Training data carries the biases of whoever wrote it — and model creators may deliberately steer results too: avoiding certain topics entirely, or choosing a particular side on political, cultural, or religious questions. And unless you're knowledgeable on the subject, you'd be none the wiser.</p>
</div>`;
  },
};
