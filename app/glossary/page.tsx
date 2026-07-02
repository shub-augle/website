'use client';

import { useState } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';

interface Term {
  id: string;
  anchor: string;
  name: string;
  def: string;
  tags: string[];
  searchKey: string;
}

const TERMS: Term[] = [
  {
    id: 'ai-deliberation',
    anchor: '/glossary/ai-deliberation',
    name: 'Augmented deliberation',
    def: 'The process by which AI agents systematically enhance human deliberative reasoning — structuring evidence, applying adversarial pressure, enforcing methodological standards, and producing calibrated confidence grades. Distinct from AI-generated answers: augmented deliberation preserves and strengthens the deliberative process rather than replacing it.',
    tags: ['Foundational', 'Architecture'],
    searchKey: 'augmented deliberation',
  },
  {
    id: 'ensemble-intelligence',
    anchor: '/glossary/ensemble-intelligence',
    name: 'Seven-agent ensemble',
    def: 'Augle\'s core architecture: seven specialised AI agents (Guardian, Topic Architect, Cartographer, Methodologist, Contrarian, Synthesizer, Pragmatist) working in structured sequence across three phases. Each agent has a defined role, temperature setting, and output constraint. The ensemble is designed to surface disagreement and uncertainty rather than suppress it.',
    tags: ['Architecture', 'Agents'],
    searchKey: 'seven-agent ensemble',
  },
  {
    id: 'guardian-system',
    anchor: '/glossary/guardian-system',
    name: 'Guardian system',
    def: 'The integrity layer that operates before and throughout every Augle session. The Guardian validates source citations, checks retraction databases, monitors scope adherence, and issues phase boundary clearances. It operates in six modes — Academic, Legal, Clinical, Financial, Editorial, and Markets — each with domain-specific verification protocols.',
    tags: ['Guardian', 'Integrity'],
    searchKey: 'guardian system',
  },
  {
    id: 'confidence-grade',
    anchor: '/glossary/confidence-grade',
    name: 'Confidence grade',
    def: "Augle's four-level calibration scale: Established, Probable, Contested, and Gap. Grades are propagated from individual evidence nodes to the session finding via the Methodologist's ceiling constraint. A finding cannot exceed the highest grade that the evidence base supports. Grades are not scores — they represent qualitative epistemic states, not percentages.",
    tags: ['Calibration', 'Output'],
    searchKey: 'confidence grade established probable contested gap',
  },
  {
    id: 'brier-score',
    anchor: '/glossary/brier-score',
    name: 'Brier score',
    def: "A calibration metric that measures the accuracy of a probabilistic prediction. Calculated as (confidence − outcome)², where a lower score indicates better calibration. Augle computes Brier scores for Prediction Markets sessions by comparing the ensemble's confidence at session time against the binary resolution outcome, and benchmarks against the implied market probability at session initiation.",
    tags: ['Calibration', 'Metrics'],
    searchKey: 'brier score calibration metric',
  },
  {
    id: 'svs',
    anchor: '/glossary/svs',
    name: 'SVS · Structured Verification System',
    def: "The Guardian's citation validation protocol. SVS checks every source against retraction databases, verifies statutory version and jurisdiction scope, distinguishes peer-reviewed publications from preprints, monitors source independence, and flags conflicts of interest. SVS flags are graded Critical, Moderate, or Low — Critical flags halt the session.",
    tags: ['Guardian', 'Verification'],
    searchKey: 'svs structured verification system source',
  },
  {
    id: 'contrarian-agent',
    anchor: '/glossary/contrarian-agent',
    name: 'Contrarian agent',
    def: 'The adversarial agent in the Augle ensemble. The Contrarian operates at maximum temperature and is required to steelman every position before challenging it. It raises objections graded Strong, Moderate, or Speculative, each with a specified resolution condition. Unresolved Strong objections are preserved verbatim in the session output.',
    tags: ['Agents', 'Adversarial'],
    searchKey: 'contrarian agent adversarial steelman objection',
  },
  {
    id: 'cartographer-agent',
    anchor: '/glossary/cartographer-agent',
    name: 'Cartographer agent',
    def: 'The terrain-mapping agent. The Cartographer classifies every evidence domain as Settled, Contested, or Unknown — producing the evidential landscape that all subsequent agents build on. It identifies knowledge gaps that enter the evidence registry and may generate follow-on session proposals.',
    tags: ['Agents', 'Terrain'],
    searchKey: 'cartographer agent terrain settled contested unknown',
  },
  {
    id: 'methodologist-agent',
    anchor: '/glossary/methodologist-agent',
    name: 'Methodologist agent',
    def: 'The evidence validity agent. The Methodologist assesses construct validity, external validity, and internal validity for every evidence node. It issues confidence ceilings — hard constraints that prevent any finding from exceeding the grade the evidence supports. It monitors for causal inference errors, population scope mismatches, and statistical misrepresentation.',
    tags: ['Agents', 'Validity'],
    searchKey: 'methodologist agent validity ceiling',
  },
  {
    id: 'synthesizer-agent',
    anchor: '/glossary/synthesizer-agent',
    name: 'Synthesizer agent',
    def: "The finding-production agent. The Synthesizer operates at T=0.0 (deterministic) and produces the session finding anchored exclusively to the evidence nodes registry — not the deliberation discourse. It cannot elevate a finding above the Methodologist's ceiling. It carries all unresolved objections forward verbatim.",
    tags: ['Agents', 'Output'],
    searchKey: 'synthesizer agent finding deterministic',
  },
  {
    id: 'pragmatist-agent',
    anchor: '/glossary/pragmatist-agent',
    name: 'Pragmatist agent',
    def: "The actionability agent. The Pragmatist inherits the Synthesizer's confidence ceiling and translates the finding into actionable steps, monitoring variables, and follow-on session proposals — all within the constraints the evidence supports. It does not produce financial or investment advice.",
    tags: ['Agents', 'Actionability'],
    searchKey: 'pragmatist agent actionable steps',
  },
  {
    id: 'prediction-markets-mode',
    anchor: '/glossary/prediction-markets-mode',
    name: 'Prediction Markets mode',
    def: "One of Augle's two session modes. In Prediction Markets mode, the session is paired with a binary prediction market contract (Kalshi or Polymarket). The session's confidence is compared against the market's implied probability, and the Brier score is computed against the binary resolution outcome. Corpus quality tiers (Gold, Silver, Flagged) apply only in this mode.",
    tags: ['Session modes', 'Calibration'],
    searchKey: 'prediction markets mode kalshi polymarket binary',
  },
  {
    id: 'letters-science-mode',
    anchor: '/glossary/letters-science-mode',
    name: 'Letters & Science mode',
    def: "One of Augle's two session modes. Letters & Science sessions address questions without a binary market resolution — academic, policy, legal, and clinical questions where the finding is the confidence grade itself. No Brier score applies. Reopen conditions are triggered by new evidence or publications rather than market events.",
    tags: ['Session modes'],
    searchKey: 'letters science mode academic policy legal clinical',
  },
  {
    id: 'reopen-conditions',
    anchor: '/glossary/reopen-conditions',
    name: 'Reopen conditions',
    def: "Structured triggers defined at session close that specify what new information would require the session's finding to be revised. Each reopen condition includes a trigger event, a directionality (whether the finding would upgrade or downgrade), and a threshold. In Prediction Markets mode, triggers are market events; in Letters & Science mode, triggers are new evidence or publications.",
    tags: ['Session lifecycle', 'Calibration'],
    searchKey: 'reopen conditions trigger revision',
  },
  {
    id: 'corpus-quality-tiers',
    anchor: '/glossary/corpus-quality-tiers',
    name: 'Corpus quality tiers',
    def: 'The three-tier classification of Prediction Markets sessions based on market contract status at session time. Gold: contract live and unresolved at session time. Silver: resolved 0–60 days prior. Flagged: resolved 60+ days prior. Only Gold and Silver sessions are included in published Brier statistics. Flagged sessions are excluded from calibration metrics.',
    tags: ['Corpus', 'Calibration'],
    searchKey: 'corpus quality tiers gold silver flagged',
  },
  {
    id: 'phase-architecture',
    anchor: '/glossary/phase-architecture',
    name: 'Phase architecture',
    def: "Augle's three-phase deliberation structure. Phase 1 (Exploration): terrain mapping, evidence classification, knowledge gap identification. Phase 2 (Deliberation): adversarial review, objection raising, evidence stress-testing. Phase 3 (Synthesis): finding production, confidence grading, reopen condition definition. Each phase boundary requires Guardian clearance before proceeding.",
    tags: ['Architecture', 'Phases'],
    searchKey: 'phase architecture exploration deliberation synthesis',
  },
  {
    id: 'evidence-nodes-registry',
    anchor: '/glossary/evidence-nodes-registry',
    name: 'Evidence nodes registry',
    def: "The structured record of all evidence claims admitted to a session, each with a source citation, SVS verification outcome, confidence ceiling, and validity assessment. The Synthesizer's final finding is anchored exclusively to nodes in the registry — claims made in deliberation that are not in the registry cannot influence the finding.",
    tags: ['Evidence', 'Architecture'],
    searchKey: 'evidence nodes registry structured record',
  },
  {
    id: 'dissent-register',
    anchor: '/glossary/dissent-register',
    name: 'Dissent register',
    def: 'The complete record of all Contrarian objections raised during a session — including steelman, verbatim objection text, strength grade, resolution condition, and resolution status (resolved or unresolved). Unresolved objections are published in the session output. The dissent register is part of the exportable audit trail.',
    tags: ['Contrarian', 'Output'],
    searchKey: 'dissent register objection audit trail',
  },
  {
    id: 'grade-challenge',
    anchor: '/glossary/grade-challenge',
    name: 'Grade Challenge',
    def: 'The formal mechanism by which an agent disputes a confidence grade assigned to an evidence node. A Grade Challenge must cite specific evidence that supports a different grade and specify a resolution condition. The Methodologist adjudicates Grade Challenges. Upheld challenges can only lower a grade, never raise it above the evidence ceiling.',
    tags: ['Calibration', 'Protocol'],
    searchKey: 'grade challenge dispute confidence',
  },
  {
    id: 'follow-on-session',
    anchor: '/glossary/follow-on-session',
    name: 'Follow-on session',
    def: "A new Augle session automatically proposed from a prior session's outputs. Follow-on proposals are generated from three sources: knowledge gaps identified by the Cartographer, unresolved Strong objections from the Contrarian, and triggered reopen conditions. Each proposal includes the proposed research question, priority tier, recommended depth, and session lineage reference.",
    tags: ['Session lifecycle', 'Corpus'],
    searchKey: 'follow-on session proposed lineage',
  },
];

