import type { Section } from '../types.ts';

export const SECTION: Section = {
  code: 'strengths',
  num: 5,
  title: "What LLMs are good at",
  tagline: 'Reading, summarizing, brainstorming, rewriting — at machine speed.',
  prose() {
    return `<div class="prose">
<p>LLMs shine at work where <em>volume</em> beats <em>perfection</em>:</p>
<ul>
<li><strong>Reading and summarization</strong> — a model can read thousands of words in seconds and hand you the gist. Articles, threads, reports: skimmed before you've finished your coffee.</li>
<li><strong>Brainstorming</strong> — ask for twenty options and get twenty plus three you'd never have written. Quantity is cheap; curation is yours.</li>
<li><strong>Rewriting</strong> — same ideas, new register: shorter, friendlier, more formal, translated across audiences or languages.</li>
</ul>
<p>Notice the pattern: all of these are <em>text transformations</em> where a good-enough draft at machine speed is worth more than a slow perfect one. The next section covers what happens when you ask for more than that.</p>
</div>`;
  },
};
