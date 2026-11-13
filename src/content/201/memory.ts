import type { Section } from '../types.ts';
import { callout, exercise } from '../../components/ui.ts';

export const SECTION: Section = {
  code: 'memory',
  num: 6,
  title: 'Memory',
  tagline: 'Some agents keep notes. The model itself never changes.',
  prose() {
    return `<div class="prose">
<p>Some agents advertise <strong>persistent memory</strong>: user preferences and project facts that survive between sessions, so you don't have to repeat yourself. Memory is commonly stored as plain text: the harness saves a note (“user prefers windowed mode”, “project deadline: Nov 14”) and pastes the notes back into the context window at the start of the next session. Some agents also let you add facts yourself: tell one “remember that I prefer windowed mode” and it writes that note down like any other.</p>
<p>None of this changes the model itself: it never learns anything. The memory lives in the notes, not in the model.</p>
${callout('warn', 'Your notes are stored somewhere', '<p>Anything you tell the agent can end up in its notes, and those notes are often stored on someone else\u2019s server. Be deliberate about what you share and what access you grant: details you would keep from a new coworker probably don\u2019t belong in an agent\u2019s memory either.</p>')}
${exercise('Try it: inspect your agent\u2019s memory', [
  'Find where your agent keeps its notes: a settings screen, or a memory file in its folder.',
  'Read what it has stored about you. If something is there that you never meant to share, delete it and be pickier about what you tell it going forward.',
  'Add one fact yourself: \u201cremember that I prefer short answers.\u201d Start a new session and see whether it applies.',
], 'Memory is just notes. You decide what goes in, and you can read, edit, and delete them at any time.')
}
</div>`;
  },
};