const TAG_COLORS: Record<string, string> = {
  Foundational: 'bg-[#FBF5F2] text-terracotta border-terracotta',
  Architecture: 'bg-[#EAE6DC] text-body border-border',
  Agents: 'bg-[#EAE6DC] text-body border-border',
  Guardian: 'bg-[#FBF5F2] text-terracotta border-terracotta',
  Integrity: 'bg-[#EAE6DC] text-body border-border',
  Calibration: 'bg-[#EAE6DC] text-body border-border',
  Output: 'bg-[#EAE6DC] text-body border-border',
  Metrics: 'bg-[#EAE6DC] text-body border-border',
  Verification: 'bg-[#EAE6DC] text-body border-border',
  Adversarial: 'bg-[#EAE6DC] text-body border-border',
  Terrain: 'bg-[#EAE6DC] text-body border-border',
  Validity: 'bg-[#EAE6DC] text-body border-border',
  Actionability: 'bg-[#EAE6DC] text-body border-border',
  'Session modes': 'bg-[#D4E4F5] text-[#2A4A7A] border-[#85B7EB]',
  'Session lifecycle': 'bg-[#EAE6DC] text-body border-border',
  Corpus: 'bg-[#EAE6DC] text-body border-border',
  Phases: 'bg-[#EAE6DC] text-body border-border',
  Evidence: 'bg-[#EAE6DC] text-body border-border',
  Protocol: 'bg-[#EAE6DC] text-body border-border',
  Contrarian: 'bg-[#FBF5F2] text-terracotta border-terracotta',
};

