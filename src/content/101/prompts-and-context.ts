import type { Section } from '../types.ts';

export const SECTION: Section = {
  code: 'prompts-and-context',
  num: 9,
  title: 'Prompts and context',
  tagline: 'What you send — and what silently steers every reply.',
  prose() {
    return `<div class="prose">
<p>The <strong>prompt</strong> is simply the text you hand to the model. The <strong>context</strong> is everything the model gets to see when it answers: your latest message, the conversation so far, plus instructions you never wrote.</p>
<p>Those hidden instructions are the <strong>system prompt</strong>: directions given to the AI about how to respond, what to say, and what not to say. Every product ships one. It's why the same underlying model can behave like a cautious coding assistant in one app and a chatty coach in another.</p>
<div class="ntq">SYSTEM: You are a careful tutor. Never give the final answer before the student tries.<span class="caret">&#9613;</span></div>
<p>Remember the context window from section 3: on every message, all of this (system prompt, history, your new line) is re-fed inside that fixed window. “Context” isn't memory; it's just what fit.</p>
</div>`;
  },
};
