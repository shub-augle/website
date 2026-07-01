'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import WaffleGrid, { WaffleAgent } from '@/components/WaffleGrid';

/* ─── Types ─── */
type SessionMode = 'markets' | 'ls';
type Grade = 'Established' | 'Probable' | 'Contested' | 'Gap';

interface ReopenCondition { id: string; text: string; trigger: string }
interface AgentBlock { initials: string; name: string; model: string; temp: string; pct: number; dissent?: boolean; output: string }
interface PhaseData { phase: number; label: string; agents: AgentBlock[] }
interface SVSRow { ok: boolean; source: string; type: string; flag?: string }

interface OutcomeSession {
  id: string;
  mode: SessionMode;
  domain: string;
  depth: string;
  question: string;
  context?: string; // L&S only
  grade: Grade;
  conf: number;
  resolution?: 'YES' | 'NO';
  resolutionSrc?: string;
  resolutionDate?: string;
  augleBrier?: number;
  mktBrier?: number;
  corpusTier?: 'Gold' | 'Silver';
  time: string;
  runtime: string;
  citations: string;
  dissentFlags: string;
  guardianScore: number;
  guardianDetail: { source: number; bias: number; consistency: number; scope: number };
  findingText: string;
  reopenConditions: ReopenCondition[];
  phases: PhaseData[];
  agents: WaffleAgent[];
  svsRows?: SVSRow[]; // L&S only
  guardianMode?: string; // L&S only
  docUploaded?: string; // L&S only
}

