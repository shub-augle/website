'use client';

import { useState } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

/* ─── Types ─── */
type Grade = 'Established' | 'Probable' | 'Contested' | 'Gap';
type Metric = 'count' | 'pct';

interface GradeCell { n: number; pct: number }
interface DomainSession { q: string; conf: number; time: string; brier: number | null; agents: number[]; objection?: string; objAgent?: string }
interface DomainData {
  name: string; total: number;
  est: GradeCell; pro: GradeCell; con: GradeCell; gap: GradeCell;
  brier: number; mkt: number;
  sessions: Record<Grade, DomainSession[]>;
}

/* ─── Data ─── */
const DOMAINS: DomainData[] = [
  {
    name: 'Economics', total: 51, brier: 0.068, mkt: 0.104,
    est: { n: 6, pct: 12 }, pro: { n: 31, pct: 61 }, con: { n: 11, pct: 22 }, gap: { n: 3, pct: 6 },
    sessions: {
      Established: [
        { q: 'Will aspirin reduce cardiovascular events in primary prevention?', conf: 91, time: '3d ago', brier: 0.031, agents: [82,88,70,91,87] },
        { q: 'Does compound interest growth outpace simple interest over 10+ years?', conf: 96, time: '5d ago', brier: 0.018, agents: [94,97,88,96,95] },
      ],
      Probable: [
        { q: 'Will the Fed cut rates at least twice in 2026?', conf: 78, time: '4h ago', brier: 0.049, agents: [82,85,41,88,76], objection: 'Fed communication signals inconsistent — dot-plot interpretation has higher variance than acknowledged.', objAgent: 'Contrarian' },
        { q: 'Will US inflation fall below 2.5% before year-end 2026?', conf: 71, time: '10h ago', brier: 0.071, agents: [74,68,55,80,77] },
        { q: 'Will the ECB cut rates before the Fed in 2026?', conf: 64, time: '1d ago', brier: 0.088, agents: [68,62,48,72,60] },
      ],
      Contested: [
        { q: 'Will the US enter a recession by Q4 2026?', conf: 62, time: '2h ago', brier: 0.112, agents: [68,72,31,79,65], objection: 'Labor market lag undermines recession timing assumptions.', objAgent: 'Contrarian' },
        { q: 'Will EU economy outperform US in 2026?', conf: 18, time: '3d ago', brier: 0.149, agents: [20,15,61,18,16], objection: '"Outperform" is undefined — no operationalizable resolution criterion available.', objAgent: 'Methodologist' },
      ],
      Gap: [
        { q: 'What is the economically optimal global carbon price?', conf: 12, time: '1w ago', brier: null, agents: [15,10,72,12,11], objection: 'No single resolution criterion exists — question requires operationalization before scoring.', objAgent: 'Methodologist' },
      ],
    },
  },
  {
    name: 'Life sciences', total: 34, brier: 0.071, mkt: 0.112,
    est: { n: 9, pct: 26 }, pro: { n: 20, pct: 59 }, con: { n: 4, pct: 12 }, gap: { n: 1, pct: 3 },
    sessions: {
      Established: [
        { q: 'Does aspirin reduce cardiovascular risk in secondary prevention populations?', conf: 94, time: '1w ago', brier: 0.022, agents: [92,96,78,94,91] },
        { q: 'Is statin therapy effective for reducing LDL cholesterol?', conf: 97, time: '2w ago', brier: 0.014, agents: [96,98,82,97,96] },
      ],
      Probable: [
        { q: 'Will a GLP-1 drug receive FDA approval for heart disease prevention by 2027?', conf: 83, time: '14h ago', brier: 0.031, agents: [86,90,67,88,82] },
        { q: 'Does metformin extend healthy lifespan in non-diabetic populations?', conf: 58, time: '2d ago', brier: 0.089, agents: [62,54,44,66,58], objection: 'TAME trial results pending — current evidence is suggestive not conclusive.', objAgent: 'Methodologist' },
      ],
      Contested: [
        { q: 'Does the GLP-1 evidence support long-term weight maintenance without dosing?', conf: 24, time: '2d ago', brier: null, agents: [28,20,72,24,22], objection: 'No RCT has followed patients beyond 24 months off-drug — evidence gap is total.', objAgent: 'Methodologist' },
      ],
      Gap: [
        { q: 'What is the optimal microbiome composition for metabolic health?', conf: 9, time: '4d ago', brier: null, agents: [12,8,68,10,9], objection: 'Construct is not operationalized — no agreed definition of "optimal" microbiome.', objAgent: 'Methodologist' },
      ],
    },
  },
  {
    name: 'Policy', total: 38, brier: 0.094, mkt: 0.131,
    est: { n: 2, pct: 5 }, pro: { n: 19, pct: 50 }, con: { n: 14, pct: 37 }, gap: { n: 3, pct: 8 },
    sessions: {
      Established: [
        { q: 'Does raising the minimum wage increase employment costs for small businesses?', conf: 88, time: '1w ago', brier: 0.044, agents: [86,91,74,88,85] },
      ],
      Probable: [
        { q: 'Will the EU carbon border adjustment survive legal challenge before 2027?', conf: 72, time: '1d ago', brier: 0.063, agents: [76,70,58,78,68] },
        { q: 'Will carbon pricing become the dominant climate policy mechanism by 2030?', conf: 61, time: '3d ago', brier: 0.091, agents: [65,58,48,68,62] },
      ],
      Contested: [
        { q: 'Will Congress pass a federal AI regulation bill before 2027?', conf: 29, time: '8h ago', brier: 0.138, agents: [25,18,52,30,40], objection: 'Legislative timeline operationalization is ambiguous across cited examples.', objAgent: 'Methodologist' },
        { q: 'Will the US rejoin the Paris Agreement in a substantive way by 2028?', conf: 44, time: '5d ago', brier: 0.119, agents: [48,42,38,50,44], objection: 'Operational definition of "substantive" is not agreed — resolution criteria disputed.', objAgent: 'Methodologist' },
      ],
      Gap: [
        { q: 'What is the optimal corporate tax rate for growth in the EU?', conf: 8, time: '3d ago', brier: null, agents: [11,7,71,9,8], objection: '"Optimal" requires a welfare function that is not specified — question is not answerable as posed.', objAgent: 'Methodologist' },
      ],
    },
  },
  {
    name: 'Technology', total: 47, brier: 0.124, mkt: 0.165,
    est: { n: 5, pct: 11 }, pro: { n: 19, pct: 40 }, con: { n: 19, pct: 40 }, gap: { n: 4, pct: 9 },
    sessions: {
      Established: [
        { q: 'Does transformer scaling improve performance when training compute is doubled?', conf: 91, time: '2w ago', brier: 0.032, agents: [89,94,76,91,88] },
      ],
      Probable: [
        { q: 'Will LLMs surpass human performance on the MMLU benchmark by 2026?', conf: 74, time: '2d ago', brier: 0.068, agents: [78,70,58,80,72] },
        { q: 'Will quantum computing achieve practical advantage over classical computing before 2030?', conf: 58, time: '3d ago', brier: 0.092, agents: [62,54,46,64,58] },
      ],
      Contested: [
        { q: 'Will AGI be declared achieved by any major lab before 2028?', conf: 41, time: '6h ago', brier: 0.112, agents: [44,22,61,48,19], objection: 'Definition of AGI is insufficiently operationalized for reliable scoring.', objAgent: 'Methodologist' },
        { q: 'Will AI replace more than 20% of white-collar jobs by 2030?', conf: 38, time: '1d ago', brier: 0.128, agents: [42,34,54,44,38], objection: 'Employment displacement vs. augmentation distinction is not operationalized.', objAgent: 'Methodologist' },
      ],
      Gap: [
        { q: 'When will artificial general intelligence be achieved?', conf: 7, time: '4d ago', brier: null, agents: [10,5,74,8,7], objection: 'No agreed definition of AGI exists — question is not answerable as posed.', objAgent: 'Methodologist' },
      ],
    },
  },
  {
    name: 'Geopolitics', total: 41, brier: 0.102, mkt: 0.142,
    est: { n: 1, pct: 2 }, pro: { n: 18, pct: 44 }, con: { n: 18, pct: 44 }, gap: { n: 4, pct: 10 },
    sessions: {
      Established: [
        { q: 'Does military spending correlate with geopolitical influence across major powers?', conf: 84, time: '1w ago', brier: 0.049, agents: [82,88,68,84,80] },
      ],
      Probable: [
        { q: 'Will there be a major escalation in the Middle East conflict before Q3 2026?', conf: 61, time: '6h ago', brier: 0.094, agents: [64,58,52,66,62] },
      ],
      Contested: [
        { q: 'Will a significant military incident occur in the Taiwan Strait in 2026?', conf: 34, time: '1d ago', brier: 0.082, agents: [38,29,58,34,31], objection: 'Definition of "significant military incident" is underspecified — resolution criteria ambiguous.', objAgent: 'Methodologist' },
      ],
      Gap: [
        { q: 'Will the US-China relationship become cooperative rather than competitive by 2035?', conf: 11, time: '5d ago', brier: null, agents: [14,9,72,12,10], objection: '"Cooperative rather than competitive" is not operationalized for binary resolution.', objAgent: 'Methodologist' },
      ],
    },
  },
  {
    name: 'AI governance', total: 18, brier: 0.149, mkt: 0.188,
    est: { n: 0, pct: 0 }, pro: { n: 9, pct: 50 }, con: { n: 7, pct: 39 }, gap: { n: 2, pct: 11 },
    sessions: {
      Established: [],
      Probable: [
        { q: 'Will the EU AI Act enforcement actions begin in 2026?', conf: 68, time: '2d ago', brier: 0.078, agents: [72,64,54,74,66] },
        { q: 'Will the UK introduce binding AI safety legislation by 2027?', conf: 54, time: '4d ago', brier: 0.104, agents: [58,50,42,60,54] },
      ],
      Contested: [
        { q: 'Will AI safety become the primary concern of frontier labs by 2028?', conf: 36, time: '3d ago', brier: 0.124, agents: [40,32,48,38,36], objection: '"Primary concern" is not operationalized — resolution criteria vary by lab.', objAgent: 'Methodologist' },
      ],
      Gap: [
        { q: 'What governance structure will best manage AI risk globally?', conf: 8, time: '4d ago', brier: null, agents: [11,7,70,9,8], objection: '"Best" requires a welfare function and a defined risk taxonomy that does not exist in agreed form.', objAgent: 'Methodologist' },
      ],
    },
  },
];

