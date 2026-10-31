import type { Section } from '../types.ts';
import { nextToken, tokenDemo, ctxWinDemo } from '../../components/diagrams.ts';

const LONG_TEXT =
  'A context window is the fixed-size budget of text an LLM can see at once. Everything you send — your question, the conversation so far, any files or pages you paste in — competes for that space. When the input grows past the edge of the window, it has to be handled somehow: older messages get trimmed away, long documents get compacted into summaries, or the request simply fails. This is why a chat that started three hours ago can “forget” what you told it on page one, and why throwing an entire book at a model usually means summarizing it first.';

export const SECTION: Section = {
  code: 'inside-an-llm',
  num: 3,
  title: 'What an LLM is',
  tagline: 'A glorified autocomplete over tokens, staring through a fixed-size window.',
  prose() {
    return `<div class="prose">
<p>A <strong>large language model (LLM)</strong> is, at its core, a glorified autocomplete. It has read so much text that when it sees what came before, it can predict — token by token — what likely comes next.</p>
<h3>Tokens: how models see text</h3>
<p>Models don't process whole words the way you do. Words and characters are chopped into <strong>tokens</strong>, which can be:</p>
<ul>
<li>a whole word — <code>dog</code>, <code>the</code></li>
<li>multiple common words seen together — <code>New York</code></li>
<li>a common part of a word — <code>-ing</code>, <code>un-</code></li>
<li>punctuation or symbols</li>
<li>or any combination of the above</li>
</ul>
${tokenDemo("Unbelievable — New York's tokenization is 4 tokens?")}
<h3>The next-token game</h3>
<p>Generation is just this prediction repeated. Given a prompt, the model scores what could come next and picks one:</p>
${nextToken('Today, the weather in the desert will be', [
  { t: '"sunny"', p: 58 },
  { t: '"hot"', p: 21 },
  { t: '"dry"', p: 13 },
  { t: '"crowded"', p: 3 },
])}
<p class="chips-note">Illustrative numbers — but the shape of the process is exactly this.</p>
<h3>The context window</h3>
<p>An LLM can only see a <strong>large but fixed-size window</strong> of text at once. Inputs larger than the window need to be compacted or trimmed — which is why very long chats start to "forget," and whole books usually arrive as summaries.</p>
${ctxWinDemo(LONG_TEXT)}
<h3>Beyond text in</h3>
<p>Modern LLMs are <strong>multimodal</strong>: not only text input/output, but images and audio go in too. The same predict-next-piece machinery still runs underneath — there's just more kinds of "pieces."</p>
</div>`;
  },
};
