import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';

const DOMAIN_DATA = [
  { name: 'Life sciences', sessions: 34, consensus: 84, dissent: 12, fillClass: 'green' },
  { name: 'Economics', sessions: 51, consensus: 78, dissent: 18, fillClass: 'green' },
  { name: 'Finance', sessions: 29, consensus: 74, dissent: 22, fillClass: 'green' },
  { name: 'Policy', sessions: 38, consensus: 72, dissent: 26, fillClass: 'amber' },
  { name: 'Climate', sessions: 22, consensus: 68, dissent: 28, fillClass: 'amber' },
  { name: 'Geopolitics', sessions: 41, consensus: 62, dissent: 35, fillClass: 'amber' },
  { name: 'Technology', sessions: 47, consensus: 58, dissent: 38, fillClass: 'red' },
  { name: 'AI governance', sessions: 18, consensus: 49, dissent: 46, fillClass: 'red' },
];

const HEATMAP_ROWS = [
  { domain: 'Economics', brier: '0.068', consensus: '78%', dissent: '1.4', grade: 'Probable', strength: 'high' },
  { domain: 'Life sciences', brier: '0.071', consensus: '84%', dissent: '0.9', grade: 'Probable', strength: 'high' },
  { domain: 'Policy', brier: '0.094', consensus: '72%', dissent: '2.1', grade: 'Contested', strength: 'mid' },
  { domain: 'Geopolitics', brier: '0.112', consensus: '62%', dissent: '2.8', grade: 'Contested', strength: 'mid' },
  { domain: 'Technology', brier: '0.124', consensus: '58%', dissent: '3.2', grade: 'Contested', strength: 'low' },
  { domain: 'AI governance', brier: '0.149', consensus: '49%', dissent: '4.1', grade: 'Contested', strength: 'low' },
];

const GRADE_BARS = [
  { name: 'Probable', pct: 48, color: '#C15F3C', note: 'The most common grade. Best available evidence supports the claim but replication is limited.' },
  { name: 'Contested', pct: 31, color: '#8A5A1A', note: 'Active dispute or unresolved Strong objection. The finding names the dispute, not a direction.' },
  { name: 'Established', pct: 14, color: '#2A7050', note: 'Multiple independent replications across distinct methodologies. Requires formal objection to downgrade.' },
  { name: 'Gap', pct: 7, color: '#8A1818', note: 'Insufficient evidence to evaluate the claim. A first-class finding — not a failure state.' },
];

const TICKER_ITEMS = [
  { domain: 'Economics', q: 'Will the Fed cut rates at least twice in 2026?', grade: 'Probable', gradeColor: '#C15F3C' },
  { domain: 'Technology', q: 'Will AGI be declared achieved by any major lab before 2028?', grade: 'Contested', gradeColor: '#8A5A1A' },
  { domain: 'Policy', q: 'Will the US pass federal AI regulation before end of 2026?', grade: 'Contested', gradeColor: '#8A5A1A' },
  { domain: 'Life sci', q: 'Does current GLP-1 evidence support long-term maintenance without dosing?', grade: 'Contested', gradeColor: '#8A5A1A' },
  { domain: 'Finance', q: 'Will AI infrastructure capex produce a correction within 18 months?', grade: 'Contested', gradeColor: '#8A5A1A' },
  { domain: 'Geopolitics', q: 'Will a significant military incident occur in the Taiwan Strait in 2026?', grade: 'Probable', gradeColor: '#C15F3C' },
];

const hmStrengthBg: Record<string, string> = {
  high: '#1A3D2A',
  mid: '#2C2820',
  low: '#3D1A10',
};
const hmStrengthColor: Record<string, string> = {
  high: '#3AAA72',
  mid: '#B0ADA5',
  low: '#C15F3C',
};

const barFill: Record<string, string> = {
  green: '#3AAA72',
  amber: '#C15F3C',
  red: '#8A3018',
};