/* ─── Session data: Markets (Fed rate cuts) ─── */
const SESSION_MARKETS: OutcomeSession = {
  id: 'fed-rate-cuts-2026',
  mode: 'markets',
  domain: 'Economics',
  depth: 'Standard · ~15 min',
  question: '"Will the Fed cut rates at least twice in 2026?"',
  grade: 'Probable',
  conf: 78,
  resolution: 'YES',
  resolutionSrc: 'Polymarket',
  resolutionDate: 'June 2026',
  augleBrier: 0.049,
  mktBrier: 0.091,
  corpusTier: 'Gold',
  time: '4h ago',
  runtime: '14m 38s',
  citations: '14 · 0 flags',
  dissentFlags: '2 Moderate',
  guardianScore: 94,
  guardianDetail: { source: 95, bias: 92, consistency: 94, scope: 96 },
  findingText: 'The ensemble concludes that two or more rate cuts are probable before year-end 2026. Core inflation trajectory supports an easing path — the most recent three CPI prints are below the 3.0% threshold that would trigger a policy hold. Softening labor market data — non-farm payrolls below consensus in three of the last four readings, initial claims trending up — provides additional support. The Contrarian\'s objection on Fed communication ambiguity was assessed as Moderate and does not alter the confidence grade, but surfaces verbatim below. The single reopen condition that would materially change this finding is a single CPI print above 3.2% before Q3 2026.',
  reopenConditions: [
    { id: 'RC1', text: 'Single CPI print above 3.2% before Q3 2026 would trigger mandatory session reopen', trigger: 'Trigger: CPI > 3.2% · Direction: downgrade to Contested' },
    { id: 'RC2', text: 'Federal Reserve communications explicitly signaling a hold stance at two consecutive FOMC meetings', trigger: 'Trigger: Explicit hold signal · Direction: downgrade to Contested' },
    { id: 'RC3', text: 'Non-farm payrolls positive surprise above 250k for two consecutive months', trigger: 'Trigger: NFP > 250k × 2 · Direction: moderate downgrade' },
  ],
  agents: [
    { name: 'Cartographer', pct: 82, color: '#C15F3C' },
    { name: 'Methodologist', pct: 85, color: '#C15F3C' },
    { name: 'Contrarian', pct: 41, color: '#A05040' },
    { name: 'Synthesizer', pct: 88, color: '#C15F3C' },
    { name: 'Pragmatist', pct: 76, color: '#C15F3C' },
  ],
  phases: [
    {
      phase: 1, label: 'Phase 1 · Exploration', agents: [
        { initials: 'CA', name: 'Cartographer', model: 'Gemini 3.1 Pro', temp: 'T=0.8', pct: 82, output: '<strong>Settled ground:</strong> The Federal Reserve\'s easing bias is signaled through recent dot-plot median projections of two cuts. CPI has trended below 3.0% for three consecutive readings. Labor market data shows softening — initial claims trending upward, NFP below consensus in three of last four releases.<br><br><strong>Contested terrain:</strong> Timing of the first cut is disputed — market expectations range from Q1 to Q3. Fed communication has been deliberately ambiguous on the pace of easing.<br><br><strong>Unknown territory:</strong> Q3 and Q4 inflation trajectory. Whether softening labor market will accelerate or stabilize. Fed\'s response to potential fiscal policy changes.<br><br><strong>Knowledge gap:</strong> No reliable forward model for Q3–Q4 inflation given current supply chain ambiguity. Gap entered into evidence registry.' },
        { initials: 'ME', name: 'Methodologist', model: 'GPT-4o', temp: 'T=0.5', pct: 85, output: 'Evidence ceiling set at Probable for all nodes. The inflation trajectory evidence has strong internal validity — three consecutive CPI readings are a reliable signal — but external validity is limited by the short timeframe. The dot-plot evidence has construct validity concerns: dot-plot projections have historically diverged from actual Fed decisions by 1–2 cuts on average.<br><br><strong>Confidence bounds issued:</strong> Inflation trajectory node: Probable. Dot-plot signal node: Probable with construct validity caveat. Labor market softening node: Probable. No node qualifies for Established given the timeframe and construct validity concerns.' },
        { initials: 'CO', name: 'Contrarian', model: 'Claude Sonnet 4.6', temp: 'T=1.0', pct: 41, dissent: true, output: '<strong>@Cartographer</strong> — Steelman: the terrain classification of "Fed easing bias settled" is defensible given three consecutive below-threshold CPI prints. However, I challenge the classification of dot-plot consensus as settled ground. The Fed\'s own communication has explicitly hedged against forward guidance interpretation.<br><br>Objection [Moderate]: "Fed communication signals have been internally inconsistent across the last three FOMC meetings. Chair statements have repeatedly qualified the dot-plot with data-dependency caveats that the terrain map does not adequately weight." Resolution condition: Two consecutive FOMC statements without forward guidance qualification would resolve this objection.' },
        { initials: 'SY', name: 'Synthesizer', model: 'GPT-4o', temp: 'T=0.0', pct: 88, output: 'Phase 1 preliminary confidence: 78%. Evidence base is Probable across all nodes. Contrarian\'s Moderate objection on dot-plot classification noted and carried forward. No Grade Challenge triggered — all node grades comply with Methodologist ceiling. Dot-plot node reclassified from Settled to Contested terrain per Contrarian challenge.' },
      ],
    },
    {
      phase: 2, label: 'Phase 2 · Deliberation', agents: [
        { initials: 'CA', name: 'Cartographer', model: 'Gemini 3.1 Pro', temp: 'T=0.8', pct: 80, output: 'Phase 2 terrain update incorporating Phase 1 Contrarian challenge and Methodologist validity grades. Dot-plot node reclassified as Contested terrain. New evidence nodes added: Fed Funds futures market pricing (implying 2.1 cuts by year-end — Probable), Goldman Sachs and JPMorgan analyst consensus (2 cuts — Probable). Historical precedent: in 8 of 11 prior easing cycles beginning with similar inflation trajectory, the Fed delivered at least 2 cuts within 12 months (Established — multiple independent sources).' },
        { initials: 'ME', name: 'Methodologist', model: 'GPT-4o', temp: 'T=0.5', pct: 82, output: 'Historical precedent node (8/11 prior cycles): External validity caveat — current macro environment differs from 7 of the 8 precedent cycles in one significant way (post-pandemic structural inflation). Node grade: Probable rather than Established. Fed Funds futures node: Probable — construct validity concern that futures pricing is itself an expectation and not an independent signal. All node grades Probable or below. Evidence ceiling maintained.' },
        { initials: 'CO', name: 'Contrarian', model: 'Claude Sonnet 4.6', temp: 'T=1.0', pct: 44, dissent: true, output: '<strong>@Methodologist</strong> — Steelman: The Methodologist\'s construct validity concern on Fed Funds futures is well-founded — futures pricing reflects expectations and may be circular. However, the concern is already accounted for by the Probable grade. I do not escalate this to Strong.<br><br>New Moderate objection: "The temporal generalization from historical precedent is insufficient. Post-pandemic inflation has a different mean-reversion profile than the cycles cited. The 8/11 base rate may not apply to the current environment." Resolution condition: A published Fed study or equivalent on current-cycle inflation dynamics would partially resolve this.' },
        { initials: 'SY', name: 'Synthesizer', model: 'GPT-4o', temp: 'T=0.0', pct: 85, output: 'Phase 2 revised confidence: 78%. Evidence base strengthened by futures pricing and analyst consensus nodes. Both Moderate Contrarian objections noted and carried to Phase 3. No Grade Challenge — all claims remain within Probable ceiling. Guardian phase boundary clearance: clean.' },
      ],
    },
    {
      phase: 3, label: 'Phase 3 · Synthesis', agents: [
        { initials: 'CO', name: 'Contrarian', model: 'Claude Sonnet 4.6', temp: 'T=1.0', pct: 41, dissent: true, output: '<strong>@Synthesizer</strong> — Steelman of the 78% confidence finding: The evidence base is internally consistent. Inflation is trending below threshold, labor market is softening, market pricing and analyst consensus converge on 2 cuts. The Probable grade is defensible.<br><br>Final Phase 3 objection [Moderate, Unresolved]: "The convergence between market pricing, analyst consensus, and dot-plot signals is a feature of correlated forecasting rather than independent evidence. All three sources may be updating on the same underlying signals. The evidence base has lower effective independence than the confidence grade implies." Resolution condition: At least one independent structural model projecting 2+ cuts would resolve this. This objection is unresolved and surfaces in the final output.' },
        { initials: 'SY', name: 'Synthesizer', model: 'GPT-4o', temp: 'T=0.0', pct: 88, output: '<strong>Final finding: Probable · 78% confidence</strong><br><br>Two or more rate cuts are probable before year-end 2026. The evidence base supports this at Probable grade — no node qualifies for Established. The Contrarian\'s Phase 3 objection on correlated forecasting independence is noted and valid; it does not alter the grade but is preserved verbatim. Three reopen conditions are defined. The finding anchors exclusively to the structured evidence nodes registry.<br><br>Financial advice framing is prohibited. This finding is not a buy, sell, or position recommendation.' },
        { initials: 'PR', name: 'Pragmatist', model: 'Grok 4.1 Fast', temp: 'T=0.3', pct: 76, output: 'Within the Probable ceiling established by the Synthesizer: Monitor CPI releases in Q2–Q3 2026 for the primary reopen trigger (RC1). The Fed Funds futures curve at 2.1 implied cuts is consistent with the finding. The correlated-forecasting objection is valid but does not change the directional conclusion — it limits the confidence precision. The finding supports a positioning assumption of 2 cuts in 2026, with a defined reopen condition that would require reassessment.' },
      ],
    },
  ],
};

