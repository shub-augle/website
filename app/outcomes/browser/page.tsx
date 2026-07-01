'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import WaffleGrid, { WaffleAgent } from '@/components/WaffleGrid';

/* ─── Types ─── */
type Mode = 'running' | 'resolved';
type Grade = 'Established' | 'Probable' | 'Contested' | 'Gap';

interface AgentData {
  name: string;
  initials: string;
  model: string;
  color: string;
  pct: number;
}

interface GuardianDetail {
  source: number;
  bias: number;
  consistency: number;
  scope: number;
}

interface SessionData {
  id: string;
  category: string;
  active: boolean;
  question: string;
  conf: number;
  badge: 'high' | 'mod' | 'running';
  badgeText: string;
  guardian: number;
  time: string;
  brier: number | null;
  mktBrier: number | null;
  grade: Grade;
  agents: AgentData[];
  flags: { text: string; agent: string }[];
  guardian_detail: GuardianDetail;
}

/* ─── Data ─── */
const ACTIVE_SESSIONS: SessionData[] = [
  {
    id: 'fed-rate-2026', category: 'Economics', active: true,
    question: 'Will the Fed cut rates at least twice in 2026?',
    conf: 78, badge: 'running', badgeText: 'Running',
    guardian: 94, time: 'Running · 14m', brier: null, mktBrier: null, grade: 'Probable',
    agents: [
      { name: 'Cartographer', initials: 'CA', model: 'Gemini 3.1 Pro', color: '#C15F3C', pct: 82 },
      { name: 'Methodologist', initials: 'ME', model: 'GPT-4o', color: '#C15F3C', pct: 85 },
      { name: 'Contrarian', initials: 'CO', model: 'Claude Sonnet 4.6', color: '#A05040', pct: 41 },
      { name: 'Synthesizer', initials: 'SY', model: 'GPT-4o', color: '#C15F3C', pct: 88 },
      { name: 'Pragmatist', initials: 'PR', model: 'Grok 4.1 Fast', color: '#C15F3C', pct: 76 },
    ],
    flags: [{ text: 'Fed communication signals have been inconsistent across the last three FOMC meetings — dot-plot interpretation has higher variance than acknowledged', agent: 'Contrarian' }],
    guardian_detail: { source: 95, bias: 92, consistency: 94, scope: 96 },
  },
  {
    id: 'glp1-fda-2027', category: 'Life sciences', active: true,
    question: 'Will a GLP-1 drug receive FDA approval for heart disease prevention by 2027?',
    conf: 67, badge: 'running', badgeText: 'Running',
    guardian: 91, time: 'Running · 9m', brier: null, mktBrier: null, grade: 'Probable',
    agents: [
      { name: 'Cartographer', initials: 'CA', model: 'Gemini 3.1 Pro', color: '#C15F3C', pct: 71 },
      { name: 'Methodologist', initials: 'ME', model: 'GPT-4o', color: '#8AAA9A', pct: 58 },
      { name: 'Contrarian', initials: 'CO', model: 'Claude Sonnet 4.6', color: '#A05040', pct: 35 },
      { name: 'Synthesizer', initials: 'SY', model: 'GPT-4o', color: '#C15F3C', pct: 72 },
      { name: 'Pragmatist', initials: 'PR', model: 'Grok 4.1 Fast', color: '#C15F3C', pct: 68 },
    ],
    flags: [{ text: 'Trial population and FDA indication scope are narrower than the claim implies — external validity requires qualification', agent: 'Contrarian' }],
    guardian_detail: { source: 92, bias: 89, consistency: 91, scope: 93 },
  },
  {
    id: 'apple-ar-2026', category: 'Technology', active: true,
    question: 'Will Apple release an AR headset for under $2,000 before year-end 2026?',
    conf: 61, badge: 'running', badgeText: 'Running',
    guardian: 88, time: 'Running · 22m', brier: null, mktBrier: null, grade: 'Contested',
    agents: [
      { name: 'Cartographer', initials: 'CA', model: 'Gemini 3.1 Pro', color: '#C15F3C', pct: 65 },
      { name: 'Methodologist', initials: 'ME', model: 'GPT-4o', color: '#8AAA9A', pct: 52 },
      { name: 'Contrarian', initials: 'CO', model: 'Claude Sonnet 4.6', color: '#A05040', pct: 38 },
      { name: 'Synthesizer', initials: 'SY', model: 'GPT-4o', color: '#C15F3C', pct: 63 },
      { name: 'Pragmatist', initials: 'PR', model: 'Grok 4.1 Fast', color: '#8AAA9A', pct: 55 },
    ],
    flags: [{ text: 'Supply chain constraints and BOM estimates suggest the $2,000 price point is structurally difficult before Q4 2026 given current component costs', agent: 'Contrarian' }],
    guardian_detail: { source: 88, bias: 86, consistency: 90, scope: 87 },
  },
];

