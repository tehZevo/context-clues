import type { Section } from '../types.ts';
import { flow } from '../../components/diagrams.ts';

const trainFlow = () =>
  flow([
    { t: 'Examples', d: 'thousands of emails, each labeled “spam” or “not spam”' },
    { t: 'Training', d: 'the network nudges its internal numbers until its predictions match the labels' },
    { t: 'Model', d: 'the finished function — patterns frozen into weights' },
    { t: 'Inference', d: 'a brand-new email goes in, a prediction comes out' },
  ]);

export const SECTION: Section = {
  code: 'models-and-training',
  num: 2,
  title: 'What ML/AI actually are',
  tagline: 'Models, perceptrons, and the difference between studying and doing.',
  prose() {
    return `<div class="prose">
<p>A <strong>model</strong> is a system — effectively a function — that predicts some kind of output from an input. Give it an email, get back “spam” or “not spam.” Give it a photo, get back “cat.” The prediction can be a label, a number, or the next word of text.</p>
<p>The classic building block is the <strong>perceptron</strong>: a tiny decision unit that takes numbers in, weighs them, and produces a choice. Connect thousands or billions of perceptrons into layers and you get a <strong>neural network</strong>. “Deep” learning just means many of those layers.</p>
<p>The crucial distinction is between <strong>training</strong> and <strong>inference</strong>:</p>
<ul>
<li><strong>Training</strong> — studying thousands of examples of spam emails, adjusting the network each time it gets one wrong.</li>
<li><strong>Inference</strong> — deciding whether a new email is spam, using what was already learned.</li>
</ul>
${trainFlow()}
<p>Training happens rarely and costs a lot. Inference happens constantly and is comparatively cheap. Every AI answer you have ever received was inference from an already-trained model.</p>
</div>`;
  },
};
