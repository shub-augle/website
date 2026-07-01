'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

/* ─── Types ─── */
type Grade = 'Established' | 'Probable' | 'Contested' | 'Gap';
type Tier = 'Gold' | 'Silver';
type SortKey = 'recent' | 'conf-desc' | 'conf-asc' | 'brier-asc' | 'dissent-desc';

interface Session {
  domain: string;
  q: string;
  grade: Grade;
  conf: number;
  brier: number | null;
  tier: Tier;
  time: string;
  dissent: number;
  agents: number[];
}

/* ─── Data ─── */
const SESSIONS: Session[] = [
  { domain: 'Life sciences', q: 'Is statin therapy effective for reducing LDL cholesterol?', grade: 'Established', conf: 97, brier: 0.014, tier: 'Gold', time: '2w ago', dissent: 0, agents: [96,98,82,97,96] },
  { domain: 'Climate', q: 'Does greenhouse gas emissions from fossil fuels contribute to atmospheric CO2 increase?', grade: 'Established', conf: 97, brier: 0.010, tier: 'Gold', time: '2w ago', dissent: 0, agents: [96,98,84,97,96] },
  { domain: 'Climate', q: 'Is the global average temperature rising due to human activity?', grade: 'Established', conf: 98, brier: 0.008, tier: 'Gold', time: '1w ago', dissent: 0, agents: [97,99,89,98,98] },
  { domain: 'Life sciences', q: 'Does aspirin reduce cardiovascular risk in secondary prevention populations?', grade: 'Established', conf: 94, brier: 0.022, tier: 'Gold', time: '1w ago', dissent: 0, agents: [92,96,78,94,91] },
  { domain: 'Economics', q: 'Does compound interest growth outpace simple interest over 10+ years?', grade: 'Established', conf: 96, brier: 0.018, tier: 'Gold', time: '5d ago', dissent: 0, agents: [94,97,88,96,95] },
  { domain: 'Finance', q: 'Does diversification reduce portfolio volatility across asset classes?', grade: 'Established', conf: 94, brier: 0.021, tier: 'Gold', time: '1w ago', dissent: 0, agents: [92,96,80,94,92] },
  { domain: 'Economics', q: 'Does aspirin reduce cardiovascular events in primary prevention?', grade: 'Established', conf: 91, brier: 0.031, tier: 'Gold', time: '3d ago', dissent: 1, agents: [88,92,74,91,88] },
  { domain: 'Policy', q: 'Does raising the minimum wage increase employment costs for small businesses?', grade: 'Established', conf: 88, brier: 0.044, tier: 'Gold', time: '1w ago', dissent: 0, agents: [86,91,74,88,85] },
  { domain: 'Technology', q: 'Does transformer scaling improve performance when training compute is doubled?', grade: 'Established', conf: 91, brier: 0.032, tier: 'Gold', time: '2w ago', dissent: 0, agents: [89,94,76,91,88] },
  { domain: 'Life sciences', q: 'Will a GLP-1 drug receive FDA approval for heart disease prevention by 2027?', grade: 'Probable', conf: 83, brier: 0.031, tier: 'Gold', time: '14h ago', dissent: 0, agents: [86,90,67,88,82] },
  { domain: 'Policy', q: 'Will the Fed cut rates at least twice in 2026?', grade: 'Probable', conf: 78, brier: 0.049, tier: 'Gold', time: '4h ago', dissent: 1, agents: [82,85,41,88,76] },
  { domain: 'Technology', q: 'Will LLMs surpass human performance on the MMLU benchmark by 2026?', grade: 'Probable', conf: 74, brier: 0.068, tier: 'Gold', time: '2d ago', dissent: 1, agents: [78,70,58,80,72] },
  { domain: 'Policy', q: 'Will the EU carbon border adjustment survive legal challenge before 2027?', grade: 'Probable', conf: 72, brier: 0.063, tier: 'Gold', time: '1d ago', dissent: 0, agents: [76,70,58,78,68] },
  { domain: 'Economics', q: 'Will US inflation fall below 2.5% before year-end 2026?', grade: 'Probable', conf: 71, brier: 0.071, tier: 'Gold', time: '10h ago', dissent: 0, agents: [74,68,55,80,77] },
  { domain: 'Climate', q: 'Will renewables account for more than 50% of global electricity generation by 2030?', grade: 'Probable', conf: 64, brier: 0.089, tier: 'Silver', time: '5d ago', dissent: 1, agents: [68,62,50,70,62] },
  { domain: 'Economics', q: 'Will the ECB cut rates before the Fed in 2026?', grade: 'Probable', conf: 64, brier: 0.088, tier: 'Gold', time: '1d ago', dissent: 1, agents: [68,62,48,72,60] },
  { domain: 'Finance', q: 'Will the S&P 500 be higher at year-end 2026 than at year-end 2025?', grade: 'Probable', conf: 67, brier: 0.082, tier: 'Gold', time: '12h ago', dissent: 1, agents: [70,64,52,72,66] },
  { domain: 'Geopolitics', q: 'Will there be a major escalation in the Middle East conflict before Q3 2026?', grade: 'Probable', conf: 61, brier: 0.094, tier: 'Gold', time: '6h ago', dissent: 2, agents: [64,58,52,66,62] },
  { domain: 'AI governance', q: 'Will the EU AI Act enforcement actions begin in 2026?', grade: 'Probable', conf: 68, brier: 0.078, tier: 'Gold', time: '2d ago', dissent: 0, agents: [72,64,54,74,66] },
  { domain: 'Life sciences', q: 'Does metformin extend healthy lifespan in non-diabetic populations?', grade: 'Probable', conf: 58, brier: 0.089, tier: 'Silver', time: '2d ago', dissent: 2, agents: [62,54,44,66,58] },
  { domain: 'Finance', q: 'Will AI infrastructure capex produce a capital allocation correction within 18 months?', grade: 'Contested', conf: 44, brier: 0.149, tier: 'Gold', time: '5h ago', dissent: 2, agents: [48,40,62,50,44] },
  { domain: 'Climate', q: 'Will carbon capture and storage become economically viable at scale before 2035?', grade: 'Contested', conf: 42, brier: 0.118, tier: 'Silver', time: '4d ago', dissent: 2, agents: [46,38,56,44,42] },
  { domain: 'Technology', q: 'Will AGI be declared achieved by any major lab before 2028?', grade: 'Contested', conf: 41, brier: 0.112, tier: 'Gold', time: '6h ago', dissent: 3, agents: [44,22,61,48,19] },
  { domain: 'Geopolitics', q: 'Will a significant military incident occur in the Taiwan Strait in 2026?', grade: 'Contested', conf: 34, brier: 0.082, tier: 'Gold', time: '1d ago', dissent: 2, agents: [38,29,58,34,31] },
  { domain: 'Economics', q: 'Will the US enter a recession by Q4 2026?', grade: 'Contested', conf: 62, brier: 0.112, tier: 'Gold', time: '2h ago', dissent: 2, agents: [68,72,31,79,65] },
  { domain: 'Policy', q: 'Will Congress pass a federal AI regulation bill before 2027?', grade: 'Contested', conf: 29, brier: 0.138, tier: 'Gold', time: '8h ago', dissent: 3, agents: [25,18,52,30,40] },
  { domain: 'Technology', q: 'Will AI replace more than 20% of white-collar jobs by 2030?', grade: 'Contested', conf: 38, brier: 0.128, tier: 'Silver', time: '1d ago', dissent: 3, agents: [42,34,54,44,38] },
  { domain: 'Life sciences', q: 'Does the GLP-1 evidence support long-term weight maintenance without continued dosing?', grade: 'Contested', conf: 24, brier: null, tier: 'Silver', time: '2d ago', dissent: 4, agents: [28,20,72,24,22] },
  { domain: 'Economics', q: 'Will EU economy outperform US in 2026?', grade: 'Gap', conf: 18, brier: 0.149, tier: 'Gold', time: '3d ago', dissent: 3, agents: [20,15,61,18,16] },
  { domain: 'Finance', q: 'What is the optimal portfolio allocation for a 30-year investment horizon?', grade: 'Gap', conf: 11, brier: null, tier: 'Silver', time: '3d ago', dissent: 3, agents: [14,9,68,12,11] },
  { domain: 'Geopolitics', q: 'Will the US-China relationship become cooperative rather than competitive by 2035?', grade: 'Gap', conf: 11, brier: null, tier: 'Silver', time: '5d ago', dissent: 3, agents: [14,9,72,12,10] },
];