const RESOLVED_SESSIONS: SessionData[] = [
  {
    id: 'us-cpi-2026', category: 'Economics', active: false,
    question: 'Will US CPI fall below 2.5% before year-end 2026?',
    conf: 71, badge: 'mod', badgeText: 'Moderate confidence',
    guardian: 92, time: '2d ago', brier: 0.074, mktBrier: 0.108, grade: 'Probable',
    agents: [
      { name: 'Cartographer', initials: 'CA', model: 'Gemini 3.1 Pro', color: '#C15F3C', pct: 74 },
      { name: 'Methodologist', initials: 'ME', model: 'GPT-4o', color: '#C15F3C', pct: 76 },
      { name: 'Contrarian', initials: 'CO', model: 'Claude Sonnet 4.6', color: '#A05040', pct: 38 },
      { name: 'Synthesizer', initials: 'SY', model: 'GPT-4o', color: '#C15F3C', pct: 79 },
      { name: 'Pragmatist', initials: 'PR', model: 'Grok 4.1 Fast', color: '#C15F3C', pct: 68 },
    ],
    flags: [{ text: 'Core services inflation remains sticky — shelter and medical services components have not responded to headline CPI trajectory', agent: 'Contrarian' }],
    guardian_detail: { source: 93, bias: 91, consistency: 92, scope: 94 },
  },
  {
    id: 'nato-defence-2026', category: 'Geopolitics', active: false,
    question: 'Will NATO members collectively reach 2% GDP defence spending by June 2026?',
    conf: 55, badge: 'mod', badgeText: 'Contested',
    guardian: 89, time: '5d ago', brier: 0.103, mktBrier: 0.121, grade: 'Contested',
    agents: [
      { name: 'Cartographer', initials: 'CA', model: 'Gemini 3.1 Pro', color: '#8AAA9A', pct: 58 },
      { name: 'Methodologist', initials: 'ME', model: 'GPT-4o', color: '#8AAA9A', pct: 52 },
      { name: 'Contrarian', initials: 'CO', model: 'Claude Sonnet 4.6', color: '#A05040', pct: 31 },
      { name: 'Synthesizer', initials: 'SY', model: 'GPT-4o', color: '#8AAA9A', pct: 60 },
      { name: 'Pragmatist', initials: 'PR', model: 'Grok 4.1 Fast', color: '#8AAA9A', pct: 54 },
    ],
    flags: [{ text: 'Italy and Spain remain structurally below threshold — domestic political constraints make near-term compliance improbable without treaty changes', agent: 'Contrarian' }],
    guardian_detail: { source: 89, bias: 88, consistency: 87, scope: 90 },
  },
  {
    id: 'openai-gpt5-2026', category: 'Technology', active: false,
    question: 'Will OpenAI release GPT-5 before mid-2026?',
    conf: 83, badge: 'high', badgeText: 'High confidence',
    guardian: 96, time: '1w ago', brier: 0.049, mktBrier: 0.088, grade: 'Probable',
    agents: [
      { name: 'Cartographer', initials: 'CA', model: 'Gemini 3.1 Pro', color: '#C15F3C', pct: 87 },
      { name: 'Methodologist', initials: 'ME', model: 'GPT-4o', color: '#C15F3C', pct: 82 },
      { name: 'Contrarian', initials: 'CO', model: 'Claude Sonnet 4.6', color: '#A05040', pct: 44 },
      { name: 'Synthesizer', initials: 'SY', model: 'GPT-4o', color: '#C15F3C', pct: 89 },
      { name: 'Pragmatist', initials: 'PR', model: 'Grok 4.1 Fast', color: '#C15F3C', pct: 81 },
    ],
    flags: [{ text: 'Regulatory scrutiny from EU AI Act implementation could create external timeline pressure not reflected in current evidence', agent: 'Contrarian' }],
    guardian_detail: { source: 96, bias: 95, consistency: 97, scope: 96 },
  },
  {
    id: 'us-recession-2026', category: 'Economics', active: false,
    question: 'Will the US enter a recession by Q4 2026?',
    conf: 38, badge: 'mod', badgeText: 'Contested',
    guardian: 88, time: '1w ago', brier: 0.118, mktBrier: 0.142, grade: 'Contested',
    agents: [
      { name: 'Cartographer', initials: 'CA', model: 'Gemini 3.1 Pro', color: '#8AAA9A', pct: 42 },
      { name: 'Methodologist', initials: 'ME', model: 'GPT-4o', color: '#8AAA9A', pct: 36 },
      { name: 'Contrarian', initials: 'CO', model: 'Claude Sonnet 4.6', color: '#A05040', pct: 58 },
      { name: 'Synthesizer', initials: 'SY', model: 'GPT-4o', color: '#8AAA9A', pct: 40 },
      { name: 'Pragmatist', initials: 'PR', model: 'Grok 4.1 Fast', color: '#8AAA9A', pct: 38 },
    ],
    flags: [
      { text: 'Labor market lag effects are typically 6–9 months — current NFP data may not yet reflect underlying demand deterioration', agent: 'Contrarian' },
      { text: 'Inverted yield curve duration now exceeds historical recession-preceding threshold for 7 of 8 prior US recessions', agent: 'Contrarian' },
    ],
    guardian_detail: { source: 89, bias: 86, consistency: 88, scope: 90 },
  },
  {
    id: 'eu-carbon-2027', category: 'Policy', active: false,
    question: 'Will the EU carbon border adjustment mechanism survive legal challenge before 2027?',
    conf: 72, badge: 'high', badgeText: 'High confidence',
    guardian: 93, time: '2w ago', brier: 0.063, mktBrier: 0.102, grade: 'Probable',
    agents: [
      { name: 'Cartographer', initials: 'CA', model: 'Gemini 3.1 Pro', color: '#C15F3C', pct: 76 },
      { name: 'Methodologist', initials: 'ME', model: 'GPT-4o', color: '#C15F3C', pct: 70 },
      { name: 'Contrarian', initials: 'CO', model: 'Claude Sonnet 4.6', color: '#8AAA9A', pct: 58 },
      { name: 'Synthesizer', initials: 'SY', model: 'GPT-4o', color: '#C15F3C', pct: 78 },
      { name: 'Pragmatist', initials: 'PR', model: 'Grok 4.1 Fast', color: '#C15F3C', pct: 68 },
    ],
    flags: [],
    guardian_detail: { source: 94, bias: 93, consistency: 92, scope: 94 },
  },
  {
    id: 'taiwan-2026', category: 'Geopolitics', active: false,
    question: 'Will a significant military incident occur in the Taiwan Strait in 2026?',
    conf: 34, badge: 'mod', badgeText: 'Contested',
    guardian: 89, time: '3w ago', brier: 0.082, mktBrier: 0.119, grade: 'Contested',
    agents: [
      { name: 'Cartographer', initials: 'CA', model: 'Gemini 3.1 Pro', color: '#8AAA9A', pct: 38 },
      { name: 'Methodologist', initials: 'ME', model: 'GPT-4o', color: '#A05040', pct: 29 },
      { name: 'Contrarian', initials: 'CO', model: 'Claude Sonnet 4.6', color: '#C15F3C', pct: 58 },
      { name: 'Synthesizer', initials: 'SY', model: 'GPT-4o', color: '#8AAA9A', pct: 34 },
      { name: 'Pragmatist', initials: 'PR', model: 'Grok 4.1 Fast', color: '#A05040', pct: 31 },
    ],
    flags: [
      { text: 'Definition of "significant military incident" is underspecified — resolution criteria are ambiguous across cited precedents', agent: 'Methodologist' },
      { text: 'Historical base rate for Taiwan Strait escalation within a 12-month window is not adequately weighted in the probability estimate', agent: 'Contrarian' },
    ],
    guardian_detail: { source: 90, bias: 88, consistency: 87, scope: 91 },
  },
];

