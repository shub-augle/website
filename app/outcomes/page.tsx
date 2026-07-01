import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';

/* ─── Types ─── */
type Grade = 'Established' | 'Probable' | 'Contested' | 'Gap';
type Tier = 'Gold' | 'Silver' | 'LS';

interface SessionCard {
  domain: string;
  depth: string;
  q: string;
  grade: Grade;
  augleBrier: number | null;
  mktBrier: number | null;
  tier: Tier;
  dissent: number;
  href: string;
}

/* ─── Data ─── */
const SESSION_CARDS: SessionCard[] = [
  { domain: 'Economics', depth: 'Standard · Polymarket', q: '"Will the Fed cut rates at least twice in 2026?"', grade: 'Probable', augleBrier: 0.049, mktBrier: 0.091, tier: 'Gold', dissent: 1, href: '/outcomes/fed-rate-cuts-2026' },
  { domain: 'Economics', depth: 'Standard · Kalshi', q: '"Will US inflation fall below 2.5% before year-end 2026?"', grade: 'Probable', augleBrier: 0.071, mktBrier: 0.098, tier: 'Gold', dissent: 0, href: '/outcomes/us-inflation-2025' },
  { domain: 'Technology', depth: 'Deep · Polymarket', q: '"Will AGI be declared achieved by any major lab before 2028?"', grade: 'Contested', augleBrier: 0.112, mktBrier: 0.143, tier: 'Gold', dissent: 3, href: '/outcomes/agi-major-lab-2028' },
  { domain: 'Policy', depth: 'Standard · Kalshi', q: '"Will the EU carbon border adjustment mechanism survive legal challenge before 2027?"', grade: 'Probable', augleBrier: 0.063, mktBrier: 0.102, tier: 'Gold', dissent: 0, href: '/outcomes/carbon-border-adjustment' },
  { domain: 'Policy', depth: 'Standard · Polymarket', q: '"Will the US pass federal AI regulation before the end of 2026?"', grade: 'Contested', augleBrier: 0.138, mktBrier: 0.161, tier: 'Gold', dissent: 2, href: '/outcomes/ai-regulation-us-2026' },
  { domain: 'Geopolitics', depth: 'Deep · Polymarket', q: '"Will a significant military incident occur in the Taiwan Strait in 2026?"', grade: 'Probable', augleBrier: 0.082, mktBrier: 0.119, tier: 'Gold', dissent: 2, href: '/outcomes/china-taiwan-2026' },
  { domain: 'Life sciences', depth: 'Standard · Letters & Science', q: '"Does the current GLP-1 evidence base support long-term weight maintenance without continued dosing?"', grade: 'Contested', augleBrier: null, mktBrier: null, tier: 'LS', dissent: 4, href: '/outcomes/glp1-obesity-evidence' },
  { domain: 'Finance', depth: 'Standard · Polymarket', q: '"Is the current AI infrastructure buildout likely to produce a capital allocation correction within 18 months?"', grade: 'Contested', augleBrier: 0.149, mktBrier: 0.178, tier: 'Gold', dissent: 3, href: '/outcomes/ai-infra-correction' },
];

const BRIER_DOMAIN_DATA = [
  { domain: 'Economics', augle: 56, mkt: 75, augleVal: '0.112', mktVal: '0.151' },
  { domain: 'Policy', augle: 47, mkt: 65, augleVal: '0.094', mktVal: '0.131' },
  { domain: 'Geopolitics', augle: 51, mkt: 71, augleVal: '0.102', mktVal: '0.142' },
  { domain: 'Technology', augle: 62, mkt: 82, augleVal: '0.124', mktVal: '0.165' },
  { domain: 'Finance', augle: 44, mkt: 59, augleVal: '0.089', mktVal: '0.119' },
];

