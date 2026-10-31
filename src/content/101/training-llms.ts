import type { Section } from '../types.ts';
import { callout } from '../../components/ui.ts';

export const SECTION: Section = {
  code: 'training-llms',
  num: 4,
  title: 'How LLMs are trained',
  tagline: 'Mountains of text, a privacy asterisk, and reward-based polish.',
  prose() {
    return `<div class="prose">
<p>Pretraining starts with <strong>lots and lots of text</strong> — books, websites, code repositories, forums — fed to the model in pieces while it repeatedly plays the next-token game. Billions (now trillions) of words later, the network's weights encode an astonishing amount of grammar, fact, style, and reasoning-shaped pattern.</p>
${callout('warn', 'Privacy implication', '<p>AI services can train on the data you send them. Anything you paste into a hosted model — code, emails, ideas — could be baked into the next version of that model. Check what your provider does with your inputs, especially at work.</p>')}
<p>A raw pretrained model just continues text, for better or worse. To make it <em>useful in conversation</em>, labs add a second phase: <strong>RLHF — reinforcement learning from human feedback</strong>. Humans rank candidate answers (“this one beats that one”), and the model is rewarded for producing answers humans prefer. That's where the helpful, polished tone comes from — and, as we'll see later, some of the people-pleasing too.</p>
</div>`;
  },
};
