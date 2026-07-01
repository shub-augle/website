import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';

const GRADES = [
  {
    name: 'Established', bg: '#D9F0E4', color: '#2A7050',
    definition: 'Evidence is consistent, replicated across independent studies and distinct methodologies, and methodologically sound. High confidence that the claim accurately represents the current state of the field.',
    consequence: 'Requires a formal [GRADE CHALLENGE] from the Methodologist or Contrarian to downgrade. The Synthesizer may assert this grade with high directional confidence.',
    example: 'The scientific consensus on CO₂ as a primary driver of anthropogenic warming.',
  },
  {
    name: 'Probable', bg: '#D4E4F5', color: '#2A4A7A',
    definition: 'Evidence is consistent but incomplete — limited replication, moderate effect sizes, or methodological constraints that prevent full Established status. Directional confidence with noted limitations.',
    consequence: 'Most common grade. The Synthesizer can make directional assertions. The Pragmatist can produce actionable recommendations within the stated confidence ceiling.',
    example: 'GLP-1 drug efficacy for weight loss — strong but not fully replicated across all relevant populations.',
  },
  {
    name: 'Contested', bg: '#F5E8C8', color: '#8A5A1A',
    definition: 'Evidence is conflicting, methodologically disputed, or represents live scientific controversy. May also indicate an Unresolved Strong Contrarian objection that the Synthesizer could not dismiss.',
    consequence: 'The finding names the dispute and preserves competing positions. No directional recommendation permitted. Unresolved Strong objections appear verbatim in the output.',
    example: 'Whether current AI safety measures are sufficient for near-term AGI development.',
  },
  {
    name: 'Gap', bg: '#F5D8D8', color: '#8A1818',
    definition: 'Insufficient evidence to support any directional finding. The evidence base does not exist, is too thin to evaluate, or the question is not answerable with available data.',
    consequence: 'Gap findings cannot be converted to directional recommendations under any framing. The Pragmatist must surface the gap explicitly and propose follow-on sessions.',
    example: '"What are the long-term cognitive effects of childhood smartphone use?" — the longitudinal evidence does not yet exist.',
  },
];

const OBJECTION_GRADES = [
  { grade: 'Strong', color: '#C15F3C', desc: 'A well-evidenced, steelmanned objection that the ensemble could not resolve. Must surface verbatim in the final output. Triggers a Contested grade on any finding node it addresses.' },
  { grade: 'Moderate', color: '#8A5A1A', desc: 'A legitimate objection that partially undermines the claim but does not fully override it. Logged with resolution status. May influence confidence grade but does not force Contested.' },
  { grade: 'Speculative', color: '#6A645E', desc: 'A plausible but poorly evidenced objection. Logged and acknowledged, but does not affect the confidence grade or force revision.' },
];

const CHECKPOINTS = [
  { label: 'Phase 1 · Methodologist issues bounds', check: 'Confidence bounds established for each evidence node. These become the ceiling constraint for all downstream agents.' },
  { label: 'Phase 1 → 2 boundary · Guardian clearance', check: 'Guardian verifies all Phase 1 sources. Any SVS failure caps the affected node\'s grade to maximum Contested.' },
  { label: 'Phase 2 · Methodologist grade challenge', check: 'If the Synthesizer\'s draft conclusion exceeds the evidentiary warrant, Methodologist issues [GRADE CHALLENGE]. Revision loop required before Phase 3.' },
  { label: 'Phase 2 → 3 boundary · Guardian clearance', check: 'Guardian verifies all Phase 2 sources. Unresolved Strong objections are finalized and locked for verbatim inclusion.' },
  { label: 'Phase 3 · Synthesizer final output', check: 'Synthesizer produces finding at T=0.0. Conclusion confirmed against evidence nodes registry. Grade validated against Methodologist ceiling. Unresolved objections appended verbatim.' },
];