const HOW_STEPS = [
  { n: 1, title: 'Session runs against a live contract', body: 'A Markets-mode session pairs with a Kalshi or Polymarket contract that is unresolved at session time. The contract ID is locked to the session record before deliberation begins — the outcome cannot influence the reasoning.' },
  { n: 2, title: 'The full deliberation is logged with provenance', body: 'Every agent output, every evidence node, every Contrarian objection, and every Guardian flag is written to the session transcript with a timestamp and agent attribution. The record is immutable after session close.' },
  { n: 3, title: 'The contract resolves — outcome is mapped', body: 'When the prediction market contract resolves, the binary outcome (YES or NO) is written to the calibration record. Brier score is computed from the ensemble\'s confidence grade at session close versus the resolution value.' },
  { n: 4, title: 'Corpus quality tier is assigned at session time', body: 'Gold tier: contract was unresolved when the session ran — no hindsight contamination possible. Silver tier: resolved within 60 days prior. Flagged: resolved more than 60 days before the session — excluded from headline statistics.' },
  { n: 5, title: 'The full record is published', body: 'Resolved sessions are published in full — question, finding, confidence grade, agent outputs, Contrarian objections, Guardian flags, Brier score, and resolution outcome. Every claim in the calibration record is auditable against the source transcript.' },
  { n: 6, title: 'The corpus accumulates as a structured asset', body: 'Every resolved session is a calibration record: structured multi-agent reasoning mapped to a verified binary ground-truth outcome. The corpus cannot be replicated retroactively. It exists only because the sessions ran.' },
];

const CORPUS_MILESTONES = [
  { label: 'Sessions at beta launch', val: 'First real sessions', accent: true },
  { label: 'Day 90 — public accuracy dashboard', val: 'Calibration signal visible', accent: false },
  { label: 'Day 180 — 2,000–5,000 sessions', val: 'Statistically robust', accent: false },
  { label: 'Day 365 — 10,000+ sessions', val: 'Commercial licensing asset', accent: false },
  { label: 'Year 3 — 1.5M+ sessions', val: 'Largest structured AI deliberation dataset', accent: true },
];

/* ─── Helpers ─── */
const gradeStyle: Record<Grade, string> = {
  Established: 'bg-[#D9F0E4] text-[#2A7050]',
  Probable: 'bg-[#D4E4F5] text-[#2A4A7A]',
  Contested: 'bg-[#F5E8C8] text-[#8A5A1A]',
  Gap: 'bg-[#F5D8D8] text-[#8A1818]',
};

