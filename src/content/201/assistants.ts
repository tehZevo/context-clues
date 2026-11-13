import type { Section } from '../types.ts';
import { agentDefs, lvlChat, lvlDesktop, lvlPersistent, lvlSubagents } from '../../components/diagrams.ts';
import { callout } from '../../components/ui.ts';

export const SECTION: Section = {
  code: 'assistants',
  num: 3,
  title: 'Agentic assistants',
  tagline: 'From desktop helpers to agents with their own computers.',
  prose() {
    return `<div class="prose">
${agentDefs()}
<p>Agents come in different levels of autonomy: how much room the product gives the model to act on its own. The levels, from least autonomous to most:</p>
<div class="lvl">
<p><strong>1. Chat apps with tools.</strong> The level you already know from 101: chat apps answer a question after quietly searching the web or running a quick calculation. One step up is <strong>deep research</strong> mode, now standard across the major providers: the agent plans its own research, reads dozens of sources, and returns a cited report that would take a person hours. You can also augment these apps with <strong>connectors</strong> to the services you use (email, calendar, Slack); the open standard for connectors is called Model Context Protocol, or "MCP" for short.</p>
<figure>${lvlChat()}</figure>
</div>
<div class="lvl">
<figure>${lvlDesktop()}</figure>
<p><strong>2. Desktop apps.</strong> Many cloud AI providers ship desktop versions, and this is where tools matter most: reading and editing files on your machine, using the same connectors you can add to chat apps, and in some cases watching your screen to use an app the way you would. Web browsers are getting agent integrations too, allowing agents to click, fill forms, and finish tasks in the pages you have open.</p>
</div>
<div class="lvl">
<p><strong>3. Sub-agents.</strong> A common trick shared by many agents is to hand a subtask to a helper agent with its own fresh context (“research these five vendors and report back in ten lines”), then keep the short report and throw away the noisy working notes. It keeps the main conversation small and cheap.</p>
<figure>${lvlSubagents()}</figure>
</div>
<div class="lvl">
<figure>${lvlPersistent()}</figure>
<p><strong>4. Persistent agents.</strong> These listen in the background or run on a schedule instead of waiting for you to open an app: a standing work environment, recurring jobs (“every morning, sort my inbox”), and memory that grows as you use them. Open-source options run on a machine you provide; hosted offerings run on the provider's servers under an identity of their own, posting and messaging on platforms the way a person would.</p>
</div>
${callout('note', 'Names age fast', '<p>This list is a snapshot of late 2026. Product names will change, but the levels are the stable part: more access, more autonomy, more accounts. The safety habits in the next section apply at every level.</p>')}
</div>`;
  },
};