/* ─── Session data: L&S (Dissertation) ─── */
const SESSION_LS: OutcomeSession = {
  id: 'dissertation-defence-esm-2026',
  mode: 'ls',
  domain: 'Academic research',
  depth: 'Standard · methodology chapter uploaded',
  question: '"Does experience sampling via smartphone provide sufficient ecological validity to support attentional state claims in naturalistic environments?"',
  context: 'PhD Candidate, Cognitive Science · Pre-dissertation defence · Methodology chapter submitted as context document',
  grade: 'Contested',
  conf: 44,
  time: '3d ago',
  runtime: '16m 12s',
  citations: '11 · 1 preprint',
  dissentFlags: '1 Strong · 1 Moderate',
  guardianScore: 96,
  guardianMode: 'Academic',
  docUploaded: 'Yes · Ch. 3',
  guardianDetail: { source: 97, bias: 95, consistency: 96, scope: 98 },
  findingText: 'The ensemble finds that smartphone experience sampling provides sufficient ecological validity for relative comparisons between attentional conditions — that claim is Probable. However, the absolute claim that ESM measures naturalistic attentional states is Contested. The Contrarian\'s Strong objection on causal entanglement — that a self-report triggered by an attentional interruption measures post-interruption attentional recovery, not naturalistic attentional state — is unresolved and constitutes the committee\'s most likely line of attack. The claim split is the central actionable output of this session: reframe absolute claims as relative ones before the defence.',
  reopenConditions: [
    { id: 'RC1', text: 'Published reliability data for the 3-item Likert operationalisation of attentional state in smartphone-delivery contexts', trigger: 'Trigger: Peer-reviewed publication · Direction: Probable grade possible for construct validity node' },
    { id: 'RC2', text: 'Study directly comparing notification-triggered vs. researcher-initiated ESM on attentional outcomes in the same population', trigger: 'Trigger: Direct comparative study · Direction: Resolves causal entanglement objection' },
    { id: 'RC3', text: 'Reframing of the thesis claim from absolute naturalistic attentional state to post-interruption attentional recovery', trigger: 'Trigger: Thesis revision · Direction: Probable grade achievable with revised claim scope' },
  ],
  agents: [
    { name: 'Cartographer', pct: 52, color: '#C15F3C' },
    { name: 'Methodologist', pct: 48, color: '#C15F3C' },
    { name: 'Contrarian', pct: 28, color: '#A05040' },
    { name: 'Synthesizer', pct: 44, color: '#8AAA9A' },
    { name: 'Pragmatist', pct: 42, color: '#8AAA9A' },
  ],
  svsRows: [
    { ok: true, source: 'Shiffman et al. (2008) — Ecological momentary assessment review', type: 'Peer-reviewed · Verified' },
    { ok: true, source: 'Zeigarnik & colleagues (2021) — Smartphone ESM validity systematic review', type: 'Peer-reviewed · Verified' },
    { ok: false, source: 'Müller et al. (2024) — Attentional interruption in mobile contexts', type: 'Preprint · Flagged', flag: 'SVS_PREPRINT — bioRxiv preprint, not peer-reviewed · Evidence node capped at Probable · Flagged for substitution' },
    { ok: true, source: 'Robertson & Garavan (2004) — Attentional state self-report validity', type: 'Peer-reviewed · Verified' },
    { ok: true, source: '+6 additional citations verified · 0 retracted · 1 preprint flagged above', type: '—' },
  ],
  phases: [
    {
      phase: 1, label: 'Phase 1 · Exploration', agents: [
        { initials: 'CA', name: 'Cartographer', model: 'Gemini 3.1 Pro', temp: 'T=0.8', pct: 52, output: '<strong>Settled ground:</strong> Experience sampling methodology (ESM) is an established data collection technique. Smartphone delivery of ESM is technically feasible and widely used. Within-person variability in attentional state is real and measurable.<br><br><strong>Contested terrain:</strong> Whether smartphone notification triggers introduce systematic attentional bias into ESM data. Whether self-report instruments are valid measures of attentional state in interrupted contexts.<br><br><strong>Unknown territory:</strong> No published study has directly compared notification-triggered vs. researcher-initiated ESM on attentional outcomes. The 3-item Likert scale used in this thesis has no published reliability data in smartphone-delivery contexts.<br><br><strong>Knowledge gaps entered:</strong> (1) Notification-triggered vs. researcher-initiated comparative study — does not exist. (2) Smartphone ESM reliability data for this specific instrument — does not exist.' },
        { initials: 'ME', name: 'Methodologist', model: 'GPT-4o', temp: 'T=0.5', pct: 48, output: '<strong>Construct validity concern flagged:</strong> The 3-item Likert operationalisation of attentional state has no published reliability data for smartphone delivery contexts. This is a material construct validity gap — the instrument may not measure what it claims in this delivery modality.<br><br>Evidence ceiling: all nodes Probable or below. The ecological validity literature for ESM generally is Probable — established enough but with significant construct validity variation by instrument and population. No node qualifies for Established given the instrument-specific gap and the notification mechanism ambiguity.' },
        { initials: 'CO', name: 'Contrarian', model: 'Claude Sonnet 4.6', temp: 'T=1.0', pct: 28, dissent: true, output: '<strong>@Cartographer</strong> — Steelman: ESM is a validated methodology with strong ecological validity credentials in the literature. The candidate\'s design follows established practice and the instrument, while not validated for smartphone delivery specifically, is drawn from validated attentional state measures.<br><br>Strong objection [Phase 1]: "The thesis makes an absolute causal claim — that ESM via smartphone measures naturalistic attentional state. This is philosophically entangled: a self-report triggered by a smartphone notification is not a measure of naturalistic attentional state. It is a measure of attentional state at the moment of notification-triggered interruption. These are not the same construct. The thesis conflates them throughout Chapter 3." Resolution condition: Reframe all absolute attentional state claims as post-interruption attentional recovery claims, or provide a theoretical account of why the distinction does not matter for the specific research question.' },
      ],
    },
    {
      phase: 2, label: 'Phase 2 · Deliberation', agents: [
        { initials: 'ME', name: 'Methodologist', model: 'GPT-4o', temp: 'T=0.5', pct: 45, output: 'The Contrarian\'s Strong objection has been reviewed. The causal entanglement problem is methodologically valid — it is a construct validity issue, not a procedure issue. The Methodologist cannot resolve this objection within the current evidence base. The causal entanglement objection is formally unresolved.<br><br>However, the thesis\'s relative comparisons between attentional conditions are not affected by the causal entanglement objection in the same way. Those claims are Probable. The Methodologist issues a claim split: absolute claims (naturalistic attentional state) are Contested; relative comparisons between conditions are Probable.' },
        { initials: 'CO', name: 'Contrarian', model: 'Claude Sonnet 4.6', temp: 'T=1.0', pct: 31, dissent: true, output: 'I accept the Methodologist\'s claim split. The relative comparison claims are defensible and I do not escalate my objection to those claims. The absolute naturalistic attentional state claims remain contested.<br><br>Additional Moderate objection: "The absence of published reliability data for the Likert instrument in smartphone-delivery contexts is a gap the candidate has not acknowledged in Chapter 3. The committee will raise this. The candidate should preempt it with a limitations statement." Resolution condition: Explicit instrument limitation acknowledgment in thesis and defence preparation.' },
        { initials: 'SY', name: 'Synthesizer', model: 'GPT-4o', temp: 'T=0.0', pct: 46, output: 'Phase 2 synthesis: Claim split confirmed. Relative comparisons between conditions: Probable (44–52% confidence across nodes). Absolute naturalistic attentional state claims: Contested (causal entanglement objection unresolved). Overall session confidence: 44% — reflects the Contested grade on the primary claim. No Grade Challenge triggered on relative comparison claims.' },
      ],
    },
    {
      phase: 3, label: 'Phase 3 · Synthesis', agents: [
        { initials: 'CO', name: 'Contrarian', model: 'Claude Sonnet 4.6', temp: 'T=1.0', pct: 28, dissent: true, output: 'Final steelman: The thesis is methodologically careful in its procedure design. ESM is appropriate for the research questions. The candidate\'s awareness of ecological validity concerns is evident in the design. The instrument limitation is a known constraint, not a design flaw.<br><br>Final Strong objection [Unresolved]: The causal entanglement objection stands. "Self-report triggered by an attentional interruption is not a measure of naturalistic attention — it is a measure of post-interruption attentional recovery. The thesis conflates them throughout Chapter 3 and in the claims at 4.2, 4.7, and 5.1." Resolution condition: Full reframe of absolute claims in Chapter 3 and relevant results sections, plus a defence-ready committee response.' },
        { initials: 'SY', name: 'Synthesizer', model: 'GPT-4o', temp: 'T=0.0', pct: 44, output: '<strong>Final finding: Contested · 44% confidence</strong><br><br>Split finding. Relative comparisons between attentional conditions: Probable — ESM via smartphone is sufficient for this claim type. Absolute naturalistic attentional state claims: Contested — the causal entanglement objection is unresolved and the committee will raise it. The primary claims of Chapter 3 are in the Contested category. This session\'s primary value is in identifying the specific objection, the specific claims it applies to (4.2, 4.7, 5.1), and the precise reframe that would resolve it.' },
        { initials: 'PR', name: 'Pragmatist', model: 'Grok 4.1 Fast', temp: 'T=0.3', pct: 42, output: 'Three concrete actions before the defence: (1) Reframe all absolute attentional state claims in Chapter 3 and sections 4.2, 4.7, and 5.1 as post-interruption attentional recovery claims. (2) Add an explicit instrument limitation statement acknowledging the absence of smartphone-delivery reliability data for the Likert scale. (3) Prepare a committee-ready response to the causal entanglement objection — acknowledge the construct distinction, explain why it does not undermine the relative comparisons, and present the claim reframe as a clarification rather than a concession.' },
      ],
    },
  ],
};

