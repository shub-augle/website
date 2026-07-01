import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';

const FLAGS = [
  {
    severity: 'Critical', consequence: 'Hard Block', color: '#C15F3C', bg: '#3D1A10',
    triggers: ['Source does not exist at the cited URL or DOI', 'Content match verification fails — cited claims not present in source', 'Paper has been formally retracted', 'Manipulation attempt detected in user-submitted context'],
    result: 'Session permanently halted. Full credit refund issued. Flag record provided with reason.',
  },
  {
    severity: 'Moderate', consequence: 'Soft Block', color: '#8A5A1A', bg: '#2C2820',
    triggers: ['Unverified preprint with high uncertainty — no peer review', 'Source confidence below tier threshold', 'Self-citation density exceeds Guardian threshold', 'Temporal validity concern — evidence may be superseded'],
    result: 'Session paused. Guardian flag surfaced to user. Acknowledgment required before proceeding. Confidence grade capped on affected nodes.',
  },
  {
    severity: 'Informational', consequence: 'Silent Log', color: '#B0ADA5', bg: '#262321',
    triggers: ['Source retrieved and matched — logged for audit trail', 'Source is a conference proceedings paper — noted in audit record', 'Gray literature source — logged with tier designation'],
    result: 'Session continues uninterrupted. Flag logged to audit trail only. No user-visible interruption.',
  },
];

const INTEGRITY_MODES = [
  { name: 'Academic', triggers: ['Retraction', 'Peer review status', 'Preprint flags', 'Self-citation density', 'Cross-lab replication'] },
  { name: 'Legal', triggers: ['Jurisdiction applicability', 'Precedent currency', 'Citation to overruled cases', 'Pending appeal status'] },
  { name: 'Clinical', triggers: ['Trial phase', 'Population generalizability', 'Off-label use claims', 'Regulatory status', 'Contraindication flags'] },
  { name: 'Financial', triggers: ['Insider information concerns', 'Investment advice prohibition', 'Regulatory context', 'Jurisdiction-specific rules'] },
  { name: 'Editorial', triggers: ['Source credibility tier', 'Pending correction', 'Editorial retraction', 'Opinion vs reporting distinction'] },
  { name: 'Markets', triggers: ['Contract live status at session time', 'Corpus tier assignment', 'Resolution source verification', 'Insider information signals'] },
];

const SVS_ITEMS = [
  { dot: '#3AAA72', text: 'Pashler et al. (2008) — Reproducibility and Research Practices', badge: 'Verified', bg: '#1A3D2A', color: '#3AAA72' },
  { dot: '#3AAA72', text: 'Open Science Collaboration (2015) — Science, Vol. 349', badge: 'Verified', bg: '#1A3D2A', color: '#3AAA72' },
  { dot: '#C15F3C', text: 'Martinez et al. (2024) — arXiv preprint, not peer-reviewed', badge: 'Flagged · Soft Block', bg: '#3D1A10', color: '#C15F3C' },
  { dot: '#3AAA72', text: 'Simmons et al. (2011) — False-Positive Psychology, Psych Science', badge: 'Verified', bg: '#1A3D2A', color: '#3AAA72' },
  { dot: '#8A7D72', text: 'Chen & Liu (2023) — Conference proceedings, pending review', badge: 'Unverified', bg: '#2C2926', color: '#8A7D72' },
  { dot: '#3AAA72', text: 'Ioannidis (2005) — Why Most Published Research Findings Are False', badge: 'Verified', bg: '#1A3D2A', color: '#3AAA72' },
];

