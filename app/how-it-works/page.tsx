import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';

const AGENT_DOT_COLORS: Record<string, string> = {
  'Topic Architect': '#C15F3C',
  'Cartographer': '#6A8FA0',
  'Methodologist': '#7A8A6A',
  'Guardian': '#C15F3C',
  'Contrarian': '#A05040',
  'Synthesizer': '#5A7A8A',
  'Pragmatist': '#8A7A5A',
};

interface PhaseAgent { name: string; role: string; accent?: boolean }

function PhaseAgentRow({ name, role, accent }: PhaseAgent) {
  return (
    <div className="flex items-center gap-2 text-[12px]">
      <div className="w-[6px] h-[6px] rounded-full flex-shrink-0" style={{ background: AGENT_DOT_COLORS[name] || '#6A645E' }} />
      <span className={`font-medium ${accent ? 'text-terracotta' : 'text-[#D4CFC6]'}`}>{name}</span>
      <span className="text-[#6A645E]">{role}</span>
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <div className="bg-sand min-h-screen">
      <Nav activeRoute="/how-it-works" />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'How it works' }]} />

      {/* HERO */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-[96px]">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-5">The ensemble explained</div>
          <h1 className="font-serif text-[36px] lg:text-[64px] font-normal leading-[1.12] tracking-[-0.025em] text-dark mb-6 max-w-[800px]">
            Seven agents.<br />Three phases.<br /><em className="italic text-terracotta">One structured deliberation.</em>
          </h1>
          <p className="text-[19px] text-body leading-[1.8] max-w-[640px] mb-8">
            Augle doesn't ask a single model for an answer. It routes your question through a seven-agent ensemble — each agent with a defined role, fixed dispatch order, and typed output contract — across three deliberation phases before any finding is produced.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { href: '/how-it-works/phases', label: 'Phase architecture' },
              { href: '/how-it-works/agents', label: 'Agents + roles' },
              { href: '/how-it-works/guardian', label: 'Guardian system' },
              { href: '/how-it-works/scoring', label: 'Confidence + dissent scoring' },
            ].map(({ href, label }) => (
              <Link key={href} href={href} className="text-[14px] text-body bg-surface border-[0.5px] border-border px-4 py-2 rounded hover:border-terracotta hover:text-terracotta transition-colors no-underline">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* DISPATCH STRIP */}
      <div className="bg-dark border-b-[0.5px] border-[#49443F]">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-4 flex items-center gap-3 flex-wrap">
          {[
            { name: 'Topic Architect', sub: 'orchestration', accent: true },
            null,
            { name: 'Cartographer', sub: 'landscape' },
            null,
            { name: 'Methodologist', sub: 'validity' },
            null,
            { name: 'Guardian', sub: 'phase boundaries', accent: true },
            null,
            { name: 'Contrarian', sub: 'adversarial' },
            null,
            { name: 'Synthesizer', sub: 'conclusion' },
            null,
            { name: 'Pragmatist', sub: 'phase 3 only' },
          ].map((item, i) =>
            item === null ? (
              <span key={i} className="text-[#49443F] text-[14px]">→</span>
            ) : (
              <div key={item.name} className="flex flex-col">
                <span className={`text-[13px] font-medium ${item.accent ? 'text-terracotta' : 'text-[#D4CFC6]'}`}>{item.name}</span>
                <span className="font-mono text-[10px] text-[#6A645E]">{item.sub}</span>
              </div>
            )
          )}
        </div>
      </div>

      {/* PHASE ARCHITECTURE */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">Phase architecture</div>
          <h2 className="font-serif text-[28px] lg:text-[44px] font-normal text-dark leading-[1.15] mb-4">Three phases. Each one builds on the last.</h2>
          <p className="text-[18px] text-body leading-[1.85] max-w-[640px] mb-12">
            Agents don't run in parallel. Each phase produces a structured output that constrains the next. The Methodologist's confidence bounds become hard limits on the Synthesizer. The Contrarian's unresolved objections surface verbatim in the final finding.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[#49443F] border-[0.5px] border-[#49443F] rounded-lg overflow-hidden">
            {[
              {
                num: 'Phase 1 · Exploration', name: 'Map the terrain',
                body: "The Cartographer decomposes the question into settled ground, contested terrain, and unknown territory — producing evidence nodes with preliminary confidence bounds. The Methodologist evaluates validity of each node across four dimensions. The Guardian authenticates every source in real time.",
                agents: [
                  { name: 'Topic Architect', role: 'init', accent: true },
                  { name: 'Cartographer', role: 'landscape map' },
                  { name: 'Methodologist', role: 'confidence bounds' },
                  { name: 'Guardian', role: 'SVS · phase boundary', accent: true },
                  { name: 'Contrarian', role: 'landscape objections' },
                  { name: 'Synthesizer', role: 'draft integration' },
                ],
              },
              {
                num: 'Phase 2 · Deliberation', name: 'Apply adversarial pressure',
                body: "The Contrarian re-engages with a steelmanned version of every claim before challenging it. Each objection must specify a resolution condition and a strength classification — Strong, Moderate, or Speculative. Unresolved Strong objections carry forward to Phase 3 verbatim.",
                agents: [
                  { name: 'Cartographer', role: 'evidence update' },
                  { name: 'Methodologist', role: 'grade challenges' },
                  { name: 'Guardian', role: 'SVS · phase boundary', accent: true },
                  { name: 'Contrarian', role: 'evidence objections' },
                  { name: 'Synthesizer', role: 'revised draft' },
                ],
              },
              {
                num: 'Phase 3 · Synthesis', name: 'Produce the finding',
                body: "The Synthesizer anchors its conclusion exclusively to the structured evidence nodes registry — not the discourse thread. Temperature is locked at 0.0 for deterministic output. The Pragmatist converts the finding into actionable next steps within the Synthesizer's confidence ceiling.",
                agents: [
                  { name: 'Guardian', role: 'final integrity check', accent: true },
                  { name: 'Contrarian', role: 'synthesis objections' },
                  { name: 'Synthesizer', role: 'final finding · T=0.0' },
                  { name: 'Pragmatist', role: 'actionable output' },
                ],
              },
            ].map(({ num, name, body, agents }) => (
              <div key={num} className="bg-[#262321] p-9">
                <div className="font-mono text-[10px] tracking-[0.08em] text-terracotta uppercase mb-[10px]">{num}</div>
                <div className="font-serif text-[20px] font-normal text-white mb-3">{name}</div>
                <p className="text-[13px] text-[#6A645E] leading-[1.7] mb-5">{body}</p>
                <div className="flex flex-col gap-2">
                  {agents.map(a => <PhaseAgentRow key={a.name} {...a} />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AGENTS SUMMARY */}
      <div className="bg-dark border-b-[0.5px] border-[#49443F] py-20">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px]">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">The seven agents</div>
          <h2 className="font-serif text-[28px] lg:text-[44px] font-normal text-white leading-[1.15] mb-4">Each agent has one job.<br />None of them can exceed it.</h2>
          <p className="text-[18px] text-[#6A645E] leading-[1.85] max-w-[640px] mb-12">
            Every agent operates under strict typed output contracts — permitted actions and forbidden actions are architectural constraints, not guidelines. No agent can produce conclusions outside its role.
          </p>

          {/* Guardian full width */}
          <div className="bg-[#262321] border-[0.5px] border-terracotta rounded-lg p-7 mb-3 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="font-mono text-[10px] tracking-[0.06em] text-[#B0ADA5] uppercase mb-1">Independent integrity layer</div>
              <div className="font-serif text-[22px] font-normal text-white mb-3">Guardian</div>
              <div className="font-mono text-[11px] text-[#6A645E] mb-4">Claude Sonnet 4.6 · identity hidden · T = 0.1</div>
              <p className="text-[13px] text-[#6A645E] leading-[1.7]">The Guardian operates exclusively at phase boundaries. It does not produce research findings or participate in deliberation. Its model identity is hidden from all user-facing surfaces — including the other agents — to prevent anchoring effects. It holds halt authority over the entire session.</p>
            </div>
            <div className="flex flex-col gap-2">
              {[
                { ok: true, text: 'Source Verification Service — authenticates every citation across all three phases in real time' },
                { ok: true, text: 'Issues flags with halt authority — can pause or terminate a session based on integrity violations' },
                { ok: true, text: 'Domain-specific integrity modes: academic, legal, clinical, financial, editorial' },
                { ok: false, text: 'Cannot produce research findings, conclusions, or directional recommendations' },
                { ok: false, text: 'Cannot participate in deliberation discourse between agents' },
                { ok: false, text: 'Model identity never surfaced to users or research agents — prevents anchoring' },
              ].map(({ ok, text }) => (
                <div key={text} className="flex gap-2 items-start text-[12px]">
                  <span className={ok ? 'text-terracotta' : 'text-[#49443F]'}>{ ok ? '✓' : '✗' }</span>
                  <span className="text-[#6A645E] leading-[1.5]">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Other agents grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { badge: 'Session orchestration', name: 'Topic Architect', model: 'Claude Sonnet 4.6 · T = 0.2', desc: 'The only agent with a direct user-facing interface. Fires once at session initialization. Manages dispatch sequencing, phase transitions, and final delivery. Explicitly forbidden from editorializing or softening any agent\'s output.', rules: ['Cannot editorialize, soften, or reframe any agent output', 'Does not participate in research discourse'] },
              { badge: 'Landscape mapping', name: 'Cartographer', model: 'Gemini 3.1 Pro · T = 0.8', desc: 'Dispatched first in every phase. Produces a five-component landscape: restated question, scope boundaries, evidence terrain map (settled / contested / unknown), evidence nodes with source and limitations, and a knowledge gap register.', rules: ['Cannot assess evidence validity', 'Cannot produce conclusions of any kind'] },
              { badge: 'Validity assessment', name: 'Methodologist', model: 'GPT-4o · T = 0.5', desc: 'Evaluates each evidence node across four dimensions: internal validity, external validity, construct validity, and methodology-claim match. Issues confidence bounds — Established, Probable, Contested, or Gap — as hard constraints on the Synthesizer.', rules: ['Cannot produce conclusions or directional recommendations', 'Confidence bounds are architectural constraints — not suggestions'] },
              { badge: 'Adversarial pressure', name: 'Contrarian', model: 'Claude Sonnet 4.6 / Opus 4.6 · T = 1.0', desc: 'Runs at maximum temperature to maximize output variation and reduce sycophantic convergence. Must steelman every claim before challenging it. Each objection specifies a resolution condition and a strength grade. Unresolved Strong objections appear verbatim in the final output.', rules: ['Must steelman every claim before challenging it', 'Addresses other agents by @mention — a structured discourse record'] },
              { badge: 'Conclusion + finding', name: 'Synthesizer', model: 'GPT-4o · T = 0.0', desc: 'Temperature is locked at zero — a hard architectural requirement for deterministic finding production. Anchors its conclusion exclusively to the structured evidence nodes registry, not the discourse thread. Subject to three inviolable constraints that cannot be overridden.', rules: ['Conclusion cannot exceed the confidence grade of its supporting evidence', 'Insufficient Evidence findings cannot become directional recommendations', 'Financial advice framing (buy / sell / long / short) is forbidden in all modes'] },
              { badge: 'Application notes', name: 'Pragmatist', model: 'Grok 4.1 Fast · T = 0.3', desc: 'Dispatched last. Converts the Synthesizer\'s finding into concrete next steps. Cannot recommend actions that imply higher confidence than the finding warrants. Operates strictly within the Synthesizer\'s ceiling — it is architecturally forbidden from inflating confidence.', rules: ['Cannot produce findings or revise confidence grades', 'Cannot recommend actions that exceed the finding\'s confidence level'] },
            ].map(({ badge, name, model, desc, rules }) => (
              <div key={name} className="bg-[#262321] border-[0.5px] border-[#49443F] rounded-lg p-6">
                <div className="font-mono text-[10px] tracking-[0.06em] text-[#B0ADA5] uppercase mb-1">{badge}</div>
                <div className="font-serif text-[18px] font-normal text-white mb-2">{name}</div>
                <div className="font-mono text-[10px] text-[#6A645E] mb-3">{model}</div>
                <p className="text-[12px] text-[#6A645E] leading-[1.7] mb-4">{desc}</p>
                <div className="flex flex-col gap-2">
                  {rules.map(r => (
                    <div key={r} className="flex gap-2 items-start text-[11px]">
                      <span className="text-[#49443F]">✗</span>
                      <span className="text-[#6A645E] leading-[1.5]">{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CONFIDENCE GRADES */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">Confidence + finding grades</div>
          <h2 className="font-serif text-[28px] lg:text-[44px] font-normal text-dark leading-[1.15] mb-4">Every finding is graded.<br />Every objection is preserved.</h2>
          <p className="text-[18px] text-body leading-[1.85] max-w-[640px] mb-12">
            Four typed confidence grades — issued by the Methodologist as hard architectural constraints, propagated downstream, and enforced. No agent and no user input can override them.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { grade: 'Established', bg: '#D9F0E4', color: '#2A7050', desc: 'Evidence is consistent, replicated, and methodologically sound. High confidence that the claim accurately represents the state of the field.' },
              { grade: 'Probable', bg: '#D4E4F5', color: '#2A4A7A', desc: 'Evidence is consistent but incomplete — limited replication, moderate effect sizes, or methodological constraints. Directional confidence with noted limitations.' },
              { grade: 'Contested', bg: '#F5E8C8', color: '#8A5A1A', desc: 'Evidence is conflicting, methodologically disputed, or represents live scientific controversy. Strong unresolved Contrarian objections are present.' },
              { grade: 'Gap', bg: '#F5D8D8', color: '#8A1818', desc: 'Insufficient evidence to support a directional finding. The question cannot be answered with the available evidence base. Gap findings cannot be converted to recommendations.' },
            ].map(({ grade, bg, color, desc }) => (
              <div key={grade} className="bg-surface border-[0.5px] border-border rounded-lg p-6">
                <span className="font-mono text-[11px] px-2 py-[3px] rounded-[3px] inline-block mb-4" style={{ background: bg, color }}>{grade}</span>
                <p className="text-[13px] text-body leading-[1.7]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TWO MODES */}
      <div className="bg-surface border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">Session modes</div>
          <h2 className="font-serif text-[28px] lg:text-[44px] font-normal text-dark leading-[1.15] mb-12">Two modes. One engine.</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {[
              { mode: 'Prediction Markets', desc: 'Sessions paired with a live Kalshi or Polymarket contract. Binary resolution at contract close. Brier scores computed against market probability. Corpus tiers: gold (live), silver (resolved 0–60 days), flagged (60+ days). The resolved corpus is what trains future calibration.' },
              { mode: 'Letters & Science', desc: 'No market pairing. No Brier score. No corpus tier. Guardian dimensions adapt: source / retraction / preprint / self-citation. Calibration status shown in panel. Evidence-triggered reopen conditions replace market-event triggers. Used for academic, clinical, and policy research.' },
            ].map(({ mode, desc }) => (
              <div key={mode} className="bg-sand border-[0.5px] border-border rounded-lg p-7">
                <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-3">{mode}</div>
                <p className="text-[15px] text-body leading-[1.75]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* READ MORE LINKS */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">The full technical picture</div>
          <h2 className="font-serif text-[28px] lg:text-[44px] font-normal text-dark leading-[1.15] mb-12">Continue reading.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { href: '/how-it-works/phases', label: 'Phase architecture', desc: 'How each phase is structured, what it constrains, and why the sequence is fixed.' },
              { href: '/how-it-works/agents', label: 'Agents + roles', desc: 'Every agent\'s typed output contract, model assignment, temperature, and forbidden actions.' },
              { href: '/how-it-works/guardian', label: 'Guardian system', desc: 'The SVS, flag taxonomy, domain integrity modes, and halt authority mechanics.' },
              { href: '/how-it-works/scoring', label: 'Confidence + dissent scoring', desc: 'Unidirectional propagation, grade challenge mechanism, and dissent register.' },
            ].map(({ href, label, desc }) => (
              <Link key={href} href={href} className="bg-surface border-[0.5px] border-border rounded-lg p-6 hover:border-terracotta transition-colors no-underline group">
                <div className="text-[15px] font-medium text-dark mb-2 group-hover:text-terracotta transition-colors">{label} →</div>
                <p className="text-[13px] text-body leading-[1.6]">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-terracotta px-4 lg:px-[72px] py-24 text-center">
        <h2 className="font-serif text-[36px] lg:text-[52px] font-normal text-white leading-[1.12] mb-5 tracking-[-0.025em]">
          See the architecture run<br />on a real question.
        </h2>
        <p className="text-[19px] text-white/75 mb-10 leading-[1.7]">
          One free Standard session with every new account. No card required.
        </p>
        <div className="flex items-center justify-center gap-5 flex-wrap">
          <Link href="/waitlist" className="text-[15px] font-medium text-terracotta bg-white px-8 py-[14px] rounded no-underline hover:opacity-90 transition-opacity">
            Join waitlist
          </Link>
          <Link href="/pricing" className="text-[15px] text-white/80 border-[0.5px] border-white/35 px-7 py-[14px] rounded no-underline hover:bg-white/10 transition-colors">
            See pricing
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
