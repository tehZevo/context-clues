import type { Section } from '../types.ts';
import { callout, exercise } from '../../components/ui.ts';

export const SECTION: Section = {
  code: 'prompting-basics',
  num: 10,
  title: 'Prompting basics',
  tagline: 'Any text is valid input — and context beats keywords.',
  prose() {
    return `<div class="prose">
<p>“Prompting” can mean several things — designing system prompts, engineering elaborate templates. For this course we'll keep it simple: <strong>prompting = the messages you send to a chat LLM.</strong></p>
<p>The bar for entry is zero. Any text is a valid input: full sentences, single words, emoji. There is no magic syntax to memorize before your first conversation works.</p>
${callout('tip', 'Context beats keywords', '<p>A search engine wants your shortest keyword string. An LLM does the opposite — it rewards background. “Why is my laptop so slow?” gets a fine answer; add “four years old, 8 GB RAM” and it gets <em>your</em> answer.</p>')}
${exercise('Try it: same question, different context', [
  'Open any AI chat service (ChatGPT, Claude, Gemini, whatever you have).',
  'Ask something vague: <strong>“Why are my tomatoes curling?”</strong> Notice the reply reads like a generic gardening article.',
  'Ask the same question with your situation added: raised beds, zone 6, last frost early May, two weeks of heat after heavy rain. Compare the answers.',
], 'Same model, same question. Only the context changed, and the answer moved. That is prompting in one experiment.')}
${exercise('Try it: summarize something long', [
  'Find something genuinely long that you never read voluntarily: a terms-of-service page, a news article, a work document.',
  'Paste the whole thing into a chat and ask: “summarize this in five bullet points.”',
], 'A document you never planned to read, condensed into five lines you actually finished. Summarization is one area where LLMs really shine.')}
<p>You now have the whole mental model for 101: models learn functions from examples, LLMs continue tokens inside a fixed window, and chat is just a framing trick over that machinery. Everything after this course builds on those pieces.</p>
</div>`;
  },
};
