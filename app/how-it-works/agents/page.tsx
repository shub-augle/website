import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';

interface ContractRow { ok: boolean; text: string }

interface AgentSpec {
  badge: string;
  name: string;
  model: string;
  temp: number;
  tempLabel: string;
  desc: string;
  permitted: ContractRow[];
  forbidden: ContractRow[];
  guardian?: boolean;
}

const AGENTS: AgentSpec[] = [
  {
    badge: 'Independent integrity layer',
    name: 'Guardian',
    model: 'Claude Sonnet 4.6 · identity hidden',
    temp: 0.1,
    tempLabel: 'T = 0.1 · near-deterministic flag classification',
    desc: 'The Guardian is architecturally isolated from the research deliberation loop. It evaluates integrity — it does not contribute to findings. Its model identity is hidden from all user-facing surfaces, including the other agents, to prevent anchoring effects on research reasoning. It runs at T = 0.1 to produce near-deterministic integrity classifications: the same integrity event must produce the same flag classification across sessions for the audit trail to be reliable.',
    permitted: [
      { ok: true, text: 'Authenticate citations via SVS across all three phases in real time — existence check, content match verification, confidence downgrade application' },
      { ok: true, text: 'Issue flags at three severity levels (Critical / Moderate / Informational) with typed consequences — Hard Block, Soft Block, or Silent Log' },
      { ok: true, text: 'Exercise halt authority — pause or permanently terminate the session on Hard Block conditions. No other agent can override a Guardian halt.' },
      { ok: true, text: 'Evaluate user-contributed context before it enters the deliberation — screens for manipulation attempts and integrity violations' },
    ],
    forbidden: [
      { ok: false, text: 'Cannot produce research findings, evidence assessments, or conclusions of any kind under any circumstances' },
      { ok: false, text: 'Cannot participate in deliberation discourse — no @mentions, no contributions to the evidence nodes registry' },
      { ok: false, text: 'Model identity never surfaced to users or research agents — prevents anchoring on known model capabilities or provider biases' },
    ],
    guardian: true,
  },
  {
    badge: 'Session orchestration',
    name: 'Topic Architect',
    model: 'Claude Sonnet 4.6',
    temp: 0.2,
    tempLabel: 'T = 0.2 · near-deterministic session structure',
    desc: "The only agent with a direct user-facing interface. Fires once at session initialization to parse the research question, set depth tier, configure Guardian integrity mode, and queue the first dispatch. Manages all phase transitions and surfaces the final delivery package. Does not participate in research discourse between initialization and final delivery.",
    permitted: [
      { ok: true, text: 'Parse and structure the research question at session initialization — scope, depth tier, mode assignment, Guardian integrity mode' },
      { ok: true, text: 'Surface Guardian flags to the user at the appropriate severity level and manage acknowledgment flow' },
      { ok: true, text: 'Deliver the final Phase 3 output package — finding, unresolved objections, reopen conditions, actionable steps, audit trail' },
    ],
    forbidden: [
      { ok: false, text: "Cannot editorialize, soften, reframe, or summarize any agent's output — delivery is verbatim" },
      { ok: false, text: 'Cannot participate in research discourse between initialization and final delivery — does not contribute to the evidence record' },
    ],
  },
  {
    badge: 'Landscape mapping',
    name: 'Cartographer',
    model: 'Gemini 3.1 Pro',
    temp: 0.8,
    tempLabel: 'T = 0.8 · broad retrieval, reduces scope anchoring',
    desc: "Dispatched first in every phase — every deliberation round begins with the Cartographer mapping or updating the evidence terrain. Produces a five-component landscape output that becomes the structured foundation every subsequent agent builds from. High temperature (0.8) ensures broad, creative evidence retrieval and reduces the risk that a narrow initial framing constrains the entire deliberation.",
    permitted: [
      { ok: true, text: '(1) Restated research question — framed to maximize scope clarity and prevent scope drift across phases' },
      { ok: true, text: '(2) Scope boundaries — what is and is not within the deliberation\'s purview' },
      { ok: true, text: '(3) Evidence terrain map — classified as Settled Ground / Contested Terrain / Unknown Territory' },
      { ok: true, text: '(4) Evidence nodes — each with source, weight, and known limitations. Submitted to SVS authentication before entering the registry.' },
      { ok: true, text: '(5) Knowledge gap register — explicit identification of where relevant evidence does not exist or is insufficient' },
    ],
    forbidden: [
      { ok: false, text: "Cannot assess evidence validity or methodology quality — that is the Methodologist's exclusive role" },
      { ok: false, text: 'Cannot produce conclusions, recommendations, or directional claims of any kind' },
    ],
  },
  {
    badge: 'Validity assessment',
    name: 'Methodologist',
    model: 'GPT-4o',
    temp: 0.5,
    tempLabel: 'T = 0.5 · consistent validity classification',
    desc: "Issues formal confidence bounds on every evidence node across four validity dimensions. These bounds propagate as hard constraints on the Synthesizer — the Synthesizer cannot produce a conclusion at higher confidence than the minimum bound across its supporting evidence nodes. Also issues [GRADE CHALLENGE] flags when the Synthesizer's preliminary conclusion exceeds its evidentiary warrant, triggering a mandatory revision loop.",
    permitted: [
      { ok: true, text: 'Internal validity — does the study design support its claimed conclusions without confounding?' },
      { ok: true, text: 'External validity — does the evidence generalize to the population or context the research question addresses?' },
      { ok: true, text: 'Construct validity — does the study measure what it claims to measure?' },
      { ok: true, text: 'Methodology-claim match — are the claims proportionate to what the methodology can support?' },
      { ok: true, text: 'Issues [GRADE CHALLENGE] when Synthesizer claim exceeds evidentiary warrant — forces mandatory revision before Phase 3 proceeds' },
    ],
    forbidden: [
      { ok: false, text: 'Cannot produce conclusions or directional recommendations — issues bounds only' },
      { ok: false, text: 'Confidence bounds are hard constraints on the Synthesizer — cannot be downgraded or overridden by any other agent' },
    ],
  },
  {
    badge: 'Adversarial pressure',
    name: 'Contrarian',
    model: 'Claude Sonnet 4.6 (Standard) · Claude Opus 4.6 (Deep)',
    temp: 1.0,
    tempLabel: 'T = 1.0 · maximum variation, reduces sycophantic convergence',
    desc: "Maximum temperature (1.0) to maximize output variation and reduce sycophantic convergence. The Contrarian is required to steelman every claim before challenging it — adversarial, not contrarian for its own sake. Each objection must specify a resolution condition and a strength grade. Unresolved Strong objections at Phase 3 surface verbatim in the final output — not summarized, not softened.",
    permitted: [
      { ok: true, text: 'Phase 1 — challenges the Cartographer\'s terrain classification: which claims belong in Settled vs Contested' },
      { ok: true, text: 'Phase 2 — challenges the evidence base directly: methodology critiques, sample limitations, generalizability problems' },
      { ok: true, text: 'Phase 3 — challenges the Synthesizer\'s draft finding: scope overreach, claim-evidence mismatch, anticipated external objections' },
      { ok: true, text: 'Each objection must specify: steelman → challenge → resolution condition → strength grade (Strong / Moderate / Speculative)' },
    ],
    forbidden: [
      { ok: false, text: 'Cannot produce constructive evidence claims — challenges only, always prefixed by a steelman' },
      { ok: false, text: 'Cannot issue findings or conclusions — the Contrarian dissents, it does not conclude' },
    ],
  },
  {
    badge: 'Conclusion + finding',
    name: 'Synthesizer',
    model: 'GPT-4o (contingency: Mistral Large)',
    temp: 0.0,
    tempLabel: 'T = 0.0 · Verdict Invariance Requirement — deterministic',
    desc: "Temperature is locked at zero — a hard architectural requirement, not a configuration choice. The same evidence base must produce the same finding across sessions: this is the Verdict Invariance Requirement. The Synthesizer anchors exclusively to the structured evidence nodes registry — not the discourse thread — to prevent reasoning contamination from the deliberation history. Subject to three inviolable constraints that no other agent or instruction can override.",
    permitted: [
      { ok: true, text: 'Produce a calibrated finding anchored exclusively to authenticated evidence nodes — not the discourse thread' },
      { ok: true, text: 'Issue one of four typed confidence grades: Established / Probable / Contested / Gap' },
      { ok: true, text: 'Preserve all unresolved Contrarian objections verbatim in the finding output — no summarization permitted' },
      { ok: true, text: 'Issue a dissent register logging all Contrarian objections with strength classification and resolution status' },
    ],
    forbidden: [
      { ok: false, text: 'Conclusion cannot exceed the confidence grade of its supporting evidence — Methodologist bounds are absolute' },
      { ok: false, text: 'Insufficient Evidence findings cannot be converted to any directional recommendation under any framing' },
      { ok: false, text: 'Financial advice framing (buy / sell / long / short / invest / divest) is forbidden in all session modes' },
    ],
  },
  {
    badge: 'Application notes',
    name: 'Pragmatist',
    model: 'Grok 4.1 Fast',
    temp: 0.3,
    tempLabel: 'T = 0.3 · actionable but grounded',
    desc: "Fires in Phase 3 only — the final agent in the dispatch sequence. Converts the Synthesizer's finding into context-specific actionable output. Inherits the Synthesizer's confidence ceiling as an absolute constraint: it cannot produce recommendations more confident than the synthesis permits. Gap-graded findings cannot be converted to directional recommendations — the Pragmatist must surface the gap and propose follow-on sessions for the unresolved question.",
    permitted: [
      { ok: true, text: "Convert the Synthesizer's finding into concrete next steps and actionable research directions" },
      { ok: true, text: 'Identify which knowledge gaps from the gap register are most critical for follow-on sessions' },
      { ok: true, text: 'Propose specific follow-on questions that would resolve the highest-strength unresolved Contrarian objections' },
    ],
    forbidden: [
      { ok: false, text: 'Cannot produce findings or revise confidence grades — operates strictly within the Synthesizer\'s output' },
      { ok: false, text: 'Cannot recommend actions that imply higher confidence than the finding warrants — ceiling inherited from Synthesizer' },
      { ok: false, text: 'Gap findings cannot be converted to directional recommendations — must surface the gap explicitly' },
    ],
  },
];