const DOMAINS = ['All domains', 'Economics', 'Technology', 'Policy', 'Geopolitics', 'Life sciences', 'Finance', 'Climate', 'AI governance'];
const DOMAIN_COUNTS: Record<string, number> = { 'All domains': 247, Economics: 51, Technology: 47, Policy: 38, Geopolitics: 41, 'Life sciences': 34, Finance: 29, Climate: 22, 'AI governance': 18 };

const gradeStyle: Record<Grade, string> = {
  Established: 'bg-[#D9F0E4] text-[#2A7050]',
  Probable: 'bg-[#D4E4F5] text-[#2A4A7A]',
  Contested: 'bg-[#F5E8C8] text-[#8A5A1A]',
  Gap: 'bg-[#F5D8D8] text-[#8A1818]',
};

const gradeColors: Record<Grade, string> = {
  Established: '#3AAA72',
  Probable: '#6A9AAA',
  Contested: '#C79233',
  Gap: '#C15F3C',
};

const INDEX_SUBNAV = [
  { href: '/index', label: 'Overview' },
  { href: '/index/explorer', label: 'Question explorer', active: true },
  { href: '/index/heatmap', label: 'Heatmaps' },
  { href: '/index/methodology', label: 'Methodology' },
];

export default function IndexExplorerPage() {
  const [search, setSearch] = useState('');
  const [domain, setDomain] = useState('All domains');
  const [grade, setGrade] = useState<Grade | 'All'>('All');
  const [tier, setTier] = useState<Tier | 'All'>('All');
  const [sort, setSort] = useState<SortKey>('recent');

  const filtered = useMemo(() => {
    let s = SESSIONS.filter(row => {
      if (search && !row.q.toLowerCase().includes(search.toLowerCase())) return false;
      if (domain !== 'All domains' && row.domain !== domain) return false;
      if (grade !== 'All' && row.grade !== grade) return false;
      if (tier !== 'All' && row.tier !== tier) return false;
      return true;
    });
    if (sort === 'conf-desc') s = [...s].sort((a, b) => b.conf - a.conf);
    if (sort === 'conf-asc') s = [...s].sort((a, b) => a.conf - b.conf);
    if (sort === 'brier-asc') s = [...s].sort((a, b) => (a.brier ?? 99) - (b.brier ?? 99));
    if (sort === 'dissent-desc') s = [...s].sort((a, b) => b.dissent - a.dissent);
    return s;
  }, [search, domain, grade, tier, sort]);

  return (
    <div className="bg-sand min-h-screen">
      <Nav activeRoute="/index" />

      {/* PAGE HEADER */}
      <div className="bg-dark border-b-[0.5px] border-[#49443F] px-4 lg:px-[72px] py-8">
        <div className="max-w-[1280px] mx-auto">
          <div className="font-mono text-[10px] tracking-[0.08em] text-[#6A645E] uppercase mb-1">Augle Deliberation Index</div>
          <h1 className="font-serif text-[32px] lg:text-[44px] font-normal text-white mb-1">Question explorer</h1>
          <p className="text-[14px] text-[#6A645E]">Search and filter every deliberation session · Illustrative data</p>
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
      <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-6 flex gap-6 items-start">

        {/* FILTER PANEL */}
        <div className="hidden lg:block w-[220px] flex-shrink-0 bg-surface border-[0.5px] border-border rounded-lg overflow-hidden sticky top-[80px]">
          {/* Search */}
          <div className="p-4 border-b-[0.5px] border-border">
            <div className="font-mono text-[10px] tracking-[0.06em] text-muted uppercase mb-2">Search</div>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search questions..."
              className="w-full text-[12px] px-3 py-2 border-[0.5px] border-border rounded bg-sand placeholder:text-muted outline-none focus:border-terracotta" />
          </div>

          {/* Domain */}
          <div className="p-4 border-b-[0.5px] border-border">
            <div className="font-mono text-[10px] tracking-[0.06em] text-muted uppercase mb-2">Domain</div>
            <div className="flex flex-col gap-1">
              {DOMAINS.map(d => (
                <button key={d} onClick={() => setDomain(d)}
                  className={`flex items-center justify-between text-[12px] px-2 py-[5px] rounded cursor-pointer border-none text-left transition-colors ${domain === d ? 'bg-dark text-white' : 'bg-transparent text-body hover:bg-[#EAE6DC]'}`}>
                  <span>{d}</span>
                  <span className={`font-mono text-[10px] ${domain === d ? 'text-[#6A645E]' : 'text-muted'}`}>{DOMAIN_COUNTS[d]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Grade */}
          <div className="p-4 border-b-[0.5px] border-border">
            <div className="font-mono text-[10px] tracking-[0.06em] text-muted uppercase mb-2">Confidence grade</div>
            <div className="flex flex-col gap-1">
              {(['All', 'Established', 'Probable', 'Contested', 'Gap'] as const).map(g => (
                <button key={g} onClick={() => setGrade(g)}
                  className={`flex items-center gap-2 text-[12px] px-2 py-[5px] rounded cursor-pointer border-none text-left transition-colors ${grade === g ? 'bg-dark text-white' : 'bg-transparent text-body hover:bg-[#EAE6DC]'}`}>
                  {g !== 'All' && <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: gradeColors[g as Grade] }} />}
                  {g === 'All' ? 'All grades' : g}
                </button>
              ))}
            </div>
          </div>

          {/* Tier */}
          <div className="p-4 border-b-[0.5px] border-border">
            <div className="font-mono text-[10px] tracking-[0.06em] text-muted uppercase mb-2">Corpus tier</div>
            <div className="flex gap-2">
              {(['All', 'Gold', 'Silver'] as const).map(t => (
                <button key={t} onClick={() => setTier(t)}
                  className={`font-mono text-[10px] px-3 py-[5px] rounded border-[0.5px] cursor-pointer transition-colors ${tier === t ? 'bg-dark text-white border-dark' : 'bg-sand text-body border-border hover:border-dark'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className="p-4 border-b-[0.5px] border-border">
            <div className="font-mono text-[10px] tracking-[0.06em] text-muted uppercase mb-2">Sort by</div>
            <select value={sort} onChange={e => setSort(e.target.value as SortKey)}
              className="w-full text-[12px] px-2 py-[6px] border-[0.5px] border-border rounded bg-sand text-body outline-none cursor-pointer">
              <option value="recent">Most recent</option>
              <option value="conf-desc">Confidence ↓</option>
              <option value="conf-asc">Confidence ↑</option>
              <option value="brier-asc">Brier score ↑</option>
              <option value="dissent-desc">Most dissent</option>
            </select>
          </div>

          <div className="p-4">
            <button onClick={() => { setSearch(''); setDomain('All domains'); setGrade('All'); setTier('All'); setSort('recent'); }}
              className="font-mono text-[11px] text-terracotta cursor-pointer bg-transparent border-none hover:underline">
              Clear all filters
            </button>
          </div>
        </div>

        {/* RESULTS PANEL */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-4">
            <div className="font-mono text-[12px] text-muted">
              Showing <span className="text-dark font-medium">{filtered.length}</span> of 247 sessions · Illustrative data
            </div>
          </div>

          {/* Results table */}
          <div className="bg-surface border-[0.5px] border-border rounded-lg overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-[1fr_90px_80px_70px_55px_60px] gap-0 bg-[#EAE6DC] px-4 py-2 border-b-[0.5px] border-border">
              {['Question', 'Grade', 'Confidence', 'Brier', 'Tier', 'Time'].map(h => (
                <span key={h} className="font-mono text-[9px] tracking-[0.06em] text-muted uppercase">{h}</span>
              ))}
            </div>

            {filtered.length === 0 ? (
              <div className="px-4 py-12 text-center font-mono text-[12px] text-muted">No sessions match the current filters.</div>
            ) : (
              <div className="flex flex-col divide-y-[0.5px] divide-border">
                {filtered.map((row, i) => (
                  <Link key={i} href={`/outcomes/${row.q.slice(0, 20).toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                    className="grid grid-cols-[1fr_90px_80px_70px_55px_60px] gap-0 items-center px-4 py-3 hover:bg-[#EAE6DC]/50 transition-colors no-underline">
                    <div>
                      <div className="font-mono text-[9px] tracking-[0.04em] text-muted uppercase mb-[2px]">{row.domain}</div>
                      <p className="text-[12px] text-body leading-[1.4] pr-2">{row.q}</p>
                    </div>
                    <div>
                      <span className={`font-mono text-[9px] px-[6px] py-[2px] rounded-[3px] ${gradeStyle[row.grade]}`}>{row.grade}</span>
                    </div>
                    <div className="font-mono text-[13px] font-medium" style={{ color: gradeColors[row.grade] }}>{row.conf}%</div>
                    <div className="font-mono text-[12px] text-muted">{row.brier ? row.brier.toFixed(3) : '—'}</div>
                    <div>
                      <span className={`font-mono text-[9px] px-[5px] py-[2px] rounded-[3px] border-[0.5px] ${row.tier === 'Gold' ? 'text-terracotta border-terracotta bg-[#FBF5F2]' : 'text-muted border-border bg-[#EAE6DC]'}`}>
                        {row.tier}
                      </span>
                    </div>
                    <div className="font-mono text-[11px] text-muted">{row.time}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
