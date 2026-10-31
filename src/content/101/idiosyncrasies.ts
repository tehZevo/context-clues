import type { Section } from '../types.ts';
import { chips } from '../../components/diagrams.ts';
import { callout } from '../../components/ui.ts';

export const SECTION: Section = {
  code: 'idiosyncrasies',
  num: 7,
  title: 'Artificial idiosyncrasies',
  tagline: 'The tells that give machine-written text away.',
  prose() {
    return `<div class="prose">
<p>AI output has habits. Sometimes the model itself produces things that are a tell — patterns so frequent in its answers that readers learn to spot them, the way a forger's pen gives them away:</p>
<ul>
<li><strong>Em dashes (—)</strong> — deployed at a frequency no natural writer sustains</li>
<li><strong>Purple prose</strong> — text that is ornate and flowery beyond its job: "a testament to the unwavering tapestry of human ingenuity"</li>
<li><strong>Catchphrases</strong> — the same stock phrases recycled across millions of conversations:</li>
</ul>
${chips(
  ['“you’re right to push back”', '“the smoking gun”', '“the classic ___”', 'Elias Thorne', 'Elara Thorne'],
  'Fictional placeholder names — “Elias/Elara Thorne” — show up so often they became a meme.',
)}
<p>None of these are reliable on their own, and the list is a <strong>moving target</strong>: as models update, old tells fade and new ones form. Treat them like accents, not fingerprints.</p>
${callout("tip", "Did you notice?", "<p>Have you noticed any tells in this lesson so far? What would you say about AI's involvement in this course?</p>")}
</div>`;
  },
};