const CATEGORIES = ['All', 'Economics', 'Technology', 'Policy', 'Life sciences', 'Geopolitics'];

/* ─── Helpers ─── */
const gradeStyle: Record<Grade, string> = {
  Established: 'bg-[#D9F0E4] text-[#2A7050]',
  Probable: 'bg-[#D4E4F5] text-[#2A4A7A]',
  Contested: 'bg-[#F5E8C8] text-[#8A5A1A]',
  Gap: 'bg-[#F5D8D8] text-[#8A1818]',
};

const badgeStyle: Record<string, string> = {
  high: 'bg-[#D9F0E4] text-[#2A7050]',
  mod: 'bg-[#F5E8C8] text-[#8A5A1A]',
  running: 'bg-[#1E1C1A] text-white',
};

function GuardianBar({ pct, label }: { pct: number; label: string }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px] text-body capitalize">{label}</span>
        <span className="font-mono text-[11px] text-dark">{pct}%</span>
      </div>
      <div className="h-[4px] bg-[#EAE6DC] rounded-full overflow-hidden">
        <div className="h-full bg-[#3AAA72] rounded-full" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

/* ─── Sidebar ─── */
function Sidebar({ session, onClose }: { session: SessionData; onClose: () => void }) {
  const waffleAgents: WaffleAgent[] = session.agents.map(a => ({
    name: a.name,
    pct: a.pct,
    color: a.color,
  }));

  return (
    <div className="w-[300px] flex-shrink-0 flex flex-col gap-3 sticky top-[80px]">
      {/* Header */}
      <div className="bg-surface border-[0.5px] border-border rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b-[0.5px] border-border bg-[#EAE6DC] flex items-start justify-between gap-3">
          <div>
            <div className="font-mono text-[9px] tracking-[0.06em] text-muted uppercase mb-1">{session.category} · {session.time}</div>
            <p className="text-[12px] text-dark leading-[1.4] font-medium">{session.question}</p>
          </div>
          <button onClick={onClose} className="text-muted hover:text-dark text-[14px] flex-shrink-0 cursor-pointer bg-transparent border-none">✕</button>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 divide-x-[0.5px] divide-border border-b-[0.5px] border-border">
          <div className="px-3 py-3 text-center">
            <div className="font-mono text-[14px] font-medium text-dark">{session.conf}%</div>
            <div className="font-mono text-[9px] text-muted uppercase mt-[2px]">Confidence</div>
          </div>
          <div className="px-3 py-3 text-center">
            <div className={`font-mono text-[14px] font-medium ${session.guardian >= 90 ? 'text-[#3AAA72]' : 'text-[#8A5A1A]'}`}>{session.guardian}%</div>
            <div className="font-mono text-[9px] text-muted uppercase mt-[2px]">Guardian</div>
          </div>
          <div className="px-3 py-3 text-center">
            <span className={`font-mono text-[10px] px-1 py-[2px] rounded-[3px] ${gradeStyle[session.grade]}`}>{session.grade}</span>
            <div className="font-mono text-[9px] text-muted uppercase mt-[3px]">Grade</div>
          </div>
        </div>

        {/* Waffle */}
        <div className="px-4 py-4 border-b-[0.5px] border-border">
          <div className="font-mono text-[9px] tracking-[0.06em] text-muted uppercase mb-3">Agent confidence scores</div>
          <WaffleGrid agents={waffleAgents} isActive={session.active} />
          <div className="flex flex-col gap-[6px] mt-3">
            {session.agents.map(agent => (
              <div key={agent.name} className="flex items-center gap-2">
                <div className="w-[6px] h-[6px] rounded-full flex-shrink-0" style={{ background: agent.color }} />
                <span className="text-[11px] text-body flex-1">{agent.name}</span>
                <span className="font-mono text-[11px]" style={{ color: agent.color }}>{agent.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Guardian detail */}
        <div className="px-4 py-4 border-b-[0.5px] border-border">
          <div className="font-mono text-[9px] tracking-[0.06em] text-muted uppercase mb-3">Guardian integrity · {session.guardian}%</div>
          <div className="flex flex-col gap-3">
            <GuardianBar pct={session.guardian_detail.source} label="Source quality" />
            <GuardianBar pct={session.guardian_detail.bias} label="Bias screening" />
            <GuardianBar pct={session.guardian_detail.consistency} label="Consistency" />
            <GuardianBar pct={session.guardian_detail.scope} label="Scope adherence" />
          </div>
        </div>

        {/* Brier scores — resolved only */}
        {!session.active && session.brier !== null && (
          <div className="px-4 py-4 border-b-[0.5px] border-border grid grid-cols-2 gap-3">
            <div>
              <div className="font-mono text-[9px] text-muted uppercase mb-1">Augle Brier</div>
              <div className="font-mono text-[18px] text-terracotta font-medium">{session.brier.toFixed(3)}</div>
            </div>
            <div>
              <div className="font-mono text-[9px] text-muted uppercase mb-1">Market Brier</div>
              <div className="font-mono text-[18px] text-muted font-medium">{session.mktBrier?.toFixed(3)}</div>
            </div>
          </div>
        )}

        {/* Flags */}
        {session.flags.length > 0 && (
          <div className="px-4 py-4 border-b-[0.5px] border-border">
            <div className="font-mono text-[9px] tracking-[0.06em] text-muted uppercase mb-3">
              Unresolved objections · {session.flags.length}
            </div>
            <div className="flex flex-col gap-2">
              {session.flags.map(({ text, agent }) => (
                <div key={text} className="bg-sand border-[0.5px] border-border rounded p-2">
                  <div className="font-mono text-[9px] text-terracotta uppercase mb-1">{agent}</div>
                  <p className="text-[11px] text-body leading-[1.4]">{text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View full session */}
        <div className="px-4 py-3">
          <Link href={`/outcomes/${session.id}`}
            className="block w-full font-mono text-[11px] text-center text-terracotta border-[0.5px] border-terracotta rounded px-3 py-2 hover:bg-terracotta hover:text-white transition-colors no-underline">
            View full session record →
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── Card ─── */
function SessionCard({
  session, isSelected, onSelect,
}: {
  session: SessionData;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const waffleAgents: WaffleAgent[] = session.agents.map(a => ({
    name: a.name,
    pct: a.pct,
    color: a.color,
  }));

  return (
    <div
      onClick={onSelect}
      className={`bg-surface border-[0.5px] rounded-lg overflow-hidden cursor-pointer transition-colors flex flex-col ${isSelected ? 'border-terracotta' : 'border-border hover:border-terracotta/50'}`}>
      {/* Card top */}
      <div className="px-4 py-4 flex-1">
        <div className="font-mono text-[9px] tracking-[0.06em] text-muted uppercase mb-1">{session.category}</div>
        <p className="text-[13px] text-dark leading-[1.45] mb-3">{session.question}</p>
        <WaffleGrid agents={waffleAgents} isActive={session.active} />
      </div>

      {/* Card footer */}
      <div className="px-4 py-2 border-t-[0.5px] border-border flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className={`font-mono text-[9px] px-[6px] py-[2px] rounded-[3px] ${badgeStyle[session.badge]}`}>
            {session.active && <span className="inline-block w-[5px] h-[5px] rounded-full bg-terracotta mr-1 align-middle" />}
            {session.badgeText}
          </span>
          <span className="font-mono text-[9px] text-muted">{session.time}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-10 h-[3px] bg-[#EAE6DC] rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{
              width: `${session.guardian}%`,
              background: session.guardian >= 90 ? '#3AAA72' : '#C15F3C',
            }} />
          </div>
          <span className="font-mono text-[9px] text-muted">{session.guardian}%</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Page ─── */
export default function OutcomesBrowserPage() {
  const [mode, setMode] = useState<Mode>('running');
  const [category, setCategory] = useState('All');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const sessions = mode === 'running' ? ACTIVE_SESSIONS : RESOLVED_SESSIONS;
  const filtered = category === 'All' ? sessions : sessions.filter(s => s.category === category);
  const selected = filtered.find(s => s.id === selectedId) ?? null;

  // Clear selection when mode or category changes if selected not in filtered
  useEffect(() => {
    if (selectedId && !filtered.find(s => s.id === selectedId)) {
      setSelectedId(null);
    }
  }, [mode, category, filtered, selectedId]);

  const runningCount = ACTIVE_SESSIONS.length;
  const resolvedCount = RESOLVED_SESSIONS.length;

  return (
    <div className="bg-sand min-h-screen">
      <Nav activeRoute="/outcomes" />

      {/* PAGE HEADER */}
      <div className="bg-dark border-b-[0.5px] border-[#49443F] px-4 lg:px-[72px] py-7">
        <div className="max-w-[1280px] mx-auto">
          <div className="font-mono text-[9px] tracking-[0.08em] text-[#6A645E] uppercase mb-1">Public deliberations</div>
          <h1 className="font-serif text-[32px] lg:text-[44px] font-normal text-white leading-tight mb-1">Outcomes</h1>
          <p className="text-[13px] text-[#6A645E]">Seven-agent ensemble sessions — confidence grades, agent scores, Guardian integrity · Illustrative data</p>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="bg-surface border-b-[0.5px] border-border sticky top-16 z-10">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] flex items-center justify-between py-3 gap-4 flex-wrap">
          {/* Category tabs */}
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`font-mono text-[11px] px-3 py-[5px] rounded border-[0.5px] cursor-pointer transition-colors ${category === cat ? 'bg-dark text-white border-dark' : 'bg-transparent text-muted border-border hover:border-dark'}`}>
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* Calibration strip */}
            <div className="hidden md:flex items-center gap-4 border-[0.5px] border-border rounded px-3 py-2">
              <div className="text-center">
                <div className="font-mono text-[12px] font-medium text-dark">{mode === 'running' ? runningCount : resolvedCount}</div>
                <div className="font-mono text-[9px] text-muted uppercase">{mode === 'running' ? 'Running' : 'Resolved'}</div>
              </div>
              {mode === 'resolved' && (
                <>
                  <div className="w-[0.5px] h-5 bg-border" />
                  <div className="text-center">
                    <div className="font-mono text-[12px] font-medium text-[#3AAA72]">0.118</div>
                    <div className="font-mono text-[9px] text-muted uppercase">Augle Brier</div>
                  </div>
                  <div className="w-[0.5px] h-5 bg-border" />
                  <div className="text-center">
                    <div className="font-mono text-[12px] font-medium text-terracotta">0.174</div>
                    <div className="font-mono text-[9px] text-muted uppercase">Market Brier</div>
                  </div>
                </>
              )}
            </div>

            {/* Mode toggle */}
            <div className="flex border-[0.5px] border-border rounded overflow-hidden">
              {(['running', 'resolved'] as Mode[]).map(m => (
                <button key={m} onClick={() => { setMode(m); setSelectedId(null); }}
                  className={`font-mono text-[11px] px-4 py-[5px] border-r-[0.5px] last:border-r-0 border-border cursor-pointer capitalize transition-colors ${mode === m ? 'bg-dark text-white' : 'bg-[#EAE6DC] text-muted hover:text-dark'}`}>
                  {m === 'running' && mode === 'running' && (
                    <span className="inline-block w-[5px] h-[5px] rounded-full bg-terracotta mr-[5px] align-middle" />
                  )}
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MODE STRIP */}
      <div className="bg-[#EAE6DC] border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-2 flex items-center gap-4 overflow-x-auto">
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className={`w-[6px] h-[6px] rounded-full ${mode === 'running' ? 'bg-terracotta' : 'bg-[#3AAA72]'}`} />
            <span className="font-mono text-[10px] text-muted capitalize">{mode}</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {filtered.map(s => (
              <div key={s.id} className="flex items-center gap-2 bg-surface border-[0.5px] border-border rounded px-2 py-[3px] flex-shrink-0">
                <span className="text-[11px] text-body hidden md:block">{s.question.split(' ').slice(0, 6).join(' ')}…</span>
                <span className="font-mono text-[11px] text-terracotta font-medium">{s.conf}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-6 flex gap-6 items-start">
        {/* GRID */}
        <div className={`flex-1 min-w-0 transition-all`}>
          {filtered.length === 0 ? (
            <div className="font-mono text-[12px] text-muted py-12 text-center">No sessions in this category for {mode} mode.</div>
          ) : (
            <div className={`grid gap-3 ${selected ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
              {filtered.map(session => (
                <SessionCard
                  key={session.id}
                  session={session}
                  isSelected={selectedId === session.id}
                  onSelect={() => setSelectedId(selectedId === session.id ? null : session.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* SIDEBAR */}
        {selected && (
          <div className="hidden lg:block">
            <Sidebar session={selected} onClose={() => setSelectedId(null)} />
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
