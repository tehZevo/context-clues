import type { Section } from '../types.ts';
import { venn } from '../../components/diagrams.ts';
import { callout } from '../../components/ui.ts';

export const SECTION: Section = {
  code: 'what-is-ai',
  num: 1,
  title: 'What is AI?',
  tagline: 'A broad field — any intelligent action or output chosen by a machine.',
  prose() {
    return `<div class="prose">
<p><strong>Artificial intelligence</strong> isn't one technology. It's the label for any situation where a machine chooses an action or produces an output that we'd call <em>intelligent</em> if a person had done it: picking a chess move, filtering spam, suggesting your next video, writing a paragraph.</p>
<p>There is no single recipe required to be "AI." Hand-written rules can do it. Statistics can do it. Neural networks — the current champions — do it by learning from examples.</p>
${venn()}
<p><strong>Machine learning (ML)</strong> is today's dominant approach inside that big AI circle: instead of a human coding every rule, you show the system many examples and let it discover the patterns. <strong>Deep learning (DL)</strong> is a slice of ML built from neural networks with many layers — it's what powers most of the "AI" in today's headlines.</p>
${callout('note', 'Vocabulary shortcut', '<p>When someone says “AI” in casual conversation, they usually mean a deep-learning model — often an LLM. That’s a narrow slice of the circle above, not the whole thing.</p>')}
</div>`;
  },
  slides() {
    return [
      `<h2>“Artificial intelligence”, plainly</h2>
<ul class="big">
<li>Any intelligent <strong>action or output chosen by a machine</strong></li>
<li>No single required technique — rules, statistics, or learned models</li>
<li>Chess engines, spam filters, recommendations, and LLMs are all AI</li>
</ul>`,
      `<h2>AI ⊃ ML ⊃ DL</h2>
${venn()}
<p class="note-inline">Deep learning is a slice of machine learning, which is a slice of AI.</p>`,
      `<h2>Why “learning” won</h2>
<ul class="big">
<li>Hand-written rules are brittle — someone must think of every case</li>
<li><strong>ML:</strong> show thousands of examples, let the system find the patterns</li>
<li><strong>DL:</strong> ML with deep neural networks — the engine behind modern AI</li>
</ul>`,
    ];
  },
};