export default function GuardianPage() {
  return (
    <div className="bg-sand min-h-screen">
      <Nav activeRoute="/how-it-works" />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'How it works', href: '/how-it-works' }, { label: 'Guardian system' }]} />

      {/* HERO */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-[96px] grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-5">Guardian integrity system</div>
            <h1 className="font-serif text-[36px] lg:text-[64px] font-normal leading-[1.12] tracking-[-0.025em] text-dark mb-6">
              The only agent<br />that can stop<br /><em className="italic text-terracotta">everything.</em>
            </h1>
            <p className="text-[19px] text-body leading-[1.8] mb-4">
              The Guardian is not a research agent. It doesn't produce findings, participate in deliberation, or recommend conclusions. It operates exclusively at phase boundaries — authenticating sources, classifying integrity events, and holding permanent halt authority over every session it monitors.
            </p>
            <p className="text-[19px] text-body leading-[1.8]">
              Its model identity is hidden from all user-facing surfaces, including the other agents. This is not a privacy feature. It is an architectural decision to prevent anchoring effects — the well-documented tendency of agents and users to anchor reasoning toward known model capabilities.
            </p>
          </div>
          {/* Hero facts */}
          <div className="bg-surface border-[0.5px] border-border rounded-lg overflow-hidden">
            {[
              { label: 'Role', val: 'Independent integrity layer — not a research agent' },
              { label: 'Model', val: 'Claude Sonnet 4.6 · identity hidden' },
              { label: 'Temperature', val: 'T = 0.1 · near-deterministic flag classification' },
              { label: 'Runs at', val: 'All phase boundaries across all three phases' },
              { label: 'Halt authority', val: 'Full — no other agent can override' },
              { label: 'Output', val: 'Flags only — no research findings, ever' },
              { label: 'Identity', val: 'Hidden from agents and users — prevents anchoring' },
            ].map(({ label, val }) => (
              <div key={label} className="flex items-baseline justify-between px-5 py-3 border-b-[0.5px] border-border last:border-0">
                <span className="font-mono text-[11px] text-muted min-w-[100px]">{label}</span>
                <span className="text-[13px] text-dark text-right max-w-[240px] leading-[1.5]">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* OUTSIDE THE LOOP */}
      <div className="bg-surface border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">Architectural isolation</div>
          <h2 className="font-serif text-[28px] lg:text-[44px] font-normal text-dark leading-[1.15] mb-12">Outside the loop.<br />By design.</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="text-[16px] text-body leading-[1.8] mb-6">
                The Guardian doesn't run inside the deliberation loop. It evaluates integrity at the boundary between phases — after each phase completes and before the next begins. This is structural: an agent that participates in deliberation cannot also serve as an objective integrity evaluator of that same deliberation.
              </p>
              <p className="text-[16px] text-body leading-[1.8]">
                When the Guardian issues a Critical flag, no other agent — and no user instruction — can override it. The session halts. This halt authority is unconditional. It exists because the alternative (a Guardian that can be argued out of its flags) is not a Guardian at all.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {[
                { label: 'What the Guardian evaluates', items: ['Every source submitted to the evidence nodes registry', 'User-contributed context before it enters deliberation', 'Confidence grade assignments against SVS verification status', 'Domain-specific integrity conditions for the active mode'] },
                { label: 'What the Guardian never does', items: ['Produce research findings or conclusions', 'Participate in discourse between research agents', 'Allow its model identity to be surfaced to users or agents', 'Accept override instructions from any other agent or user input'] },
              ].map(({ label, items }) => (
                <div key={label} className="bg-sand border-[0.5px] border-border rounded-lg p-5">
                  <div className="font-mono text-[10px] tracking-[0.06em] text-terracotta uppercase mb-3">{label}</div>
                  <div className="flex flex-col gap-2">
                    {items.map(item => (
                      <div key={item} className="flex gap-2 items-start text-[13px]">
                        <span className="text-terracotta flex-shrink-0">·</span>
                        <span className="text-body leading-[1.5]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FLAG TAXONOMY */}
      <div className="bg-dark border-b-[0.5px] border-[#49443F]">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">Flag taxonomy</div>
          <h2 className="font-serif text-[28px] lg:text-[44px] font-normal text-white leading-[1.15] mb-12">
            Three severity levels.<br />Each with a defined consequence.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {FLAGS.map(({ severity, consequence, color, bg, triggers, result }) => (
              <div key={severity} className="border-[0.5px] rounded-lg overflow-hidden" style={{ borderColor: color }}>
                <div className="px-6 py-4 flex items-center justify-between border-b-[0.5px]" style={{ background: bg, borderColor: color }}>
                  <span className="font-mono text-[11px] uppercase font-medium" style={{ color }}>{severity}</span>
                  <span className="font-mono text-[10px] text-[#6A645E]">{consequence}</span>
                </div>
                <div className="p-6 bg-[#262321]">
                  <div className="font-mono text-[10px] tracking-[0.06em] text-[#6A645E] uppercase mb-3">Trigger conditions</div>
                  <div className="flex flex-col gap-2 mb-5">
                    {triggers.map(t => (
                      <div key={t} className="flex gap-2 items-start text-[12px]">
                        <span style={{ color }}>·</span>
                        <span className="text-[#6A645E] leading-[1.5]">{t}</span>
                      </div>
                    ))}
                  </div>
                  <div className="font-mono text-[10px] tracking-[0.06em] text-[#6A645E] uppercase mb-2">Consequence</div>
                  <p className="text-[12px] leading-[1.6]" style={{ color }}>{result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SVS */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">Source Verification Service</div>
          <h2 className="font-serif text-[28px] lg:text-[44px] font-normal text-dark leading-[1.15] mb-12">
            Citations authenticated<br />before they influence anything.
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="text-[16px] text-body leading-[1.8] mb-5">
                Every evidence node submitted to the registry is authenticated before it influences deliberation. The SVS runs three checks: existence verification (the source must exist at the cited URL or DOI), content match verification (the claimed content must be present in the actual source), and confidence tier assignment based on publication status.
              </p>
              <p className="text-[16px] text-body leading-[1.8]">
                Sources that fail SVS verification don't just get flagged — the confidence grade of any evidence node that depends on them is capped. A finding that rests on unverified sources cannot achieve a grade higher than Contested, regardless of how strong the rest of the evidence is.
              </p>
            </div>
            <div className="bg-dark rounded-lg p-7">
              <div className="font-mono text-[10px] tracking-[0.08em] text-terracotta uppercase mb-[18px]">SVS · live session</div>
              {SVS_ITEMS.map(({ dot, text, badge, bg, color }) => (
                <div key={text} className="flex items-center gap-3 py-3 border-b-[0.5px] border-[#49443F] last:border-0">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: dot }} />
                  <span className="text-[12px] text-[#D4CFC6] flex-1 leading-[1.5]">{text}</span>
                  <span className="font-mono text-[9px] px-2 py-[2px] rounded-[3px] whitespace-nowrap flex-shrink-0" style={{ background: bg, color }}>{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* DOMAIN INTEGRITY MODES */}
      <div className="bg-surface border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">Domain integrity modes</div>
          <h2 className="font-serif text-[28px] lg:text-[44px] font-normal text-dark leading-[1.15] mb-4">The Guardian adapts<br />to your domain.</h2>
          <p className="text-[18px] text-body leading-[1.85] max-w-[640px] mb-12">
            Six domain-specific integrity modes configure the Guardian's evaluation criteria for the session. The mode is set at initialization and cannot be changed mid-session.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {INTEGRITY_MODES.map(({ name, triggers }) => (
              <div key={name} className="bg-sand border-[0.5px] border-border rounded-lg p-5">
                <div className="font-mono text-[11px] text-terracotta uppercase mb-3">{name}</div>
                <div className="flex flex-col gap-1">
                  {triggers.map(t => (
                    <div key={t} className="flex gap-2 items-start text-[12px]">
                      <span className="text-terracotta flex-shrink-0">·</span>
                      <span className="text-body leading-[1.5]">{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AUDIT TRAIL */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20">
          <h2 className="font-serif text-[28px] lg:text-[44px] font-normal text-dark leading-[1.15] mb-12">Every decision.<br />Every flag.<br />Fully exportable.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { label: 'SVS verification log', desc: 'Every source check — existence, content match, tier assignment — logged with timestamp and outcome.' },
              { label: 'Flag record', desc: 'Every flag issued: severity, trigger condition, evidence node affected, confidence grade impact.' },
              { label: 'Phase boundary clearances', desc: 'Each phase transition: Guardian status, flag count by severity, clearance timestamp.' },
              { label: 'Confidence grade impact log', desc: 'Every instance where SVS verification or a Guardian flag capped a confidence grade, with the node affected.' },
            ].map(({ label, desc }) => (
              <div key={label} className="bg-surface border-[0.5px] border-border rounded-lg p-6">
                <div className="font-mono text-[10px] tracking-[0.06em] text-terracotta uppercase mb-2">{label}</div>
                <p className="text-[14px] text-body leading-[1.6]">{desc}</p>
              </div>
            ))}
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
              { href: '/how-it-works/phases', label: 'Phase architecture', desc: 'How each phase is structured, what it constrains, and why the sequence is fixed.' },
              { href: '/how-it-works/agents', label: 'Agents + roles', desc: "Every agent's typed output contract, model assignment, and forbidden actions." },
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
          See the Guardian<br />in action.
        </h2>
        <p className="text-[19px] text-white/75 mb-10 leading-[1.7]">
          Run a real question and see SVS authenticate every source in real time. One free Standard session with every new account.
        </p>
        <div className="flex items-center justify-center gap-5 flex-wrap">
          <Link href="/waitlist" className="text-[15px] font-medium text-terracotta bg-white px-8 py-[14px] rounded no-underline hover:opacity-90 transition-opacity">Join waitlist</Link>
          <Link href="/how-it-works" className="text-[15px] text-white/80 border-[0.5px] border-white/35 px-7 py-[14px] rounded no-underline hover:bg-white/10 transition-colors">Back to overview</Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