export default function IndexPage() {
  return (
    <div className="bg-sand min-h-screen">
      <Nav activeRoute="/index" />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Deliberation Index' }]} />

      {/* HERO — dark */}
      <div className="bg-dark border-b-[0.5px] border-[#49443F]">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-[96px] grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-20 items-start">
          <div>
            <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-5">Augle Deliberation Index</div>
            <h1 className="font-serif text-[36px] lg:text-[64px] font-normal leading-[1.12] tracking-[-0.025em] text-white mb-6">
              Where does AI<br />reach <em className="italic text-terracotta">consensus</em> —<br />and where does it<br />break down?
            </h1>
            <p className="text-[19px] text-[#6A645E] leading-[1.8] max-w-[560px] mb-4">
              The Deliberation Index tracks consensus rates, dissent levels, confidence grade distributions, and Brier score trends across domains — updated as sessions resolve. Not what the models think. What the structured deliberation produces.
            </p>
            <p className="font-mono text-[11px] text-[#49443F] leading-[1.6]">
              Index data is illustrative — representative of the dashboard structure as the corpus accumulates resolved sessions. All figures are projected from the architecture and session structure.
            </p>
          </div>
          {/* Ticker panel */}
          <div className="bg-[#262321] border-[0.5px] border-[#49443F] rounded-lg overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b-[0.5px] border-[#49443F]">
              <div className="w-[6px] h-[6px] rounded-full bg-terracotta" />
              <span className="font-mono text-[10px] tracking-[0.06em] text-[#6A645E] uppercase">Recent sessions · illustrative</span>
            </div>
            <div className="flex flex-col divide-y divide-[#49443F]">
              {TICKER_ITEMS.map(({ domain, q, grade, gradeColor }) => (
                <div key={q} className="px-4 py-3 flex flex-col gap-1">
                  <span className="font-mono text-[10px] tracking-[0.06em] text-[#49443F] uppercase">{domain}</span>
                  <span className="text-[12px] text-[#B0ADA5] leading-[1.5] italic">{q}</span>
                  <span className="font-mono text-[10px]" style={{ color: gradeColor }}>{grade}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* INDEX SUBNAV */}
      <div className="bg-surface border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] flex gap-6 overflow-x-auto">
          {[
            { href: '/index', label: 'Overview', active: true },
            { href: '/index/explorer', label: 'Question explorer' },
            { href: '/index/heatmap', label: 'Heatmaps' },
            { href: '/index/methodology', label: 'Methodology' },
          ].map(({ href, label, active }) => (
            <Link key={href} href={href}
              className={`text-[14px] py-4 border-b-[2px] whitespace-nowrap no-underline transition-colors ${active ? 'border-terracotta text-dark font-medium' : 'border-transparent text-muted hover:text-dark'}`}>
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* CONSENSUS BY DOMAIN */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">Consensus by domain</div>
          <h2 className="font-serif text-[28px] lg:text-[44px] font-normal text-dark leading-[1.15] mb-12">
            Consensus rates across<br />all deliberation domains.
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 items-start">
            {/* Table */}
            <div className="bg-surface border-[0.5px] border-border rounded-lg overflow-hidden">
              <div className="grid grid-cols-[1fr_80px_1fr_80px] gap-0 bg-[#EAE6DC] px-5 py-3 border-b-[0.5px] border-border">
                {['Domain', 'Sessions', 'Consensus', 'Dissent'].map(h => (
                  <span key={h} className="font-mono text-[10px] tracking-[0.06em] text-[#B0ADA5] uppercase last:text-right">{h}</span>
                ))}
              </div>
              {DOMAIN_DATA.map(({ name, sessions, consensus, dissent, fillClass }) => (
                <div key={name} className="grid grid-cols-[1fr_80px_1fr_80px] gap-0 items-center px-5 py-3 border-b-[0.5px] border-border last:border-0">
                  <span className="text-[14px] font-medium text-dark">{name}</span>
                  <span className="font-mono text-[12px] text-[#B0ADA5]">{sessions}</span>
                  <div className="flex items-center gap-2 pr-4">
                    <div className="flex-1 h-[6px] bg-[#EAE6DC] rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${consensus}%`, background: barFill[fillClass] }} />
                    </div>
                    <span className="font-mono text-[11px] text-dark w-8 text-right">{consensus}%</span>
                  </div>
                  <span className="font-mono text-[12px] text-muted text-right">{dissent}%</span>
                </div>
              ))}
            </div>
            {/* Explainer */}
            <div>
              <h3 className="font-serif text-[20px] font-normal text-dark mb-3">How consensus is measured.</h3>
              <p className="text-[14px] text-body leading-[1.75] mb-5">
                Consensus rate is the proportion of sessions in a domain that reached a Probable or Established confidence grade without an Unresolved Strong Contrarian objection. High consensus means the ensemble consistently converged. Low consensus means the questions in that domain consistently produce unresolved adversarial pressure — which is information, not a failure.
              </p>
              <div className="grid grid-cols-1 gap-3 mb-5">
                {[
                  { label: 'High consensus', color: '#3AAA72', text: 'Cartographer, Methodologist, and Synthesizer converge. Contrarian objections are resolved or graded Speculative. Final grade: Probable or Established.' },
                  { label: 'High dissent', color: '#C15F3C', text: 'Contrarian raises Unresolved Strong objections that carry to Phase 3. The finding reflects the dispute — Contested grade or multiple unresolved objections in the output.' },
                ].map(({ label, color, text }) => (
                  <div key={label} className="bg-sand border-[0.5px] border-border rounded-lg p-4">
                    <div className="text-[12px] font-medium mb-2" style={{ color }}>{label}</div>
                    <p className="text-[13px] text-body leading-[1.6]">{text}</p>
                  </div>
                ))}
              </div>
              <p className="text-[13px] text-muted leading-[1.6] font-mono border-l-2 border-border pl-4">
                AI governance has the lowest consensus rate in the corpus — 49%. This is structurally expected: the questions are genuinely contested, the evidence base is thin, and the Contrarian has strong material to work with.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* HEATMAP */}
      <div className="bg-dark border-b-[0.5px] border-[#49443F]">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">Confidence + dissent heatmap</div>
          <h2 className="font-serif text-[28px] lg:text-[44px] font-normal text-white leading-[1.15] mb-4">
            How confidence and dissent<br />interact across domains.
          </h2>
          <p className="text-[18px] text-[#6A645E] leading-[1.85] max-w-[640px] mb-12">
            Each cell shows the average metric for that domain × confidence grade combination. High consensus doesn't always mean low dissent.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b-[0.5px] border-[#49443F]">
                  <th className="font-mono text-[10px] tracking-[0.06em] text-[#6A645E] uppercase text-left py-3 pr-6 w-[160px]" />
                  {['Avg Brier', 'Consensus %', 'Dissent flags', 'Avg grade'].map(h => (
                    <th key={h} className="font-mono text-[10px] tracking-[0.06em] text-[#6A645E] uppercase text-center py-3 pr-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {HEATMAP_ROWS.map(({ domain, brier, consensus, dissent, grade, strength }) => (
                  <tr key={domain} className="border-b-[0.5px] border-[#49443F] last:border-0">
                    <td className="text-[13px] text-[#D4CFC6] py-3 pr-6">{domain}</td>
                    {[brier, consensus, dissent, grade].map((val, i) => (
                      <td key={i} className="py-3 pr-4 text-center">
                        <span className="font-mono text-[12px] px-2 py-[3px] rounded-[3px] inline-block"
                          style={{ background: hmStrengthBg[strength], color: hmStrengthColor[strength] }}>
                          {val}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap gap-4 mt-6">
            {[
              { bg: '#1A3D2A', label: 'Strong (low Brier, high consensus)' },
              { bg: '#2C2820', label: 'Moderate' },
              { bg: '#3D1A10', label: 'Weak (high Brier, high dissent)' },
            ].map(({ bg, label }) => (
              <span key={label} className="flex items-center gap-2 text-[11px] text-muted">
                <span className="w-3 h-3 rounded-[2px] inline-block flex-shrink-0" style={{ background: bg }} />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* GRADE DISTRIBUTION */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">Confidence grade distribution</div>
          <h2 className="font-serif text-[28px] lg:text-[44px] font-normal text-dark leading-[1.15] mb-12">
            How findings are distributed<br />across the four grades.
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 items-start">
            <div>
              <div className="font-mono text-[13px] text-[#B0ADA5] mb-5">All sessions · illustrative data</div>
              <div className="flex flex-col gap-6">
                {GRADE_BARS.map(({ name, pct, color, note }) => (
                  <div key={name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[14px] font-medium text-dark">{name}</span>
                      <span className="font-mono text-[13px] text-dark">{pct}%</span>
                    </div>
                    <div className="h-[10px] bg-[#EAE6DC] rounded-full overflow-hidden mb-2">
                      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
                    </div>
                    <p className="text-[12px] text-muted leading-[1.5]">{note}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-serif text-[20px] font-normal text-dark mb-3">What the distribution reveals.</h3>
              <p className="text-[14px] text-body leading-[1.75] mb-5">
                The preponderance of Probable grades reflects an accurate picture of where most research questions sit: supported by evidence, but not at the level of independent replication across methodological contexts. Contested at 31% is structurally honest — the ensemble isn't softening findings.
              </p>
              {[
                { label: 'Key signal', text: 'AI governance questions produce a Contested or Gap grade in 71% of sessions — the highest contested rate of any domain. Technology is second at 58%. Life sciences and economics are the most resolvable domains in the corpus.' },
                { label: 'What Contested means in practice', text: 'A Contested finding is not a failure to reach a conclusion. It is a structurally complete finding that names the dispute, preserves competing positions, and surfaces the resolution condition.' },
              ].map(({ label, text }) => (
                <div key={label} className="bg-surface border-[0.5px] border-border rounded-lg p-4 mb-3 last:mb-0">
                  <div className="font-mono text-[10px] tracking-[0.06em] text-terracotta uppercase mb-2">{label}</div>
                  <p className="text-[13px] text-body leading-[1.6]">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BRIER TREND */}
      <div className="bg-surface border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">Calibration trend</div>
          <h2 className="font-serif text-[28px] lg:text-[44px] font-normal text-dark leading-[1.15] mb-12">
            Brier score vs market consensus<br />over time.
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-[16px] text-body leading-[1.8] mb-4">
                As the corpus accumulates Gold-tier resolved sessions, the Brier score comparison against market consensus becomes statistically robust. The gap between the ensemble's calibration accuracy and market consensus at session initiation time is the core accuracy claim — and it grows more defensible with each resolved session.
              </p>
              <p className="text-[16px] text-body leading-[1.8] mb-8">
                The ensemble doesn't have an information advantage over the market. Both see the same evidence at session time. The advantage is structural: seven agents, adversarial pressure, unidirectional confidence propagation, and Guardian integrity verification produce more calibrated probability estimates than market implied probability alone.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { val: '0.118', label: 'Augle Brier · Gold tier', accent: true },
                  { val: '0.174', label: 'Market consensus · same sessions', accent: false },
                  { val: '32%', label: 'Brier score advantage', accent: true },
                  { val: '89', label: 'Gold-tier resolved sessions', accent: false },
                ].map(({ val, label, accent }) => (
                  <div key={label} className="bg-sand border-[0.5px] border-border rounded-lg p-4">
                    <div className={`font-serif text-[28px] font-normal mb-1 ${accent ? 'text-terracotta' : 'text-muted'}`}>{val}</div>
                    <div className="text-[12px] text-muted leading-[1.4]">{label}</div>
                  </div>
                ))}
              </div>
              <p className="font-mono text-[11px] text-[#B0ADA5] leading-[1.6] border-l-2 border-border pl-3">
                All figures illustrative. Gold-tier calibration is the primary accuracy statistic — contracts live at session time, no hindsight contamination possible.
              </p>
            </div>
            {/* Simple bar chart */}
            <div className="bg-sand border-[0.5px] border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <span className="text-[13px] font-medium text-dark">Monthly Brier score · Augle vs market</span>
                <span className="font-mono text-[10px] text-[#B0ADA5]">illustrative</span>
              </div>
              <div className="flex items-end gap-4 h-[120px] mb-4">
                {[
                  { augle: 52, mkt: 72 },
                  { augle: 48, mkt: 68 },
                  { augle: 44, mkt: 65 },
                  { augle: 42, mkt: 62 },
                  { augle: 40, mkt: 60 },
                  { augle: 38, mkt: 58 },
                ].map(({ augle, mkt }, i) => (
                  <div key={i} className="flex-1 flex items-end gap-1">
                    <div className="flex-1 bg-terracotta rounded-t-sm" style={{ height: `${augle}px` }} />
                    <div className="flex-1 bg-border rounded-t-sm" style={{ height: `${mkt}px` }} />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 mb-3">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map(m => (
                  <span key={m} className="flex-1 font-mono text-[10px] text-muted text-center">{m}</span>
                ))}
              </div>
              <div className="flex gap-4">
                {[
                  { color: '#C15F3C', label: 'Augle ensemble' },
                  { color: '#C8C4BA', label: 'Market at session time' },
                ].map(({ color, label }) => (
                  <span key={label} className="flex items-center gap-2 text-[11px] text-muted">
                    <span className="w-[10px] h-[10px] rounded-[2px] flex-shrink-0" style={{ background: color }} />
                    {label}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-muted mt-3 font-mono">Lower bars = better calibration. Gap widening = improving advantage.</p>
            </div>
          </div>
        </div>
      </div>

      {/* GO DEEPER */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">Explore the Index</div>
          <h2 className="font-serif text-[28px] lg:text-[44px] font-normal text-dark leading-[1.15] mb-12">Go deeper.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { href: '/index/explorer', eyebrow: 'Question explorer', title: 'Search and filter all deliberation sessions', body: 'Browse every session by domain, confidence grade, dissent level, corpus tier, resolution source, and session depth. Sort by Brier score or recency.', cta: 'Open explorer →' },
              { href: '/index/heatmap', eyebrow: 'Heatmaps', title: 'Confidence and dissent across domains and time', body: 'Interactive heatmaps showing how consensus rates, dissent levels, and confidence grade distributions vary across domains and evolve over time as the corpus grows.', cta: 'View heatmaps →' },
              { href: '/index/methodology', eyebrow: 'Methodology', title: 'How the Index is computed', body: 'Full methodology — how corpus quality tiers are assigned, how Brier scores are computed, what the consensus and dissent metrics measure, and what the data does and doesn\'t show.', cta: 'Read methodology →' },
            ].map(({ href, eyebrow, title, body, cta }) => (
              <Link key={href} href={href} className="bg-surface border-[0.5px] border-border rounded-lg p-6 hover:border-terracotta transition-colors no-underline group flex flex-col">
                <div className="font-mono text-[10px] tracking-[0.06em] text-terracotta uppercase mb-2">{eyebrow}</div>
                <div className="text-[15px] font-medium text-dark mb-3 leading-[1.4] group-hover:text-terracotta transition-colors">{title}</div>
                <p className="text-[13px] text-body leading-[1.6] flex-1 mb-4">{body}</p>
                <span className="text-[13px] text-terracotta font-medium">{cta}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-terracotta px-4 lg:px-[72px] py-24 text-center">
        <h2 className="font-serif text-[36px] lg:text-[52px] font-normal text-white leading-[1.1] mb-5 tracking-[-0.02em]">
          Add your sessions<br />to the Index.
        </h2>
        <p className="text-[19px] text-white/75 mb-10 leading-[1.7]">
          Every Markets-mode session you run contributes to the calibration record.<br className="hidden lg:block" />
          Join the waitlist — one Standard session free.
        </p>
        <div className="flex items-center justify-center gap-5 flex-wrap">
          <Link href="/waitlist" className="text-[15px] font-medium text-terracotta bg-white px-8 py-[14px] rounded no-underline hover:opacity-90 transition-opacity">Join waitlist</Link>
          <Link href="/outcomes" className="text-[15px] text-white/80 border-[0.5px] border-white/35 px-7 py-[14px] rounded no-underline hover:bg-white/10 transition-colors">Browse outcomes</Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
