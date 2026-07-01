import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';

const PHASES = [
  {
    num: 'Phase 1', name: 'Exploration', label: 'Map the terrain',
    bg: 'bg-[#262321]',
    body: "The Cartographer decomposes the question into settled ground, contested terrain, and unknown territory. The Methodologist assigns formal confidence bounds to every evidence node across four validity dimensions. The Guardian authenticates every source in real time via SVS before it enters the registry.",
    inputs: ['Research question + depth tier', 'Session mode (Prediction Markets / Letters & Science)', 'Guardian integrity mode setting'],
    outputs: ['Evidence terrain map — Settled / Contested / Unknown', 'Evidence nodes registry with confidence bounds', 'Knowledge gap register', 'Phase 1 Guardian clearance'],
    agents: ['Topic Architect (init)', 'Cartographer', 'Methodologist', 'Guardian (SVS + phase boundary)', 'Contrarian (landscape objections)', 'Synthesizer (draft integration)'],
  },
  {
    num: 'Phase 2', name: 'Deliberation', label: 'Apply adversarial pressure',
    bg: 'bg-dark',
    body: "The Contrarian re-engages with a steelmanned version of every claim before challenging it. Each objection must specify a resolution condition and a strength classification — Strong, Moderate, or Speculative. Unresolved Strong objections carry forward to Phase 3 verbatim. The Methodologist challenges any agent output that overreaches its evidentiary warrant.",
    inputs: ['Phase 1 output: evidence nodes registry + terrain map', 'Phase 1 confidence bounds (enforced as constraints)', 'Phase 1 Guardian clearance'],
    outputs: ['Updated evidence nodes registry', 'Classified objection register: resolved / unresolved', 'Grade Challenge log (if triggered)', 'Phase 2 Guardian clearance'],
    agents: ['Cartographer (evidence update)', 'Methodologist (grade challenges)', 'Guardian (SVS + phase boundary)', 'Contrarian (evidence objections)', 'Synthesizer (revised draft)'],
  },
  {
    num: 'Phase 3', name: 'Synthesis', label: 'Produce the finding',
    bg: 'bg-[#262321]',
    body: "The Synthesizer anchors its conclusion exclusively to the structured evidence nodes registry — not the discourse thread. Temperature is locked at 0.0 for deterministic output. The Pragmatist converts the finding into actionable next steps within the Synthesizer's confidence ceiling. All unresolved Strong Contrarian objections appear verbatim in the final output.",
    inputs: ['Phase 2 output: updated evidence nodes', 'Unresolved Contrarian objections (Strong only — verbatim)', 'Phase 2 confidence ceiling (Methodologist bounds)', 'Phase 2 Guardian clearance'],
    outputs: ['Calibrated finding with confidence grade', 'Unresolved objections — verbatim, not summarized', 'Reopen conditions', 'Actionable next steps (Pragmatist)', 'Full session audit trail'],
    agents: ['Guardian (final integrity check)', 'Contrarian (synthesis objections)', 'Synthesizer (final finding · T=0.0)', 'Pragmatist (actionable output)'],
  },
];

const DEPTH_TIERS = [
  { name: 'Rapid', phases: 1, guardian: false, contrarian: false, desc: 'Single round. Cartographer + Synthesizer only. No Guardian. No adversarial pressure. Fast orientation — not for high-stakes decisions.' },
  { name: 'Standard', phases: 3, guardian: true, contrarian: true, desc: 'Full three-phase deliberation. Guardian active. Contrarian on Sonnet tier. The right choice for most substantive research questions.' },
  { name: 'Deep', phases: 3, guardian: true, contrarian: true, deep: true, desc: 'Full three-phase deliberation. Guardian active. Contrarian on Opus tier. Async domain expert interjection at the P1/P2 boundary.' },
];