/* ─── Cell intensity colors by grade and density ─── */
const GRADE_COLORS: Record<Grade, [string, string, string]> = {
  Established: ['#EAF3DE', '#C0DD97', '#97C459'],
  Probable: ['#E6F1FB', '#B5D4F4', '#85B7EB'],
  Contested: ['#FAEEDA', '#FAC775', '#EF9F27'],
  Gap: ['#FCEBEB', '#F7C1C1', '#E24B4A'],
};

function cellColor(grade: Grade, n: number): string {
  const colors = GRADE_COLORS[grade];
  if (n === 0) return '#F4F1EB';
  if (n <= 3) return colors[0];
  if (n <= 10) return colors[1];
  return colors[2];
}

function cellTextColor(grade: Grade, n: number): string {
  if (n === 0) return '#C8C4BA';
  if (n <= 3) return '#5A5550';
  if (n <= 10) return grade === 'Established' ? '#3B6D11' : grade === 'Probable' ? '#185FA5' : grade === 'Contested' ? '#854F0B' : '#A32D2D';
  return grade === 'Established' ? '#3B6D11' : grade === 'Probable' ? '#185FA5' : grade === 'Contested' ? '#854F0B' : '#A32D2D';
}

const INDEX_SUBNAV = [
  { href: '/index', label: 'Overview' },
  { href: '/index/explorer', label: 'Question explorer' },
  { href: '/index/heatmap', label: 'Heatmaps', active: true },
  { href: '/index/methodology', label: 'Methodology' },
];