/* ─── Route determines which session to show ─── */
// In production: use useParams() or page props to select the correct session
// Here we export both as named exports for Shub's routing setup
// Default export shows Markets session; import { LSPage } for L&S session

const gradeStyle: Record<Grade, string> = {
  Established: 'bg-[#D9F0E4] text-[#2A7050]',
  Probable: 'bg-[#D4E4F5] text-[#2A4A7A]',
  Contested: 'bg-[#F5E8C8] text-[#8A5A1A]',
  Gap: 'bg-[#F5D8D8] text-[#8A1818]',
};

function AgentAvatar({ initials, dissent }: { initials: string; dissent?: boolean }) {
  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-mono text-[11px] font-medium ${dissent ? 'bg-[#F5D8D8] text-[#8A1818]' : 'bg-[#EAE6DC] text-terracotta'}`}>
      {initials}
    </div>
  );
}

function PhaseTranscript({ phases }: { phases: PhaseData[] }) {
  const [activePhase, setActivePhase] = useState(1);
  const current = phases.find(p => p.phase === activePhase)!;

  return (
    <div className="bg-surface border-[0.5px] border-border rounded-lg overflow-hidden">
      <div className="px-5 py-3 border-b-[0.5px] border-border bg-[#EAE6DC]">
        <span className="font-mono text-[10px] tracking-[0.08em] text-muted uppercase">Phase transcript · all three rounds</span>
      </div>
      <div className="flex border-b-[0.5px] border-border">
        {phases.map(p => (
          <button key={p.phase} onClick={() => setActivePhase(p.phase)}
            className={`flex-1 font-mono text-[11px] py-3 px-2 cursor-pointer border-none transition-colors border-r-[0.5px] border-border last:border-r-0 ${activePhase === p.phase ? 'bg-dark text-white' : 'bg-surface text-muted hover:text-dark'}`}>
            {p.label}
          </button>
        ))}
      </div>
      <div className="flex flex-col divide-y-[0.5px] divide-border">
        {current.agents.map(agent => (
          <div key={agent.initials} className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <AgentAvatar initials={agent.initials} dissent={agent.dissent} />
              <div className="flex-1">
                <div className="text-[13px] font-medium text-dark">{agent.name}</div>
                <div className="font-mono text-[10px] text-muted">{agent.model} · {agent.temp}</div>
              </div>
              <span className={`font-mono text-[13px] font-medium ${agent.dissent ? 'text-[#A05040]' : 'text-terracotta'}`}>{agent.pct}%</span>
            </div>
            <div className="text-[13px] text-body leading-[1.7] bg-sand rounded-lg px-4 py-3 border-[0.5px] border-border"
              dangerouslySetInnerHTML={{ __html: agent.output }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function OutcomeDetailPage({ session }: { session: OutcomeSession }) {
  const isMarkets = session.mode === 'markets';

  const metaTags = isMarkets
    ? [session.domain, 'Markets mode', session.depth, `${session.corpusTier} tier`, `Resolved ${session.resolution}`]
    : [session.domain, 'Letters & Science', session.depth, `Guardian · ${session.guardianMode}`];

  return (
    <div className="bg-sand min-h-screen">
      <Nav activeRoute="/outcomes" />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Outcomes', href: '/outcomes' }, { label: `Session · ${session.id}` }]} />

      {/* SESSION HEADER */}
      <div className="bg-surface border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-7">
          <div className="flex items-center gap-2 flex-wrap mb-4">
            {metaTags.map(tag => (
              <span key={tag} className={`font-mono text-[10px] px-2 py-[3px] rounded border-[0.5px] ${tag.includes('Gold') ? 'border-terracotta text-terracotta bg-[#FBF5F2]' : tag.includes('Resolved') ? 'border-[#3AAA72] text-[#3AAA72] bg-[#EAF5EE]' : 'border-border text-muted bg-[#EAE6DC]'}`}>
                {tag}
              </span>
            ))}
            <span className="font-mono text-[11px] text-muted ml-auto">{session.time}{isMarkets ? ` · ${session.resolutionSrc}` : session.context ? ` · ${session.context?.split('·')[0].trim()}` : ''}</span>
          </div>
          <h1 className="font-serif text-[22px] lg:text-[28px] font-normal text-dark leading-[1.4] mb-5">{session.question}</h1>
          {session.context && <p className="text-[13px] text-muted mb-4">{session.context}</p>}
          <div className="flex items-center gap-3 flex-wrap">
            {['Export PDF', 'Share', 'Run follow-on'].map(label => (
              <button key={label} className="font-mono text-[11px] px-4 py-[6px] border-[0.5px] border-border rounded bg-sand hover:border-dark cursor-pointer transition-colors">
                {label}
              </button>
            ))}
            <span className="font-mono text-[10px] text-[#C8C4BA] ml-2">Illustrative session · augle.com</span>
          </div>
        </div>
      </div>

      {/* BODY — 2-col layout */}
      <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-8 flex gap-6 items-start">
        {/* MAIN COLUMN */}
        <div className="flex-1 min-w-0 flex flex-col gap-5">

          {/* FINDING */}
          <div className="bg-surface border-[0.5px] border-border rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b-[0.5px] border-border bg-[#EAE6DC]">
              <span className="font-mono text-[10px] tracking-[0.08em] text-muted uppercase">Finding · Phase 3 synthesis</span>
              <span className={`font-mono text-[11px] px-2 py-[3px] rounded-[3px] ${gradeStyle[session.grade]}`}>{session.grade}</span>
            </div>
            <div className="p-6">
              {/* Finding header — conditional on mode */}
              {isMarkets ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y-[0.5px] md:divide-y-0 md:divide-x-[0.5px] divide-border mb-6">
                  <div className="pb-4 md:pb-0 md:pr-5">
                    <div className="font-serif text-[48px] text-dark font-normal leading-none mb-1">{session.conf}%</div>
                    <div className="font-mono text-[10px] text-muted uppercase">Ensemble confidence</div>
                  </div>
                  <div className="py-4 md:py-0 md:px-5">
                    <div className="font-mono text-[10px] text-muted uppercase mb-2">Resolution</div>
                    <div className={`font-mono text-[16px] font-medium ${session.resolution === 'YES' ? 'text-[#3AAA72]' : 'text-terracotta'}`}>
                      {session.resolution} — Resolved
                    </div>
                    <div className="font-mono text-[11px] text-muted mt-1">{session.resolutionSrc} · {session.resolutionDate}</div>
                  </div>
                  <div className="pt-4 md:pt-0 md:pl-5">
                    <div className="font-mono text-[10px] text-muted uppercase mb-2">Brier score</div>
                    <div className="font-mono text-[24px] text-[#3AAA72] font-medium">{session.augleBrier?.toFixed(3)}</div>
                    <div className="font-mono text-[11px] text-muted mt-1">vs market {session.mktBrier?.toFixed(3)}</div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y-[0.5px] md:divide-y-0 md:divide-x-[0.5px] divide-border mb-6">
                  <div className="pb-4 md:pb-0 md:pr-5">
                    <div className="font-serif text-[48px] text-dark font-normal leading-none mb-1">{session.conf}%</div>
                    <div className="font-mono text-[10px] text-muted uppercase">Ensemble confidence</div>
                  </div>
                  <div className="py-4 md:py-0 md:px-5">
                    <div className="font-mono text-[10px] text-muted uppercase mb-2">Confidence grade</div>
                    <span className={`font-mono text-[13px] px-2 py-[3px] rounded-[3px] inline-block mb-2 ${gradeStyle[session.grade]}`}>{session.grade} · {session.conf}%</span>
                    <p className="text-[12px] text-muted leading-[1.5]">Absolute naturalistic attentional claims are not supportable as currently framed. Relative comparisons between conditions: Probable.</p>
                  </div>
                  <div className="pt-4 md:pt-0 md:pl-5">
                    <div className="font-mono text-[10px] text-muted uppercase mb-2">Calibration mode</div>
                    <div className="font-mono text-[12px] text-dark mb-1">Letters & Science</div>
                    <p className="text-[11px] text-muted leading-[1.5]">No prediction market pairing. Confidence grade is the finding. No Brier score applies.</p>
                  </div>
                </div>
              )}

              <p className="text-[14px] text-body leading-[1.75] mb-6">{session.findingText}</p>

              {/* Waffle */}
              <div className="font-mono text-[10px] text-muted uppercase mb-3">Confidence grid · 5 agents × 20 units</div>
              <div className="mb-3">
                <WaffleGrid agents={session.agents} />
              </div>
              <div className="flex flex-wrap gap-4 mb-6">
                {[
                  { color: '#C15F3C', label: 'Agreement / confident' },
                  { color: '#8AAA9A', label: 'Neutral' },
                  { color: '#A05040', label: 'Dissent / Contrarian pressure' },
                  { color: '#C8C4BA', label: 'Unfilled' },
                ].map(({ color, label }) => (
                  <span key={label} className="flex items-center gap-2 text-[11px] text-muted">
                    <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: color }} />{label}
                  </span>
                ))}
              </div>

              {/* Reopen conditions */}
              <div className="border-t-[0.5px] border-border pt-5">
                <div className="font-mono text-[10px] tracking-[0.06em] text-muted uppercase mb-3">
                  Reopen conditions · {session.reopenConditions.length} defined
                  {!isMarkets && ' · evidence-triggered, not market-triggered'}
                </div>
                <div className="flex flex-col gap-3">
                  {session.reopenConditions.map(({ id, text, trigger }) => (
                    <div key={id} className="flex gap-3 items-start">
                      <span className="font-mono text-[10px] text-terracotta bg-[#FBF5F2] border-[0.5px] border-terracotta px-2 py-[3px] rounded flex-shrink-0">{id}</span>
                      <div>
                        <p className="text-[13px] text-body leading-[1.5] mb-1">{text}</p>
                        <p className="font-mono text-[10px] text-muted">{trigger}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* PHASE TRANSCRIPT */}
          <PhaseTranscript phases={session.phases} />

          {/* SVS LOG — L&S only */}
          {!isMarkets && session.svsRows && (
            <div className="bg-surface border-[0.5px] border-border rounded-lg overflow-hidden">
              <div className="px-5 py-3 border-b-[0.5px] border-border bg-[#EAE6DC]">
                <span className="font-mono text-[10px] tracking-[0.08em] text-muted uppercase">Guardian · Source Verification Log · Academic mode</span>
              </div>
              <div className="flex flex-col divide-y-[0.5px] divide-border">
                {session.svsRows.map(({ ok, source, type, flag }) => (
                  <div key={source} className="flex items-start gap-3 px-5 py-3">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-[5px] ${ok ? 'bg-[#3AAA72]' : 'bg-terracotta'}`} />
                    <div className="flex-1">
                      <span className="text-[12px] text-body">{source}</span>
                      {flag && <p className="text-[11px] text-terracotta mt-1 font-mono">{flag}</p>}
                    </div>
                    <span className="font-mono text-[10px] text-muted whitespace-nowrap flex-shrink-0">{type}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* SIDEBAR */}
        <div className="hidden lg:block w-[280px] flex-shrink-0 flex flex-col gap-4 sticky top-[80px]">

          {/* Session metadata */}
          <div className="bg-surface border-[0.5px] border-border rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b-[0.5px] border-border bg-[#EAE6DC]">
              <span className="font-mono text-[10px] tracking-[0.08em] text-muted uppercase">Session metadata</span>
            </div>
            <div className="flex flex-col divide-y-[0.5px] divide-border">
              {(isMarkets ? [
                { label: 'Session ID', val: session.id, small: true },
                { label: 'Mode', val: 'Markets' },
                { label: 'Depth', val: session.depth.split('·')[0].trim() },
                { label: 'Runtime', val: session.runtime },
                { label: 'Resolution src', val: session.resolutionSrc! },
                { label: 'Corpus tier', val: session.corpusTier!, green: true },
                { label: 'Guardian', val: `${session.guardianScore}% · Clean`, green: true },
                { label: 'Citations', val: session.citations },
                { label: 'Dissent flags', val: session.dissentFlags, accent: true },
                { label: 'Resolution', val: session.resolution!, green: true },
              ] : [
                { label: 'Session ID', val: session.id, small: true },
                { label: 'Mode', val: 'Letters & Science' },
                { label: 'Depth', val: 'Standard' },
                { label: 'Runtime', val: session.runtime },
                { label: 'Doc uploaded', val: session.docUploaded!, green: true },
                { label: 'Guardian mode', val: session.guardianMode!, accent: true },
                { label: 'Guardian score', val: `${session.guardianScore}% · Clean`, green: true },
                { label: 'Citations', val: session.citations },
                { label: 'Dissent flags', val: session.dissentFlags, accent: true },
                { label: 'Corpus tier', val: 'N/A · L&S' },
              ]).map(({ label, val, small, green, accent }) => (
                <div key={label} className="flex items-baseline justify-between px-4 py-2">
                  <span className="font-mono text-[10px] text-muted">{label}</span>
                  <span className={`text-right ${small ? 'font-mono text-[10px]' : 'text-[12px]'} ${green ? 'text-[#3AAA72]' : accent ? 'text-terracotta' : 'text-dark'}`}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Brier or Calibration status */}
          <div className="bg-surface border-[0.5px] border-border rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b-[0.5px] border-border bg-[#EAE6DC]">
              <span className="font-mono text-[10px] tracking-[0.08em] text-muted uppercase">
                {isMarkets ? 'Brier score · calibration' : 'Calibration status'}
              </span>
            </div>
            <div className="p-4">
              {isMarkets ? (
                <>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <div className="font-mono text-[10px] text-muted mb-1">Augle</div>
                      <div className="font-mono text-[20px] text-[#3AAA72] font-medium">{session.augleBrier?.toFixed(3)}</div>
                    </div>
                    <div>
                      <div className="font-mono text-[10px] text-muted mb-1">Market</div>
                      <div className="font-mono text-[20px] text-muted font-medium">{session.mktBrier?.toFixed(3)}</div>
                    </div>
                  </div>
                  <p className="text-[11px] text-muted leading-[1.5]">Lower is better. Brier = (confidence − outcome)². Market score uses {session.resolutionSrc} implied probability at session initiation. {session.corpusTier} tier — contract was live at session time.</p>
                </>
              ) : (
                <div>
                  <div className="font-mono text-[10px] text-muted uppercase mb-2">Session mode</div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-mono text-[12px] text-dark">Letters & Science</span>
                    <span className="font-mono text-[9px] text-muted border-[0.5px] border-border rounded px-2 py-[2px]">No market pairing</span>
                  </div>
                  <p className="text-[11px] text-muted leading-[1.5] mb-3">This session is not paired with a prediction market contract. No Brier score is computed. The confidence grade is the complete finding.</p>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-muted uppercase">Finding grade</span>
                    <span className={`font-mono text-[10px] px-2 py-[2px] rounded-[3px] ${gradeStyle[session.grade]}`}>{session.grade} · {session.conf}%</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Guardian detail */}
          <div className="bg-surface border-[0.5px] border-border rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b-[0.5px] border-border bg-[#EAE6DC]">
              <span className="font-mono text-[10px] tracking-[0.08em] text-muted uppercase">Guardian · {session.guardianScore}%</span>
            </div>
            <div className="p-4 flex flex-col gap-3">
              {Object.entries(session.guardianDetail).map(([key, val]) => (
                <div key={key}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] text-body capitalize">{key === 'source' ? 'Source quality' : key === 'bias' ? 'Bias screening' : key === 'consistency' ? 'Consistency' : 'Scope adherence'}</span>
                    <span className="font-mono text-[11px] text-dark">{val}%</span>
                  </div>
                  <div className="h-[4px] bg-[#EAE6DC] rounded-full overflow-hidden">
                    <div className="h-full bg-[#3AAA72] rounded-full" style={{ width: `${val}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Agent confidence */}
          <div className="bg-surface border-[0.5px] border-border rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b-[0.5px] border-border bg-[#EAE6DC]">
              <span className="font-mono text-[10px] tracking-[0.08em] text-muted uppercase">Agent confidence</span>
            </div>
            <div className="p-4 flex flex-col gap-2">
              {session.phases[session.phases.length - 1].agents
                .filter(a => ['CA', 'ME', 'CO', 'SY', 'PR'].includes(a.initials))
                .map(a => (
                  <div key={a.initials} className="flex items-center gap-2">
                    <AgentAvatar initials={a.initials} dissent={a.dissent} />
                    <div className="flex-1">
                      <div className="text-[11px] text-body">{a.name}</div>
                      <div className="font-mono text-[9px] text-muted">{a.model}</div>
                    </div>
                    <span className={`font-mono text-[12px] font-medium ${a.dissent ? 'text-[#A05040]' : 'text-terracotta'}`}>{a.pct}%</span>
                  </div>
                ))}
              {/* Fill in any missing agents from session.agents */}
              {session.agents.filter(sa =>
                !session.phases[session.phases.length - 1].agents.some(a => a.name === sa.name)
              ).map(sa => (
                <div key={sa.name} className="flex items-center gap-2">
                  <AgentAvatar initials={sa.name.slice(0, 2).toUpperCase()} dissent={sa.color === '#A05040'} />
                  <div className="flex-1">
                    <div className="text-[11px] text-body">{sa.name}</div>
                  </div>
                  <span className={`font-mono text-[12px] font-medium ${sa.color === '#A05040' ? 'text-[#A05040]' : 'text-terracotta'}`}>{sa.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Export */}
          <div className="bg-surface border-[0.5px] border-border rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b-[0.5px] border-border bg-[#EAE6DC]">
              <span className="font-mono text-[10px] tracking-[0.08em] text-muted uppercase">Export & share</span>
            </div>
            <div className="p-4 flex flex-col gap-2">
              {['↓ Download full PDF report', '↓ Export JSON · audit trail', '↗ Share session link', '+ Run follow-on session'].map(label => (
                <button key={label} className="w-full font-mono text-[11px] text-body border-[0.5px] border-border rounded px-3 py-2 text-left hover:border-terracotta hover:text-terracotta transition-colors cursor-pointer bg-sand">
                  {label}
                </button>
              ))}
              <p className="font-mono text-[9px] text-[#C8C4BA] mt-1">Illustrative session · augle.com</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

/* ─── Illustrative session store ───
   Placeholder for the real data store — swap getSessionById for a lookup
   against the production session backend when it exists. */
const SESSIONS_BY_ID: Record<string, OutcomeSession> = {
  [SESSION_MARKETS.id]: SESSION_MARKETS,
  [SESSION_LS.id]: SESSION_LS,
};

function getSessionById(id: string): OutcomeSession | undefined {
  return SESSIONS_BY_ID[id];
}

export default function OutcomeDetailRoute({ params }: { params: { id: string } }) {
  const session = getSessionById(params.id);
  if (!session) notFound();
  return <OutcomeDetailPage session={session} />;
}