export default function PhasesPage() {
  return (
    <div className="bg-sand min-h-screen">
      <Nav activeRoute="/how-it-works" />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'How it works', href: '/how-it-works' }, { label: 'Phase architecture' }]} />

      {/* HERO */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-[96px]">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-5">Phase architecture</div>
          <h1 className="font-serif text-[36px] lg:text-[64px] font-normal leading-[1.12] tracking-[-0.025em] text-dark mb-6 max-w-[820px]">
            Three phases.<br />Each one constrains<br />the <em className="italic text-terracotta">next.</em>
          </h1>
          <p className="text-[19px] text-body leading-[1.8] max-w-[640px]">
            Augle's three deliberation phases — Exploration, Deliberation, and Synthesis — don't run in parallel. Each phase produces a structured output that the next phase is required to respect. The Methodologist's confidence bounds from Phase 1 become hard limits on the Synthesizer in Phase 3. The Contrarian's unresolved objections from Phase 2 surface verbatim in the final finding. Nothing is softened in transit.
          </p>
        </div>
      </div>

      {/* PHASE DETAIL */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">Phase specifications</div>
          <h2 className="font-serif text-[28px] lg:text-[44px] font-normal text-dark leading-[1.15] mb-16">Each phase constrains the next.</h2>
          <div className="flex flex-col gap-3">
            {PHASES.map(({ num, name, label, bg, body, inputs, outputs, agents }) => (
              <div key={num} className={`${bg} border-[0.5px] border-[#49443F] rounded-lg overflow-hidden`}>
                <div className="px-7 py-5 border-b-[0.5px] border-[#49443F] flex flex-col md:flex-row md:items-center gap-2">
                  <span className="font-mono text-[10px] tracking-[0.08em] text-terracotta uppercase">{num}</span>
                  <span className="font-serif text-[24px] font-normal text-white mx-0 md:mx-4">{name}</span>
                  <span className="text-[14px] text-[#6A645E]">{label}</span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr] divide-y-[0.5px] lg:divide-y-0 lg:divide-x-[0.5px] divide-[#49443F]">
                  <div className="p-7">
                    <div className="font-mono text-[10px] tracking-[0.06em] text-[#6A645E] uppercase mb-3">Description</div>
                    <p className="text-[13px] text-[#B0ADA5] leading-[1.7] mb-5">{body}</p>
                    <div className="font-mono text-[10px] tracking-[0.06em] text-[#6A645E] uppercase mb-2">Agents active</div>
                    <div className="flex flex-col gap-1">
                      {agents.map(a => (
                        <div key={a} className={`text-[12px] leading-[1.5] ${a.includes('Guardian') ? 'text-terracotta' : 'text-[#6A645E]'}`}>· {a}</div>
                      ))}
                    </div>
                  </div>
                  <div className="p-7">
                    <div className="font-mono text-[10px] tracking-[0.06em] text-[#6A645E] uppercase mb-3">Inputs required</div>
                    <div className="flex flex-col gap-2">
                      {inputs.map(inp => (
                        <div key={inp} className="flex gap-2 items-start">
                          <span className="text-[#49443F] text-[12px] flex-shrink-0">→</span>
                          <span className="text-[12px] text-[#6A645E] leading-[1.5]">{inp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-7">
                    <div className="font-mono text-[10px] tracking-[0.06em] text-[#6A645E] uppercase mb-3">Outputs produced</div>
                    <div className="flex flex-col gap-2">
                      {outputs.map(out => (
                        <div key={out} className="flex gap-2 items-start">
                          <span className="text-terracotta text-[12px] flex-shrink-0">✓</span>
                          <span className="text-[12px] text-[#6A645E] leading-[1.5]">{out}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DEPTH TIERS */}
      <div className="bg-surface border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">Session depth tiers</div>
          <h2 className="font-serif text-[28px] lg:text-[44px] font-normal text-dark leading-[1.15] mb-12">Three depths.<br />One architecture.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {DEPTH_TIERS.map(({ name, phases, guardian, contrarian, deep, desc }) => (
              <div key={name} className="bg-sand border-[0.5px] border-border rounded-lg p-6">
                <div className="font-mono text-[11px] text-terracotta uppercase mb-2">{name}</div>
                <div className="flex flex-col gap-2 mb-4">
                  {[
                    { label: 'Phases', val: phases.toString() },
                    { label: 'Guardian', val: guardian ? 'Active' : 'Not active', accent: guardian },
                    { label: 'Contrarian', val: contrarian ? (deep ? 'Opus tier' : 'Sonnet tier') : 'Not active', accent: contrarian },
                  ].map(({ label, val, accent }) => (
                    <div key={label} className="flex items-center justify-between border-b-[0.5px] border-border pb-2 last:border-0">
                      <span className="font-mono text-[10px] text-muted uppercase">{label}</span>
                      <span className={`font-mono text-[11px] ${accent ? 'text-terracotta' : 'text-body'}`}>{val}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[13px] text-body leading-[1.6]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* EXAMPLE IN PRACTICE */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">Session in practice</div>
          <h2 className="font-serif text-[28px] lg:text-[44px] font-normal text-dark leading-[1.15] mb-12">What the architecture looks like in practice.</h2>
          <div className="bg-dark rounded-lg p-7">
            <div className="font-mono text-[10px] tracking-[0.06em] text-terracotta uppercase mb-3">Example question · Standard depth</div>
            <p className="font-serif text-[18px] text-white italic mb-8 leading-[1.5]">
              "Does the proposed infrastructure bill's cost-benefit methodology adequately account for climate-adjusted risk over a 30-year horizon?"
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[#49443F] rounded overflow-hidden">
              {[
                { phase: 'Phase 1 · Exploration', output: 'Settled: CBA frameworks exist and are applied. Contested: whether the discount rate is appropriate for long-horizon climate risk. Unknown: the quantified exposure under three warming scenarios.' },
                { phase: 'Phase 2 · Deliberation', output: 'Strong Contrarian objection: the discount rate used (3.5%) is contested in the literature for climate-adjusted projections beyond 15 years. Resolution condition: show the sensitivity analysis.' },
                { phase: 'Phase 3 · Synthesis', output: 'Finding: Probably adequate for near-term projections; materially inadequate for 20+ year claims. Confidence grade: Contested. One unresolved Strong objection preserved verbatim.' },
              ].map(({ phase, output }) => (
                <div key={phase} className="bg-[#262321] p-6">
                  <div className="font-mono text-[10px] tracking-[0.06em] text-terracotta uppercase mb-2">{phase}</div>
                  <p className="text-[12px] text-[#6A645E] leading-[1.6]">{output}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CONTINUE READING */}
      <div className="bg-surface border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">How it works</div>
          <h2 className="font-serif text-[28px] lg:text-[44px] font-normal text-dark leading-[1.15] mb-12">Continue reading.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { href: '/how-it-works/agents', label: 'Agents + roles', desc: "Every agent's typed output contract, model assignment, temperature, and forbidden actions." },
              { href: '/how-it-works/guardian', label: 'Guardian system', desc: 'The SVS, flag taxonomy, domain integrity modes, and halt authority mechanics.' },
              { href: '/how-it-works/scoring', label: 'Confidence + dissent scoring', desc: 'Unidirectional propagation, grade challenge mechanism, and dissent register.' },
            ].map(({ href, label, desc }) => (
              <Link key={href} href={href} className="bg-sand border-[0.5px] border-border rounded-lg p-6 hover:border-terracotta transition-colors no-underline group">
                <div className="text-[15px] font-medium text-dark mb-2 group-hover:text-terracotta transition-colors">{label} →</div>
                <p className="text-[13px] text-body leading-[1.6]">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-terracotta px-4 lg:px-[72px] py-24 text-center">
        <h2 className="font-serif text-[36px] lg:text-[52px] font-normal text-white leading-[1.1] mb-5 tracking-[-0.02em]">
          Three phases.<br />One calibrated finding.
        </h2>
        <p className="text-[19px] text-white/75 mb-10 leading-[1.7]">Run a real question through all three phases. One free Standard session with every new account.</p>
        <div className="flex items-center justify-center gap-5 flex-wrap">
          <Link href="/waitlist" className="text-[15px] font-medium text-terracotta bg-white px-8 py-[14px] rounded no-underline hover:opacity-90 transition-opacity">Join waitlist</Link>
          <Link href="/pricing" className="text-[15px] text-white/80 border-[0.5px] border-white/35 px-7 py-[14px] rounded no-underline hover:bg-white/10 transition-colors">See pricing</Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