export default function OutcomesHubPage() {
  return (
    <div className="bg-sand min-h-screen">
      <Nav activeRoute="/outcomes" />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Outcomes' }]} />

      {/* HERO */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-[96px] grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 items-start">
          <div>
            <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-5">Public outcomes</div>
            <h1 className="font-serif text-[36px] lg:text-[64px] font-normal leading-[1.12] tracking-[-0.025em] text-dark mb-6">
              Every deliberation<br />is a <em className="italic text-terracotta">public record.</em>
            </h1>
            <p className="text-[19px] text-body leading-[1.8] mb-4">
              Every Augle session that resolves against a prediction market outcome is published in full — the question, the finding, the confidence grade, every agent's contribution, every Contrarian objection, and the Brier score against market consensus. Not summaries. The full structured record.
            </p>
            <p className="font-mono text-[11px] text-[#B0ADA5] leading-[1.6]">
              Data shown below is illustrative — representative of the session structure and Brier score format as the corpus accumulates resolved outcomes. Gold-tier calibration requires contracts live at session time.
            </p>
          </div>
          {/* Calibration panel */}
          <div className="bg-surface border-[0.5px] border-border rounded-lg overflow-hidden">
            <div className="px-5 py-3 border-b-[0.5px] border-border bg-[#EAE6DC]">
              <span className="font-mono text-[10px] tracking-[0.08em] text-muted uppercase">Calibration record · illustrative</span>
            </div>
            <div className="grid grid-cols-2 divide-x-[0.5px] divide-y-[0.5px] divide-border">
              {[
                { val: '247', label: 'Total sessions' },
                { val: '112', label: 'Resolved · ground-mapped', accent: true },
                { val: '89', label: 'Gold tier · live at session' },
                { val: '23', label: 'Silver tier · recent resolve' },
              ].map(({ val, label, accent }) => (
                <div key={label} className="px-5 py-4 text-center">
                  <div className={`font-serif text-[28px] font-normal mb-1 ${accent ? 'text-terracotta' : 'text-dark'}`}>{val}</div>
                  <div className="text-[11px] text-muted leading-[1.4]">{label}</div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 divide-x-[0.5px] divide-border border-t-[0.5px] border-border">
              <div className="px-5 py-5 text-center">
                <div className="font-mono text-[10px] text-muted uppercase mb-2">Augle Brier score</div>
                <div className="font-serif text-[32px] text-[#3AAA72] font-normal">0.118</div>
                <div className="font-mono text-[10px] text-muted mt-1">Lower is better</div>
              </div>
              <div className="px-5 py-5 text-center">
                <div className="font-mono text-[10px] text-muted uppercase mb-2">Market consensus</div>
                <div className="font-serif text-[32px] text-terracotta font-normal">0.174</div>
                <div className="font-mono text-[10px] text-muted mt-1">At session time</div>
              </div>
            </div>
            <div className="px-5 py-3 border-t-[0.5px] border-border">
              <p className="font-mono text-[10px] text-muted leading-[1.5]">Brier score = (confidence − outcome)². Gold-tier only. No hindsight contamination.</p>
            </div>
          </div>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="bg-surface border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-4 flex items-center gap-3 flex-wrap">
          <span className="font-mono text-[10px] text-muted uppercase">Filter</span>
          {['All domains', 'Economics', 'Policy', 'Geopolitics', 'Life sciences', 'Technology', 'Finance'].map((chip, i) => (
            <span key={chip} className={`font-mono text-[11px] px-3 py-[5px] rounded border-[0.5px] cursor-pointer ${i === 0 ? 'bg-dark text-white border-dark' : 'bg-transparent text-muted border-border hover:border-dark'}`}>
              {chip}
            </span>
          ))}
          <div className="w-[0.5px] h-5 bg-border mx-1" />
          {['All grades', 'Established', 'Probable', 'Contested', 'Gap'].map((chip, i) => (
            <span key={chip} className={`font-mono text-[11px] px-3 py-[5px] rounded border-[0.5px] cursor-pointer ${i === 0 ? 'bg-dark text-white border-dark' : 'bg-transparent text-muted border-border hover:border-dark'}`}>
              {chip}
            </span>
          ))}
          <div className="w-[0.5px] h-5 bg-border mx-1" />
          {['All tiers', 'Gold', 'Silver'].map((chip, i) => (
            <span key={chip} className={`font-mono text-[11px] px-3 py-[5px] rounded border-[0.5px] cursor-pointer ${i === 0 ? 'bg-dark text-white border-dark' : 'bg-transparent text-muted border-border hover:border-dark'}`}>
              {chip}
            </span>
          ))}
        </div>
      </div>

      {/* SESSION GRID */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-[28px] font-normal text-dark">Resolved sessions</h2>
            <span className="font-mono text-[11px] text-muted">112 resolved · sorted by recency · illustrative data</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {SESSION_CARDS.map((card) => (
              <Link key={card.href} href={card.href}
                className="bg-surface border-[0.5px] border-border rounded-lg overflow-hidden hover:border-terracotta transition-colors no-underline flex flex-col">
                <div className="px-4 py-4 flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-[10px] text-muted uppercase">{card.domain}</span>
                    <span className="font-mono text-[9px] text-[#C8C4BA]">·</span>
                    <span className="font-mono text-[10px] text-muted">{card.depth}</span>
                  </div>
                  <p className="text-[13px] text-dark leading-[1.5] italic">{card.q}</p>
                </div>
                <div className="px-4 py-3 border-t-[0.5px] border-border flex items-center justify-between gap-2 flex-wrap">
                  <span className={`font-mono text-[10px] px-2 py-[3px] rounded-[3px] ${gradeStyle[card.grade]}`}>{card.grade}</span>
                  <div className="flex items-center gap-2">
                    {card.augleBrier !== null ? (
                      <span className="font-mono text-[10px] text-terracotta">Augle {card.augleBrier.toFixed(3)}</span>
                    ) : (
                      <span className="font-mono text-[10px] text-muted">Letters & Science</span>
                    )}
                    {card.mktBrier && <span className="font-mono text-[10px] text-muted">vs mkt {card.mktBrier.toFixed(3)}</span>}
                  </div>
                  <div className="flex items-center gap-1">
                    {card.tier !== 'LS' && (
                      <span className={`font-mono text-[9px] px-2 py-[2px] rounded-[3px] ${card.tier === 'Gold' ? 'bg-[#FBF5F2] text-terracotta border-[0.5px] border-terracotta' : 'bg-[#EAE6DC] text-muted border-[0.5px] border-border'}`}>
                        {card.tier}
                      </span>
                    )}
                    {card.dissent > 0 && (
                      <span className="font-mono text-[9px] px-2 py-[2px] rounded-[3px] bg-[#F5E8C8] text-[#8A5A1A] border-[0.5px] border-[#E8C4A0]">
                        {card.dissent} dissent
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/outcomes" className="font-mono text-[12px] text-terracotta no-underline hover:underline">
              Browse all sessions in the outcomes browser →
            </Link>
          </div>
        </div>
      </div>

      {/* BRIER BY DOMAIN */}
      <div className="bg-surface border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">Brier score by domain</div>
          <h2 className="font-serif text-[28px] lg:text-[44px] font-normal text-dark leading-[1.15] mb-4">Calibration accuracy<br />across all domains.</h2>
          <p className="text-[16px] text-body leading-[1.8] max-w-[560px] mb-12">
            Lower Brier scores indicate better calibration. Augle ensemble vs. prediction market implied probability at session initiation — same information, same moment.
          </p>
          <div className="flex flex-col gap-4">
            {BRIER_DOMAIN_DATA.map(({ domain, augle, mkt, augleVal, mktVal }) => (
              <div key={domain} className="grid grid-cols-[100px_1fr] gap-4 items-center">
                <span className="text-[13px] text-body">{domain}</span>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-[10px] bg-[#EAE6DC] rounded-full overflow-hidden">
                      <div className="h-full bg-terracotta rounded-full flex items-center justify-end pr-1" style={{ width: `${augle}%` }}>
                        <span className="font-mono text-[9px] text-white">{augleVal}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-[10px] bg-[#EAE6DC] rounded-full overflow-hidden">
                      <div className="h-full bg-border rounded-full flex items-center justify-end pr-1" style={{ width: `${mkt}%` }}>
                        <span className="font-mono text-[9px] text-muted">{mktVal}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-5">
            <span className="flex items-center gap-2 text-[11px] text-muted"><span className="w-3 h-3 rounded-sm bg-terracotta inline-block" />Augle ensemble</span>
            <span className="flex items-center gap-2 text-[11px] text-muted"><span className="w-3 h-3 rounded-sm bg-border inline-block" />Market at session time</span>
          </div>
        </div>
      </div>

      {/* HOW OUTCOMES WORK */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">How it works</div>
          <h2 className="font-serif text-[28px] lg:text-[44px] font-normal text-dark leading-[1.15] mb-12">From session to<br />calibration record.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {HOW_STEPS.map(({ n, title, body }) => (
              <div key={n} className="bg-surface border-[0.5px] border-border rounded-lg p-6">
                <div className="font-serif text-[32px] text-terracotta font-normal leading-none mb-4">{n}</div>
                <div className="text-[15px] font-medium text-dark mb-2 leading-[1.4]">{title}</div>
                <p className="text-[13px] text-body leading-[1.7]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CORPUS EXPLAINER */}
      <div className="bg-dark border-b-[0.5px] border-[#49443F]">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-5">The reasoning corpus</div>
            <h2 className="font-serif text-[28px] lg:text-[44px] font-normal text-white leading-[1.15] mb-6">The outcomes record<br />is the asset.</h2>
            <p className="text-[16px] text-[#6A645E] leading-[1.8] mb-6">
              Every resolved session adds a calibration record to the Reasoning Corpus — structured multi-agent deliberation mapped to binary ground truth. At scale, this constitutes a dataset that does not exist anywhere else: disagreement, adversarial challenge, evidence weighting, and uncertainty quantification, all linked to verifiable outcomes. No competitor can replicate this retroactively.
            </p>
            <Link href="/index" className="font-mono text-[12px] text-terracotta no-underline hover:underline">
              View the Deliberation Index →
            </Link>
          </div>
          <div className="flex flex-col divide-y-[0.5px] divide-[#49443F]">
            {CORPUS_MILESTONES.map(({ label, val, accent }) => (
              <div key={label} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                <span className="text-[13px] text-[#6A645E]">{label}</span>
                <span className={`font-mono text-[12px] text-right ${accent ? 'text-terracotta' : 'text-[#B0ADA5]'}`}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-terracotta px-4 lg:px-[72px] py-24 text-center">
        <h2 className="font-serif text-[36px] lg:text-[52px] font-normal text-white leading-[1.1] mb-5 tracking-[-0.02em]">
          Add your question<br />to the record.
        </h2>
        <p className="text-[19px] text-white/75 mb-10 leading-[1.7]">
          Join the waitlist — every session you run becomes part of the public calibration record.<br className="hidden lg:block" />
          One free Standard session with every new account.
        </p>
        <div className="flex items-center justify-center gap-5 flex-wrap">
          <Link href="/waitlist" className="text-[15px] font-medium text-terracotta bg-white px-8 py-[14px] rounded no-underline hover:opacity-90 transition-opacity">Join waitlist</Link>
          <Link href="/index" className="text-[15px] text-white/80 border-[0.5px] border-white/35 px-7 py-[14px] rounded no-underline hover:bg-white/10 transition-colors">Deliberation Index</Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
