import type { Section } from '../types.ts';

export const SECTION: Section = {
  code: 'from-completion-to-chat',
  num: 8,
  title: 'From LLM to chat',
  tagline: 'How a text-continuation engine learned to have conversations.',
  prose() {
    return `<div class="prose">
<p>Since LLMs are text-continuation engines, the earliest generative applications fed them prompts shaped like <em>incomplete documents</em> and let the model finish the sentence:</p>
<div class="ntq">1 + 1 =<span class="caret">&#9613;</span></div>
<p>The most likely continuation — and often the correct one — is <strong>2</strong>.</p>
<div class="ntq">Today, the weather in the desert will be<span class="caret">&#9613;</span></div>
<p><strong>"sunny"</strong> continues that text with high probability.</p>
<p>Workable — but you were still writing the model's lines. The breakthrough at OpenAI was realizing that if you <strong>framed the prompt as a chat log</strong>, the continuation engine would keep the transcript going… which means it would "respond" to whatever came after the last <code>User:</code> marker. Ask a question, append it in conversation form, and the model completes the assistant's turn.</p>
<p>That framing trick is ChatGPT. The entire chat product you know — bubbles, send buttons, history — is a friendly skin over one long text document that keeps getting continued.</p>
</div>`;
  },
};
