import type { Section } from '../types.ts';
import { callout, exercise } from '../../components/ui.ts';

export const SECTION: Section = {
  code: 'memory',
  num: 5,
  title: 'Memory',
  tagline: 'Some agents keep notes. The model itself never changes.',
  prose() {
    return `<div class="prose">
<p>Some agents advertise <strong>persistent memory</strong>: preferences and project facts that survive between sessions, so you don't repeat yourself. Not all agents have this, and when they do it is simpler than it sounds.</p>
<p>Elaborate memory systems exist, but most memory is plain text files. The harness saves a note (“user prefers windowed mode”, “project deadline: Nov 14”) and pastes the notes back into the context window at the start of the next session. That's it. Some agents also let you add facts yourself: tell one “remember that I prefer windowed mode” and it writes that note down like any other.</p>
<p>This is the 101 lesson again: the model never learns you. It is the same forgetful autocomplete, and the agent only “remembers” because the harness re-feeds it your file of notes.</p>
${callout('warn', 'Your notes are stored somewhere', '<p>Memory about you is stored somewhere, often on someone else\u2019s server. Check where your agent keeps its notes, read them, and delete anything wrong or overly personal.</p>')}
${exercise('Try it: inspect your agent\u2019s memory', [
  'Find where your agent keeps its notes: a settings screen, or a memory file in its folder.',
  'Read what it has stored about you. Delete anything wrong, stale, or too personal.',
  'Add one fact yourself: \u201cremember that I prefer short answers.\u201d Start a new session and see whether it applies.',
], 'Memory is just notes. You can read them, edit them, and delete them.')
}
</div>`;
  },
};