export default function ScoringPage() {
  return (
    <div className="bg-sand min-h-screen">
      <Nav activeRoute="/how-it-works" />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'How it works', href: '/how-it-works' }, { label: 'Confidence + dissent scoring' }]} />

      {/* HERO */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-[96px] grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-5">Confidence + dissent scoring</div>
            <h1 className="font-serif text-[36px] lg:text-[64px] font-normal leading-[1.12] tracking-[-0.025em] text-dark mb-6">
              Not a score.<br />A structured<br /><em className="italic text-terracotta">evidence record.</em>
            </h1>
            <p className="text-[19px] text-body leading-[1.8] mb-4">
              Augle doesn't produce a single confidence number. It produces four typed confidence grades — one per evidence node — issued by the Methodologist as hard constraints, propagated downstream, and enforced architecturally. The Synthesizer cannot exceed them. The Pragmatist inherits them. No agent and no user input can override them.
            </p>
            <p className="text-[19px] text-body leading-[1.8]">
              Every unresolved Contrarian objection is preserved verbatim alongside the finding that triggered it. The complete record — grades, objections, resolution conditions — is what you get at the end of every session.
            </p>
          </div>
          {/* Hero panel */}
          <div className="bg-dark rounded-lg p-7">
            <div className="font-mono text-[10px] tracking-[0.08em] text-terracotta uppercase mb-5">Propagation example · Standard session</div>
            {[
              { agent: 'Methodologist', action: 'Issues bounds', output: 'Node 1: Probable · Node 2: Probable · Node 3: Contested', accent: false },
              { agent: 'Guardian', action: 'SVS verification', output: 'All three nodes: verified. No grade caps applied.', accent: true },
              { agent: 'Contrarian', action: 'Objection register', output: '1 Strong (unresolved) · 2 Moderate (resolved) · 1 Speculative', accent: false },
              { agent: 'Synthesizer', action: 'Grade computation', output: 'Finding: Contested — Strong objection unresolved. Cannot exceed Probable ceiling.', accent: false },
              { agent: 'Pragmatist', action: 'Actionable output', output: 'Inherits Contested ceiling. No directional recommendation. Follow-on session proposed.', accent: false },
            ].map(({ agent, action, output, accent }) => (
              <div key={agent} className="flex gap-3 py-3 border-b-[0.5px] border-[#49443F] last:border-0">
                <div className="flex-shrink-0 w-[90px]">
                  <div className={`font-mono text-[10px] ${accent ? 'text-terracotta' : 'text-[#6A645E]'}`}>{agent}</div>
                  <div className="font-mono text-[9px] text-[#49443F]">{action}</div>
                </div>
                <p className="text-[12px] text-[#B0ADA5] leading-[1.5]">{output}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOUR GRADES */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">The four grades</div>
          <h2 className="font-serif text-[28px] lg:text-[44px] font-normal text-dark leading-[1.15] mb-12">Each grade has a precise<br />definition and a hard consequence.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {GRADES.map(({ name, bg, color, definition, consequence, example }) => (
              <div key={name} className="bg-surface border-[0.5px] border-border rounded-lg p-6">
                <span className="font-mono text-[11px] px-2 py-[3px] rounded-[3px] inline-block mb-4" style={{ background: bg, color }}>{name}</span>
                <p className="text-[14px] text-body leading-[1.7] mb-4">{definition}</p>
                <div className="bg-sand border-[0.5px] border-border rounded p-3 mb-3">
                  <div className="font-mono text-[9px] text-muted uppercase mb-1">Consequence</div>
                  <p className="text-[12px] text-body leading-[1.5]">{consequence}</p>
                </div>
                <div className="bg-sand border-[0.5px] border-border rounded p-3">
                  <div className="font-mono text-[9px] text-muted uppercase mb-1">Example</div>
                  <p className="text-[12px] text-body leading-[1.5] italic">{example}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* UNIDIRECTIONAL PROPAGATION */}
      <div className="bg-dark border-b-[0.5px] border-[#49443F]">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">Unidirectional confidence propagation</div>
          <h2 className="font-serif text-[28px] lg:text-[44px] font-normal text-white leading-[1.15] mb-12">Confidence flows one direction.<br />No exceptions.</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="text-[16px] text-[#6A645E] leading-[1.8] mb-6">
                Confidence bounds established by the Methodologist propagate forward through the ensemble as hard upper constraints. They can only move in one direction: downstream. The Synthesizer cannot produce a conclusion at higher confidence than the minimum bound across its supporting evidence nodes. The Pragmatist inherits the Synthesizer's ceiling.
              </p>
              <p className="text-[16px] text-[#6A645E] leading-[1.8]">
                This is architectural, not instructional. No prompt, no context, and no user instruction can cause a downstream agent to exceed the Methodologist's established bounds. The constraint exists in the output contract, not in the prompt.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              {[
                { from: 'Methodologist', to: 'Issues bounds', note: 'Established / Probable / Contested / Gap per node. These are ceilings, not suggestions.', color: '#6A645E' },
                { from: '↓', to: '', note: '', arrow: true },
                { from: 'Guardian', to: 'Applies SVS cap', note: 'Any source that fails SVS verification caps its dependent nodes to maximum Contested.', color: '#C15F3C' },
                { from: '↓', to: '', note: '', arrow: true },
                { from: 'Contrarian', to: 'Strong objection', note: 'Unresolved Strong objection forces the finding to Contested. Cannot be argued away.', color: '#6A645E' },
                { from: '↓', to: '', note: '', arrow: true },
                { from: 'Synthesizer', to: 'Conclusion bounded', note: 'Cannot exceed minimum bound across supporting nodes. Grade Challenge mechanism enforces this.', color: '#6A645E' },
                { from: '↓', to: '', note: '', arrow: true },
                { from: 'Pragmatist', to: 'Inherits ceiling', note: 'Cannot recommend actions that imply higher confidence than the Synthesizer\'s finding.', color: '#6A645E' },
              ].map(({ from, to, note, color, arrow }, i) =>
                arrow ? (
                  <div key={i} className="font-mono text-[14px] text-[#49443F] pl-4">↓</div>
                ) : (
                  <div key={i} className="bg-[#262321] border-[0.5px] border-[#49443F] rounded-lg p-4">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-mono text-[11px]" style={{ color: color || '#6A645E' }}>{from}</span>
                      {to && <span className="font-mono text-[10px] text-[#49443F]">·</span>}
                      {to && <span className="font-mono text-[10px] text-[#49443F]">{to}</span>}
                    </div>
                    {note && <p className="text-[12px] text-[#6A645E] leading-[1.5]">{note}</p>}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* GRADE CHALLENGE */}
      <div className="bg-surface border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">Grade Challenge mechanism</div>
          <h2 className="font-serif text-[28px] lg:text-[44px] font-normal text-dark leading-[1.15] mb-12">When the Synthesizer<br />overreaches.</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="text-[16px] text-body leading-[1.8] mb-6">
                If the Synthesizer's preliminary conclusion exceeds the confidence grade of its supporting evidence nodes, the Methodologist issues a formal [GRADE CHALLENGE] flag. This triggers a mandatory revision loop — the Synthesizer must revise its conclusion before Phase 3 can proceed.
              </p>
              <p className="text-[16px] text-body leading-[1.8]">
                The [GRADE CHALLENGE] mechanism exists because the Synthesizer runs at T=0.0 but may still attempt to draw conclusions that outrun the evidence. The Methodologist's challenge is the architectural backstop that enforces the Verdict Invariance Requirement: the same evidence base must produce the same grade.
              </p>
            </div>
            <div className="bg-sand border-[0.5px] border-border rounded-lg p-6">
              <div className="font-mono text-[10px] tracking-[0.06em] text-terracotta uppercase mb-4">Example grade challenge</div>
              {[
                { role: 'Synthesizer · draft', text: '"The evidence strongly supports adoption of this methodology as best practice across clinical contexts."', grade: 'Attempting: Established' },
                { role: 'Methodologist · challenge', text: '[GRADE CHALLENGE] — Node 3 (external validity) rated Probable due to limited population diversity in cited trials. Synthesizer conclusion cannot assert Established when external validity constraint is Probable. Revision required.', grade: null, flag: true },
                { role: 'Synthesizer · revised', text: '"The evidence probably supports adoption of this methodology in populations consistent with the cited trial demographics. Generalizability to broader clinical contexts requires further study."', grade: 'Revised to: Probable' },
              ].map(({ role, text, grade, flag }) => (
                <div key={role} className={`mb-4 last:mb-0 p-4 rounded-lg border-[0.5px] ${flag ? 'bg-[#FBF5F2] border-terracotta' : 'bg-surface border-border'}`}>
                  <div className="flex items-baseline justify-between mb-2">
                    <span className={`font-mono text-[10px] ${flag ? 'text-terracotta' : 'text-muted'} uppercase`}>{role}</span>
                    {grade && <span className={`font-mono text-[10px] ${grade.includes('Established') ? 'text-[#8A1818]' : 'text-[#2A4A7A]'}`}>{grade}</span>}
                  </div>
                  <p className="text-[13px] text-body leading-[1.5] italic">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* DISSENT SCORING */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">Dissent scoring</div>
          <h2 className="font-serif text-[28px] lg:text-[44px] font-normal text-dark leading-[1.15] mb-12">Every objection classified.<br />Every unresolved objection preserved.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-12">
            {OBJECTION_GRADES.map(({ grade, color, desc }) => (
              <div key={grade} className="bg-surface border-[0.5px] border-border rounded-lg p-6">
                <div className="font-mono text-[12px] font-medium mb-3" style={{ color }}>{grade}</div>
                <p className="text-[13px] text-body leading-[1.7]">{desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-dark rounded-lg p-7">
            <div className="font-mono text-[10px] tracking-[0.08em] text-terracotta uppercase mb-4">Example dissent register · final output</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { status: 'Unresolved · Strong', agent: 'Contrarian', text: 'The external validity of the core RCT is limited to populations with BMI > 35. The finding as stated claims broader generalizability. Resolution condition: show a trial population with BMI 25–35 with consistent effect sizes.', color: '#C15F3C', bg: '#3D1A10' },
                { status: 'Resolved · Moderate', agent: 'Contrarian', text: 'Initial concern about confounding via concurrent medication. Addressed by Synthesizer: the study protocol included washout periods. Resolved — does not affect grade.', color: '#B0ADA5', bg: '#262321' },
              ].map(({ status, agent, text, color, bg }) => (
                <div key={status} className="rounded-lg p-4 border-[0.5px] border-[#49443F]" style={{ background: bg }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-[10px]" style={{ color }}>{status}</span>
                    <span className="font-mono text-[9px] text-[#6A645E]">· {agent}</span>
                  </div>
                  <p className="text-[12px] text-[#B0ADA5] leading-[1.5] italic">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* VALIDATION CHECKPOINTS */}
      <div className="bg-surface border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">Live validation run</div>
          <h2 className="font-serif text-[28px] lg:text-[44px] font-normal text-dark leading-[1.15] mb-12">Confidence propagation confirmed<br />across all five checkpoints.</h2>
          <div className="flex flex-col">
            {CHECKPOINTS.map(({ label, check }, i) => (
              <div key={label} className="grid grid-cols-[40px_1fr] gap-4 py-4 border-b-[0.5px] border-border last:border-0">
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full bg-terracotta flex items-center justify-center flex-shrink-0">
                    <span className="font-mono text-[11px] text-white">{i + 1}</span>
                  </div>
                  {i < CHECKPOINTS.length - 1 && <div className="flex-1 w-[1px] bg-border mt-2" />}
                </div>
                <div className="pb-4">
                  <div className="font-mono text-[11px] text-terracotta mb-1">{label}</div>
                  <p className="text-[14px] text-body leading-[1.6]">{check}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-terracotta px-4 lg:px-[72px] py-24 text-center">
        <h2 className="font-serif text-[36px] lg:text-[52px] font-normal text-white leading-[1.12] mb-5 tracking-[-0.025em]">
          Calibrated confidence.<br />Preserved dissent.
        </h2>
        <p className="text-[19px] text-white/75 mb-10 leading-[1.7]">Run a real question and see every grade, every objection, and every constraint in the output.</p>
        <div className="flex items-center justify-center gap-5 flex-wrap">
          <Link href="/waitlist" className="text-[15px] font-medium text-terracotta bg-white px-8 py-[14px] rounded no-underline hover:opacity-90 transition-opacity">Join waitlist</Link>
          <Link href="/how-it-works" className="text-[15px] text-white/80 border-[0.5px] border-white/35 px-7 py-[14px] rounded no-underline hover:bg-white/10 transition-colors">Back to overview</Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