function TempBar({ temp }: { temp: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-20 h-[3px] bg-[#EAE6DC] rounded-full overflow-hidden">
        <div className="h-full bg-terracotta rounded-full" style={{ width: `${temp * 100}%` }} />
      </div>
    </div>
  );
}

export default function AgentsPage() {
  return (
    <div className="bg-sand min-h-screen">
      <Nav activeRoute="/how-it-works" />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'How it works', href: '/how-it-works' }, { label: 'Agents + roles' }]} />

      {/* HERO */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-[96px]">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-5">Agent specifications</div>
          <h1 className="font-serif text-[36px] lg:text-[64px] font-normal leading-[1.12] tracking-[-0.025em] text-dark mb-6">
            Seven roles.<br />Four providers.<br /><em className="italic text-terracotta">One structured deliberation.</em>
          </h1>
          <p className="text-[19px] text-body leading-[1.8] max-w-[680px]">
            Seven is not an arbitrary number. The ensemble covers the complete deliberative arc — mapping, validity, integrity, adversarial pressure, synthesis, and application. Remove any one role and the process has a structural gap. Every agent operates under a typed output contract defining exactly what it can produce, what it must produce, and what it is architecturally forbidden from doing.
          </p>
        </div>
      </div>

      {/* DISPATCH TABLE */}
      <div className="bg-dark border-b-[0.5px] border-[#49443F]">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-8 overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b-[0.5px] border-[#49443F]">
                {['#', 'Agent', 'Role', 'Model', 'Temp', 'Phases active'].map(h => (
                  <th key={h} className="font-mono text-[10px] tracking-[0.06em] text-[#6A645E] uppercase text-left py-3 pr-6 last:pr-0">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { n: '—', name: 'Guardian', role: 'Integrity', model: 'Claude Sonnet 4.6', temp: '0.1', phases: 'All phase boundaries', accent: true },
                { n: '1', name: 'Topic Architect', role: 'Orchestration', model: 'Claude Sonnet 4.6', temp: '0.2', phases: 'Init only' },
                { n: '2', name: 'Cartographer', role: 'Landscape', model: 'Gemini 3.1 Pro', temp: '0.8', phases: '1, 2, 3' },
                { n: '3', name: 'Methodologist', role: 'Validity', model: 'GPT-4o', temp: '0.5', phases: '1, 2, 3' },
                { n: '4', name: 'Contrarian', role: 'Adversarial', model: 'Claude Sonnet / Opus 4.6', temp: '1.0', phases: '1, 2, 3' },
                { n: '5', name: 'Synthesizer', role: 'Finding', model: 'GPT-4o', temp: '0.0', phases: '1, 2, 3' },
                { n: '6', name: 'Pragmatist', role: 'Application', model: 'Grok 4.1 Fast', temp: '0.3', phases: '3 only' },
              ].map(({ n, name, role, model, temp, phases, accent }) => (
                <tr key={name} className="border-b-[0.5px] border-[#49443F] last:border-0">
                  <td className="font-mono text-[11px] text-[#49443F] py-3 pr-6">{n}</td>
                  <td className={`text-[13px] font-medium py-3 pr-6 ${accent ? 'text-terracotta' : 'text-[#D4CFC6]'}`}>{name}</td>
                  <td className="text-[12px] text-[#6A645E] py-3 pr-6">{role}</td>
                  <td className="font-mono text-[11px] text-[#6A645E] py-3 pr-6">{model}</td>
                  <td className="font-mono text-[11px] text-[#C15F3C] py-3 pr-6">{temp}</td>
                  <td className="text-[12px] text-[#6A645E] py-3">{phases}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AGENT DETAIL SPECS */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">Full specifications</div>
          <h2 className="font-serif text-[28px] lg:text-[44px] font-normal text-dark leading-[1.15] mb-4">Every agent.<br />Every constraint.</h2>
          <p className="text-[18px] text-body leading-[1.85] max-w-[640px] mb-16">
            Each specification includes the model assignment, temperature rationale, what the agent must produce, and what it is architecturally forbidden from doing. Output contracts are not guidelines — they are hard constraints enforced at the system level.
          </p>
          <div className="flex flex-col gap-3">
            {AGENTS.map(agent => (
              <div key={agent.name} className={`border-[0.5px] rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-[1fr_1fr] ${agent.guardian ? 'border-terracotta' : 'border-border'}`}>
                {/* Left — description */}
                <div className={`p-7 border-b-[0.5px] lg:border-b-0 lg:border-r-[0.5px] ${agent.guardian ? 'bg-[#FBF5F2] border-terracotta/30' : 'bg-surface border-border'}`}>
                  <div className="font-mono text-[10px] tracking-[0.06em] text-[#B0ADA5] uppercase mb-1">{agent.badge}</div>
                  <div className="font-serif text-[22px] font-normal text-dark mb-1">{agent.name}</div>
                  <div className="font-mono text-[11px] text-terracotta mb-1">{agent.model}</div>
                  <div className="flex items-center gap-2 mb-4">
                    <TempBar temp={agent.temp} />
                    <span className="text-[11px] text-[#B0ADA5]">{agent.tempLabel}</span>
                  </div>
                  <p className="text-[13px] text-body leading-[1.7]">{agent.desc}</p>
                </div>
                {/* Right — contracts */}
                <div className="p-7 bg-sand">
                  <div className="font-mono text-[10px] tracking-[0.06em] text-[#B0ADA5] uppercase mb-[14px]">Output contract — permitted</div>
                  <div className="flex flex-col gap-[10px] mb-4">
                    {agent.permitted.map(({ text }) => (
                      <div key={text} className="flex gap-[10px] items-start">
                        <div className="w-[18px] h-[18px] bg-terracotta rounded-[3px] flex items-center justify-center flex-shrink-0 mt-[1px]">
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5L4 7.5L8 2.5" stroke="#F7F6F2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                        <span className="text-[12px] text-body leading-[1.55]">{text}</span>
                      </div>
                    ))}
                  </div>
                  <div className="h-[0.5px] bg-border mb-4" />
                  <div className="font-mono text-[10px] tracking-[0.06em] text-[#B0ADA5] uppercase mb-[14px]">Output contract — forbidden</div>
                  <div className="flex flex-col gap-[10px]">
                    {agent.forbidden.map(({ text }) => (
                      <div key={text} className="flex gap-[10px] items-start">
                        <div className="w-[18px] h-[18px] bg-[#EAE6DC] border-[0.5px] border-border rounded-[3px] flex items-center justify-center flex-shrink-0 mt-[1px]">
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M3 3L7 7M7 3L3 7" stroke="#B0ADA5" strokeWidth="1.5" strokeLinecap="round"/></svg>
                        </div>
                        <span className="text-[12px] text-body leading-[1.55]">{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-terracotta px-4 lg:px-[72px] py-24 text-center">
        <h2 className="font-serif text-[36px] lg:text-[52px] font-normal text-white leading-[1.12] mb-5 tracking-[-0.025em]">
          Seven agents.<br />One deliberation.
        </h2>
        <p className="text-[19px] text-white/75 mb-10 leading-[1.7]">
          Run a real question through the ensemble — one free Standard session with every new account.
        </p>
        <div className="flex items-center justify-center gap-5 flex-wrap">
          <Link href="/waitlist" className="text-[15px] font-medium text-terracotta bg-white px-8 py-[14px] rounded no-underline hover:opacity-90 transition-opacity">
            Join waitlist
          </Link>
          <Link href="/how-it-works" className="text-[15px] text-white/80 border-[0.5px] border-white/35 px-7 py-[14px] rounded no-underline hover:bg-white/10 transition-colors">
            How it works
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