const GRADES: Grade[] = ['Established', 'Probable', 'Contested', 'Gap'];

export default function IndexHeatmapPage() {
  const [metric, setMetric] = useState<Metric>('count');
  const [selectedCell, setSelectedCell] = useState<{ domain: string; grade: Grade } | null>(null);

  const selectedDomain = selectedCell ? DOMAINS.find(d => d.name === selectedCell.domain) : null;
  const selectedSessions = selectedDomain && selectedCell ? selectedDomain.sessions[selectedCell.grade] : [];

  return (
    <div className="bg-sand min-h-screen">
      <Nav activeRoute="/index" />

      {/* PAGE HEADER */}
      <div className="bg-dark border-b-[0.5px] border-[#49443F] px-4 lg:px-[72px] py-8">
        <div className="max-w-[1280px] mx-auto">
          <div className="font-mono text-[10px] tracking-[0.08em] text-[#6A645E] uppercase mb-1">Augle Deliberation Index</div>
          <h1 className="font-serif text-[32px] lg:text-[44px] font-normal text-white mb-1">Confidence grade heatmap</h1>
          <p className="text-[14px] text-[#6A645E]">Session count and grade distribution by domain · Click any cell to explore sessions · Illustrative data</p>
        </div>
      </div>

      {/* SUBNAV */}
      <div className="bg-surface border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] flex gap-6 overflow-x-auto">
          {INDEX_SUBNAV.map(({ href, label, active }) => (
            <Link key={href} href={href}
              className={`text-[14px] py-4 border-b-[2px] whitespace-nowrap no-underline transition-colors ${active ? 'border-terracotta text-dark font-medium' : 'border-transparent text-muted hover:text-dark'}`}>
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* BODY */}
      <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-8 flex gap-6 items-start">

        {/* HEATMAP SIDE */}
        <div className="flex-1 min-w-0">
          {/* Controls */}
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <div>
              <div className="text-[15px] font-medium text-dark">Domains × confidence grades</div>
              <div className="text-[12px] text-muted">Cell intensity = session density · darker = more sessions in that cell</div>
            </div>
            <div className="flex items-center gap-4">
              {/* Legend */}
              <div className="hidden lg:flex items-center gap-4">
                {([['Established', '#97C459', '#3B6D11'], ['Probable', '#85B7EB', '#185FA5'], ['Contested', '#EF9F27', '#854F0B'], ['Gap', '#E24B4A', '#A32D2D']] as const).map(([label, , color]) => (
                  <div key={label} className="flex items-center gap-2">
                    <div className="flex gap-[2px]">
                      {[GRADE_COLORS[label as Grade][0], GRADE_COLORS[label as Grade][1], GRADE_COLORS[label as Grade][2]].map((c, i) => (
                        <div key={i} className="w-4 h-4 rounded-[2px]" style={{ background: c }} />
                      ))}
                    </div>
                    <span className="text-[11px]" style={{ color }}>{label}</span>
                  </div>
                ))}
              </div>
              {/* Metric toggle */}
              <div className="flex border-[0.5px] border-border rounded overflow-hidden">
                {(['count', 'pct'] as const).map(m => (
                  <button key={m} onClick={() => setMetric(m)}
                    className={`font-mono text-[11px] px-3 py-[5px] cursor-pointer border-r-[0.5px] last:border-r-0 border-border transition-colors ${metric === m ? 'bg-dark text-white' : 'bg-surface text-muted hover:text-dark'}`}>
                    {m === 'count' ? 'Count' : '%'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Heatmap table */}
          <div className="bg-surface border-[0.5px] border-border rounded-lg overflow-hidden overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b-[0.5px] border-border">
                  <th className="text-left px-4 py-3 w-[130px] font-mono text-[10px] text-muted uppercase" />
                  {GRADES.map(g => (
                    <th key={g} className="px-3 py-3 font-mono text-[10px] text-muted uppercase text-center">{g}</th>
                  ))}
                  <th className="px-3 py-3 font-mono text-[10px] text-muted uppercase text-center w-[60px]">Total</th>
                </tr>
              </thead>
              <tbody>
                {DOMAINS.map(domain => (
                  <tr key={domain.name} className="border-b-[0.5px] border-border last:border-0">
                    <td className="px-4 py-2">
                      <div className="text-[12px] font-medium text-dark">{domain.name}</div>
                      <div className="font-mono text-[10px] text-muted">Brier {domain.brier.toFixed(3)}</div>
                    </td>
                    {GRADES.map(grade => {
                      const cell = { Established: domain.est, Probable: domain.pro, Contested: domain.con, Gap: domain.gap }[grade];
                      const val = metric === 'count' ? cell.n : cell.pct;
                      const isSelected = selectedCell?.domain === domain.name && selectedCell?.grade === grade;
                      return (
                        <td key={grade} className="px-2 py-2 text-center">
                          <div
                            onClick={() => setSelectedCell(cell.n > 0 ? (isSelected ? null : { domain: domain.name, grade }) : null)}
                            className={`inline-flex items-center justify-center w-14 h-10 rounded-[4px] font-mono text-[13px] font-medium transition-all ${cell.n > 0 ? 'cursor-pointer hover:ring-2 hover:ring-terracotta hover:ring-offset-1' : 'cursor-default'} ${isSelected ? 'ring-2 ring-terracotta ring-offset-1' : ''}`}
                            style={{
                              background: cellColor(grade, cell.n),
                              color: cellTextColor(grade, cell.n),
                            }}>
                            {cell.n === 0 ? '—' : metric === 'count' ? val : `${val}%`}
                          </div>
                        </td>
                      );
                    })}
                    <td className="px-3 py-2 text-center font-mono text-[12px] text-muted">{domain.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Domain strip */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {DOMAINS.map(d => (
              <div key={d.name} className="bg-surface border-[0.5px] border-border rounded-lg px-3 py-2">
                <div className="text-[11px] font-medium text-dark mb-1">{d.name}</div>
                <div className="flex gap-[3px]">
                  {GRADES.map(g => {
                    const cell = { Established: d.est, Probable: d.pro, Contested: d.con, Gap: d.gap }[g];
                    if (cell.n === 0) return null;
                    return (
                      <div key={g} title={`${g}: ${cell.n}`}
                        className="h-[6px] rounded-full"
                        style={{ width: `${Math.max(cell.pct, 5)}%`, maxWidth: '60%', background: GRADE_COLORS[g][2] }} />
                    );
                  })}
                </div>
                <div className="font-mono text-[9px] text-muted mt-1">{d.total} sessions</div>
              </div>
            ))}
          </div>

          <p className="font-mono text-[10px] text-[#C8C4BA] mt-4">
            Illustrative data · corpus accumulating from beta launch · augle.com
          </p>
        </div>

        {/* SIDEBAR — selected cell sessions */}
        {selectedCell && selectedDomain && (
          <div className="hidden lg:block w-[300px] flex-shrink-0 sticky top-[80px]">
            <div className="bg-surface border-[0.5px] border-border rounded-lg overflow-hidden">
              <div className="px-4 py-3 border-b-[0.5px] border-border bg-[#EAE6DC] flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-[0.06em] text-muted uppercase">
                  {selectedCell.domain} · {selectedCell.grade}
                </span>
                <button onClick={() => setSelectedCell(null)} className="text-muted text-[14px] cursor-pointer bg-transparent border-none hover:text-dark">✕</button>
              </div>
              <div className="p-4 border-b-[0.5px] border-border grid grid-cols-2 gap-3">
                <div>
                  <div className="font-mono text-[9px] text-muted uppercase mb-1">Augle Brier</div>
                  <div className="font-mono text-[16px] text-terracotta font-medium">{selectedDomain.brier.toFixed(3)}</div>
                </div>
                <div>
                  <div className="font-mono text-[9px] text-muted uppercase mb-1">Market Brier</div>
                  <div className="font-mono text-[16px] text-muted font-medium">{selectedDomain.mkt.toFixed(3)}</div>
                </div>
              </div>
              {selectedSessions.length === 0 ? (
                <div className="p-4 text-[12px] text-muted italic">No sessions in this cell.</div>
              ) : (
                <div className="flex flex-col divide-y-[0.5px] divide-border">
                  {selectedSessions.map((s, i) => (
                    <div key={i} className="p-4">
                      <p className="text-[12px] text-body leading-[1.4] mb-2 italic">"{s.q}"</p>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-[11px] text-terracotta font-medium">{s.conf}%</span>
                        {s.brier && <span className="font-mono text-[10px] text-muted">Brier {s.brier.toFixed(3)}</span>}
                        <span className="font-mono text-[10px] text-muted ml-auto">{s.time}</span>
                      </div>
                      {/* Mini agent bar */}
                      <div className="flex gap-[2px] mb-2">
                        {s.agents.map((pct, ai) => {
                          const agentColor = ai === 2 ? '#A05040' : pct >= 70 ? '#C15F3C' : '#8AAA9A';
                          const filled = Math.round(pct / 5);
                          return (
                            <div key={ai} className="flex flex-col gap-[1px]">
                              {Array.from({ length: 4 }, (_, j) => (
                                <div key={j} className="w-[6px] h-[3px] rounded-[1px]"
                                  style={{ background: j < Math.ceil(filled / 5) ? agentColor : '#C8C4BA' }} />
                              ))}
                            </div>
                          );
                        })}
                      </div>
                      {s.objection && (
                        <div className="bg-sand border-[0.5px] border-border rounded p-2">
                          <div className="font-mono text-[9px] text-terracotta uppercase mb-1">{s.objAgent}</div>
                          <p className="text-[11px] text-body leading-[1.4] italic">{s.objection}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