export default function GlossaryPage() {
  const [query, setQuery] = useState('');

  const filtered = query
    ? TERMS.filter(t => t.searchKey.includes(query.toLowerCase()) || t.name.toLowerCase().includes(query.toLowerCase()))
    : TERMS;

  return (
    <div className="bg-sand min-h-screen">
      <Nav activeRoute="/about" />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Glossary' }]} />

      {/* HERO */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-[96px] grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 items-start">
          <div>
            <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-5">Glossary</div>
            <h1 className="font-serif text-[36px] lg:text-[64px] font-normal leading-[1.12] tracking-[-0.025em] text-dark mb-6">
              The vocabulary of<br />augmented deliberation.
            </h1>
            <p className="text-[19px] text-body leading-[1.8] max-w-[560px]">
              Definitions for every term in the Augle system — agents, confidence grades, session modes, corpus tiers, and architecture concepts. Each definition is written to be precise enough to use in a research context and accessible enough to use in a conversation.
            </p>
          </div>

          {/* Search */}
          <div>
            <div className="relative mb-3">
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search terms..."
                className="w-full text-[14px] px-4 py-3 pr-10 border-[0.5px] border-border rounded bg-surface text-dark placeholder:text-muted outline-none focus:border-terracotta transition-colors font-sans"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[16px] text-muted pointer-events-none">⌕</span>
            </div>
            <div className="font-mono text-[11px] text-muted">
              {filtered.length} term{filtered.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-12 flex gap-10 items-start">

        {/* SIDEBAR */}
        <div className="hidden lg:block w-[220px] flex-shrink-0 sticky top-[80px]">
          <div className="font-mono text-[10px] tracking-[0.06em] text-muted uppercase mb-4">Jump to term</div>
          <div className="flex flex-col gap-[2px]">
            {TERMS.map(term => (
              <a key={term.id} href={`#${term.id}`}
                className={`text-[12px] py-[5px] no-underline hover:text-terracotta transition-colors ${filtered.find(t => t.id === term.id) ? 'text-body' : 'text-border pointer-events-none'}`}>
                {term.name}
              </a>
            ))}
          </div>
        </div>

        {/* TERMS */}
        <div className="flex-1 min-w-0 flex flex-col divide-y-[0.5px] divide-border">
          {filtered.length === 0 ? (
            <div className="py-16 text-center font-mono text-[13px] text-muted">
              No terms match "{query}"
            </div>
          ) : (
            filtered.map(({ id, anchor, name, def, tags }) => (
              <div key={id} id={id} className="py-8 first:pt-0">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h2 className="font-serif text-[22px] font-normal text-dark leading-[1.3]">{name}</h2>
                  <span className="font-mono text-[10px] text-[#C8C4BA] pt-[5px] flex-shrink-0 hidden md:block">{anchor}</span>
                </div>
                <p className="text-[15px] text-body leading-[1.8] mb-4">{def}</p>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <span key={tag} className={`font-mono text-[10px] px-2 py-[3px] rounded border-[0.5px] ${TAG_COLORS[tag] ?? 'bg-[#EAE6DC] text-body border-border'}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-terracotta px-4 lg:px-[72px] py-20 text-center">
        <h2 className="font-serif text-[32px] lg:text-[44px] font-normal text-white leading-[1.1] mb-5 tracking-[-0.02em]">
          See the architecture in action.
        </h2>
        <p className="text-[18px] text-white/75 mb-8 leading-[1.7]">
          One free Standard session with every new account.
        </p>
        <div className="flex items-center justify-center gap-5 flex-wrap">
          <Link href="/waitlist" className="text-[15px] font-medium text-terracotta bg-white px-8 py-[14px] rounded no-underline hover:opacity-90 transition-opacity">Join waitlist</Link>
          <Link href="/how-it-works" className="text-[15px] text-white/80 border-[0.5px] border-white/35 px-7 py-[14px] rounded no-underline hover:bg-white/10 transition-colors">How it works</Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
