'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const CHECK_ICON = (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#F7F6F2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const QUESTIONS = [
  { q: '"Does smartphone ESM provide sufficient ecological validity for attentional state claims in naturalistic environments?"', s: 32, c: 21, u: 28 },
  { q: '"Are the TAM assumptions in this Series A deck addressable market or theoretical maximum?"', s: 22, c: 38, u: 21 },
  { q: '"Does the proposed healthcare bill cost-benefit methodology account for 30-year climate-adjusted risk?"', s: 41, c: 18, u: 22 },
  { q: '"Is the innovation claim in this NIH R01 differentiated from the 2024 Friederici lab publication?"', s: 25, c: 29, u: 27 },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface WaffleData { s: number; c: number; u: number; q: string }

function EvidenceWafflePanel() {
  const [current, setCurrent] = useState<WaffleData>(QUESTIONS[0]);
  const [cells, setCells] = useState<string[]>([]);
  const [questionVisible, setQuestionVisible] = useState(true);
  const [, setQi] = useState(0);

  function buildCells(d: WaffleData) {
    const arr: string[] = [];
    for (let i = 0; i < d.s; i++) arr.push('settled');
    for (let i = 0; i < d.c; i++) arr.push('contested');
    const u = Math.min(d.u, 81 - d.s - d.c);
    for (let i = 0; i < u; i++) arr.push('unknown');
    while (arr.length < 81) arr.push('unknown');
    return shuffle(arr);
  }

  useEffect(() => {
    setCells(buildCells(QUESTIONS[0]));
    const interval = setInterval(() => {
      setQi(prev => {
        const next = (prev + 1) % QUESTIONS.length;
        const d = QUESTIONS[next];
        setCurrent(d);
        setCells(buildCells(d));
        setQuestionVisible(false);
        setTimeout(() => setQuestionVisible(true), 300);
        return next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const cellColor = (type: string) =>
    type === 'settled' ? '#1E1C1A' :
    type === 'contested' ? '#C15F3C' : '#E0DDD5';

  return (
    <div className="bg-surface border-[0.5px] border-border rounded-lg p-6">
      <div className="font-mono text-[10px] tracking-[0.08em] text-[#B0ADA5] uppercase mb-4">Evidence landscape</div>
      <div className="grid gap-[4px] mb-[14px]" style={{ gridTemplateColumns: 'repeat(9, 1fr)' }}>
        {cells.map((type, i) => (
          <div key={i} className="aspect-square rounded-[3px]" style={{ background: cellColor(type) }} />
        ))}
      </div>
      <div className="flex flex-col gap-2 mb-[18px]">
        {[
          { label: 'Settled', color: '#1E1C1A', opacity: '0.75', count: current.s },
          { label: 'Contested', color: '#C15F3C', count: current.c },
          { label: 'Unknown', border: true, count: current.u },
        ].map(({ label, color, opacity, border, count }) => (
          <div key={label} className="flex items-center gap-[10px]">
            <div className="w-[10px] h-[10px] rounded-[2px] flex-shrink-0 border-[0.5px]"
              style={{ background: color || '#E0DDD5', opacity: opacity || 1, borderColor: border ? '#C8C4BA' : 'transparent' }} />
            <span className="text-[13px] text-muted flex-1">{label}</span>
            <span className="font-mono text-[12px] text-[#B0ADA5]">{count} nodes</span>
          </div>
        ))}
      </div>
      <div className="border-t-[0.5px] border-border pt-[18px]">
        <div className="font-mono text-[10px] tracking-[0.06em] text-[#B0ADA5] uppercase mb-2">Active question</div>
        <p className="text-[12px] text-body leading-[1.6] italic min-h-[54px] transition-opacity duration-300"
          style={{ opacity: questionVisible ? 1 : 0 }}>
          {current.q}
        </p>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="bg-sand min-h-screen">
      <Nav activeRoute="/" />

      {/* HERO */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-[72px] lg:py-[108px] grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 lg:gap-[96px] items-start">
          <div>
            <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-6">Augmented deliberation</div>
            <h1 className="font-serif text-[36px] lg:text-[64px] font-normal leading-[1.12] tracking-[-0.025em] text-dark mb-7">
              The questions<br />that matter don't<br />have <em className="italic text-terracotta">clean answers.</em>
            </h1>
            <p className="text-[19px] text-body leading-[1.8] mb-10 max-w-[540px]">
              Augle's seven-agent ensemble maps what's settled, what's contested, and what's unknown — producing evidence-anchored findings with calibrated confidence grades before the stakes are live.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/waitlist" className="text-[15px] font-medium text-white bg-terracotta px-7 py-[14px] rounded hover:opacity-[0.88] transition-opacity no-underline">
                Join waitlist
              </Link>
              <Link href="/how-it-works" className="text-[15px] text-body hover:text-dark transition-colors flex items-center gap-[6px] no-underline">
                See how it works →
              </Link>
            </div>
          </div>
          <EvidenceWafflePanel />
        </div>
      </div>

      {/* ENSEMBLE */}
      <div className="bg-dark border-t-[0.5px] border-border py-24">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px]">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-6">Seven-agent ensemble</div>
          <h2 className="font-serif text-[28px] lg:text-[44px] font-normal text-white leading-[1.15] mb-14 max-w-[640px]">
            Structured deliberation across three phases — not a single model guessing.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[#49443F] border-[0.5px] border-[#49443F] rounded-lg overflow-hidden mb-12">
            {[
              { label: 'Phase 1', name: 'Exploration', body: "The Cartographer maps the evidence landscape. The Methodologist assesses construct validity. The Guardian's Source Verification Service authenticates every citation in real time." },
              { label: 'Phase 2', name: 'Deliberation', body: "The Contrarian surfaces the strongest objections — including the ones you haven't thought of. Each objection is classified by strength and resolution status before the ensemble proceeds." },
              { label: 'Phase 3', name: 'Synthesis', body: 'The Synthesizer weighs evidence across agents at temperature zero. The Pragmatist produces actionable next steps. The full deliberation is logged as an auditable reasoning trace.' },
            ].map(({ label, name, body }) => (
              <div key={label} className="bg-[#262321] p-9">
                <div className="font-mono text-[10px] tracking-[0.08em] text-terracotta uppercase mb-[14px]">{label}</div>
                <div className="font-serif text-[24px] font-normal text-white mb-[14px]">{name}</div>
                <p className="text-[14px] text-[#6A645E] leading-[1.8]">{body}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
            {[
              { name: 'Guardian', role: 'Integrity & verification', accent: true },
              { name: 'Cartographer', role: 'Evidence mapping' },
              { name: 'Methodologist', role: 'Validity assessment' },
              { name: 'Contrarian', role: 'Objection surfacing' },
              { name: 'Synthesizer', role: 'Evidence weighting' },
              { name: 'Pragmatist', role: 'Actionable output' },
              { name: 'Topic Architect', role: 'Session orchestration' },
            ].map(({ name, role, accent }) => (
              <div key={name} className={`bg-[#262321] border-[0.5px] rounded-[6px] py-4 px-3 text-center ${accent ? 'border-terracotta' : 'border-[#49443F]'}`}>
                <div className={`text-[12px] font-medium leading-[1.3] mb-[5px] ${accent ? 'text-terracotta' : 'text-white'}`}>{name}</div>
                <div className="text-[10px] text-[#6A645E] leading-[1.4]">{role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURED OUTCOMES */}
      <hr className="border-none border-t-[0.5px] border-border" />
      <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-24">
        <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-5">Featured outcomes</div>
        <div className="flex items-end justify-between mb-12">
          <h2 className="font-serif text-[28px] lg:text-[44px] font-normal leading-[1.15] text-dark">
            What deliberation<br />looks like in practice.
          </h2>
          <Link href="/outcomes" className="text-[14px] font-medium text-terracotta whitespace-nowrap pb-[6px] no-underline">
            Browse all outcomes →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[14px]">
          {[
            {
              vertical: 'Policy', badge: 'Established', badgeBg: '#D9F0E4', badgeColor: '#2A7050',
              q: '"Does the proposed infrastructure bill\'s cost-benefit methodology adequately account for climate-adjusted risk over a 30-year horizon?"',
              finding: 'Settled: standard CBA frameworks systematically undervalue tail risk. Contested: the appropriate discount rate for climate-adjusted infrastructure. Finding: defensible for near-term projections; materially inadequate for 20+ year claims.',
              agents: '7 agents · 3 phases',
            },
            {
              vertical: 'Healthcare', badge: 'Contested', badgeBg: '#F5E8C8', badgeColor: '#8A5A1A',
              q: '"Is the drug-drug interaction evidence sufficient to contraindicate concurrent use in patients with moderate hepatic impairment?"',
              finding: 'Strong unresolved objection: the interaction studies excluded moderate hepatic impairment populations entirely. The finding is contested — not because evidence conflicts, but because the relevant population was never studied.',
              agents: '7 agents · 3 phases',
            },
            {
              vertical: 'Venture capital', badge: 'Probable', badgeBg: '#D4E4F5', badgeColor: '#2A4A7A',
              q: '"Does the TAM assumption in this Series A deck reflect the addressable market or the theoretical maximum?"',
              finding: 'Construct validity issues with the market sizing methodology — the $14B figure conflates enterprise and SMB segments with fundamentally different sales motions. The defensible TAM for the current GTM is $2.1–3.4B.',
              agents: '7 agents · 2 phases',
            },
          ].map(({ vertical, badge, badgeBg, badgeColor, q, finding, agents }) => (
            <div key={vertical} className="bg-surface border-[0.5px] border-border rounded-lg p-6 hover:border-terracotta transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-[14px]">
                <span className="font-mono text-[10px] tracking-[0.06em] text-[#B0ADA5] uppercase">{vertical}</span>
                <span className="font-mono text-[11px] px-2 py-[3px] rounded-[3px]" style={{ background: badgeBg, color: badgeColor }}>{badge}</span>
              </div>
              <p className="text-[14px] text-dark leading-[1.6] mb-[14px] italic">{q}</p>
              <p className="text-[13px] text-body leading-[1.7] mb-[14px]">{finding}</p>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[#B0ADA5] font-mono">{agents}</span>
                <Link href="/outcomes" className="text-[13px] text-terracotta font-medium no-underline">View →</Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* GUARDIAN */}
      <div className="bg-surface border-t-[0.5px] border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-24 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-center">
          <div>
            <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-5">Guardian integrity system</div>
            <h2 className="font-serif text-[28px] lg:text-[44px] font-normal text-dark leading-[1.15] mb-5">
              Every source verified before it influences a finding.
            </h2>
            <p className="text-[18px] text-body leading-[1.85] mb-8">
              The Guardian runs continuously across all three phases — authenticating citations, flagging unverified preprints, enforcing domain-specific integrity rules, and capping confidence grades on any node where source verification fails.
            </p>
            <div className="flex flex-col gap-[14px]">
              {[
                'Source Verification Service authenticates every citation in real time',
                'Unverified preprints and retracted papers automatically flagged and capped',
                'Domain-specific integrity modes: academic, legal, clinical, financial',
                'Full audit trail — every source decision logged and exportable',
              ].map(text => (
                <div key={text} className="flex items-start gap-[14px]">
                  <div className="w-[22px] h-[22px] bg-terracotta rounded-[3px] flex items-center justify-center flex-shrink-0 mt-[2px]">
                    {CHECK_ICON}
                  </div>
                  <span className="text-[15px] text-body leading-[1.7]">{text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-dark rounded-lg p-7">
            <div className="font-mono text-[10px] tracking-[0.08em] text-terracotta uppercase mb-[18px]">Source verification · live session</div>
            {[
              { dot: '#3AAA72', text: 'Pashler et al. (2008) — Reproducibility and Research Practices', badge: 'Verified', bg: '#1A3D2A', color: '#3AAA72' },
              { dot: '#3AAA72', text: 'Open Science Collaboration (2015) — Science, Vol. 349', badge: 'Verified', bg: '#1A3D2A', color: '#3AAA72' },
              { dot: '#C15F3C', text: 'Martinez et al. (2024) — arXiv preprint, not peer-reviewed', badge: 'Flagged', bg: '#3D1A10', color: '#C15F3C' },
              { dot: '#3AAA72', text: 'Simmons et al. (2011) — False-Positive Psychology, Psych Science', badge: 'Verified', bg: '#1A3D2A', color: '#3AAA72' },
              { dot: '#8A7D72', text: 'Chen & Liu (2023) — Conference proceedings, pending review', badge: 'Unverified', bg: '#2C2926', color: '#8A7D72' },
              { dot: '#3AAA72', text: 'Ioannidis (2005) — Why Most Published Research Findings Are False', badge: 'Verified', bg: '#1A3D2A', color: '#3AAA72' },
            ].map(({ dot, text, badge, bg, color }) => (
              <div key={text} className="flex items-center gap-3 py-3 border-b-[0.5px] border-[#49443F] last:border-0">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: dot }} />
                <span className="text-[13px] text-[#D4CFC6] flex-1 leading-[1.5]">{text}</span>
                <span className="font-mono text-[10px] px-[7px] py-[2px] rounded-[3px] whitespace-nowrap" style={{ background: bg, color }}>{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PROOF STATS */}
      <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20 text-center">
        <div className="font-mono text-[12px] tracking-[0.1em] text-[#B0ADA5] uppercase mb-12">Built for high-stakes reasoning across every domain</div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-[1px] bg-border border-[0.5px] border-border rounded-lg overflow-hidden mb-16">
          {[
            { num: '7', label: 'Specialized agents\nper session' },
            { num: '3', label: 'Deliberation phases\nper analysis' },
            { num: '11', label: 'Solution verticals\nserved' },
            { num: '100%', label: 'Auditable reasoning\ncorpus' },
          ].map(({ num, label }) => (
            <div key={num} className="bg-surface py-9 px-6 text-center">
              <div className="font-serif text-[48px] font-normal text-dark leading-none mb-2">{num}</div>
              <div className="text-[13px] text-muted leading-[1.5] whitespace-pre-line">{label}</div>
            </div>
          ))}
        </div>
        <p className="text-[15px] text-[#B0ADA5] mb-5">Serving researchers, analysts, and decision-makers across</p>
        <div className="flex flex-wrap justify-center gap-[10px]">
          {['Universities + academia', 'Research labs', 'Policy + lawmakers', 'Law firms', 'Venture capital + PE', 'Think tanks', 'Enterprise', 'Healthcare + life sciences', 'Government', 'Financial services', 'Media + journalism'].map(v => (
            <span key={v} className="text-[12px] text-muted bg-[#EAE6DC] border-[0.5px] border-border px-4 py-[7px] rounded font-mono">{v}</span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-terracotta px-4 lg:px-[72px] py-24 text-center">
        <h2 className="font-serif text-[36px] lg:text-[52px] font-normal text-white leading-[1.1] mb-5 tracking-[-0.02em]">
          Engineered for the<br />questions that matter.
        </h2>
        <p className="text-[19px] text-white/75 mb-10 leading-[1.7]">
          Join researchers, analysts, and decision-makers using Augle<br className="hidden lg:block" />
          to find the hard edges of what they know.
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
