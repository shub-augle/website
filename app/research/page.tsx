import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';

const PAPERS = [
  {
    id: 'AUGLE-001P',
    date: 'May 2026',
    title: 'Augmented Deliberation via Seven-Agent Ensemble: Architecture, Phase Design, and Confidence Propagation',
    abstract: 'Introduces the Augle seven-agent ensemble — Guardian, Topic Architect, Cartographer, Methodologist, Contrarian, Synthesizer, and Pragmatist — and describes the three-phase deliberation architecture (Exploration, Deliberation, Synthesis). Defines confidence propagation, the Methodologist ceiling constraint, Grade Challenge mechanics, and the evidence nodes registry. The foundational architecture paper.',
    tags: ['Architecture', 'Phase design', 'Confidence propagation', 'AUGLE-001P'],
    zenodo: 'https://zenodo.org/records/20619123',
    ssrn: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6880718',
  },
  {
    id: 'AUGLE-002P',
    date: 'June 2026',
    title: 'Document Synthesis in Multi-Agent Deliberation: Evidence Ingestion, SVS Verification, and Guardian Integrity Scoring',
    abstract: "Describes the document ingestion pipeline, the Structured Verification System (SVS) for source validation, and the Guardian's integrity scoring across six modes: Academic, Legal, Clinical, Financial, Editorial, and Markets. Defines the Critical/Moderate/Low flag taxonomy, phase boundary clearance mechanics, and the evidence admission decision tree that governs what enters deliberation.",
    tags: ['Guardian', 'SVS', 'Document synthesis', 'AUGLE-002P'],
    zenodo: 'https://zenodo.org',
    ssrn: 'https://ssrn.com',
  },
  {
    id: 'AUGLE-003P',
    date: 'June 2026',
    title: 'Structured Verbal Sparring: Adversarial Steelmanning and Objection Resolution in Multi-Agent Deliberation',
    abstract: 'Introduces Structured Verbal Sparring (SVS) — the formal protocol governing Contrarian agent behaviour. Defines the steelman-first requirement, objection strength grades (Strong, Moderate, Speculative), resolution conditions, and the unresolved objection registry. Describes how dissent is preserved verbatim in session outputs and how the Contrarian\'s dissent register integrates with the Synthesizer\'s final finding.',
    tags: ['Contrarian', 'Adversarial pressure', 'Dissent scoring', 'AUGLE-003P'],
    zenodo: 'https://zenodo.org',
    ssrn: 'https://ssrn.com',
  },
  {
    id: 'AUGLE-004P',
    date: 'June 2026',
    title: 'Ground-Truth-Mapped Reasoning Corpus: Prediction Market Pairing, Corpus Quality Tiers, and Calibration Scoring Infrastructure',
    abstract: 'Describes the corpus infrastructure that maps Augle deliberation sessions to prediction market ground truth outcomes. Defines corpus quality tiers (Gold, Silver, Flagged), the Brier scoring methodology, and the calibration comparison framework against market consensus. Establishes the V3 Calibrator training protocol and the corpus accumulation threshold required (~5,000 resolved sessions) before supervised calibration training begins.',
    tags: ['Corpus', 'Brier scoring', 'Prediction markets', 'AUGLE-004P'],
    zenodo: 'https://zenodo.org',
    ssrn: 'https://ssrn.com',
  },
  {
    id: 'AUGLE-005P',
    date: 'June 2026',
    title: 'Real-Time Evidence Admission Protocol: Dynamic Evidence Integration During Active Deliberation Sessions',
    abstract: 'Describes the Real-Time Evidence Admission Protocol (REAP) — the mechanism by which new evidence submitted mid-session is evaluated, verified, and integrated without disrupting the deliberation in progress. Defines the evidence queue architecture, Guardian pre-screening for mid-session submissions, the confidence recalculation protocol, and the precedence rules governing phase boundary interactions when new evidence arrives near a phase transition.',
    tags: ['REAP', 'Evidence admission', 'Mid-session', 'AUGLE-005P'],
    zenodo: 'https://zenodo.org',
    ssrn: 'https://ssrn.com',
  },
  {
    id: 'AUGLE-006P',
    date: 'June 2026',
    title: 'Evidence-Triggered Session Reopen Conditions: Systematic Verdict Revision in Response to New Evidence and Market Resolution Events',
    abstract: 'Introduces the reopen condition framework — the structured specification of triggers that cause a resolved session\'s finding to be subject to mandatory revision. Defines reopen condition types (market event triggers, new evidence triggers, retraction triggers), the directionality requirement (upgrade or downgrade), and the session lineage graph that links parent sessions to their reopen descendants. Distinguishes reopen conditions in Prediction Markets mode from Letters & Science evidence-triggered conditions.',
    tags: ['Reopen conditions', 'Session lineage', 'Verdict fragility', 'AUGLE-006P'],
    zenodo: 'https://zenodo.org',
    ssrn: 'https://ssrn.com',
  },
  {
    id: 'AUGLE-007P',
    date: 'June 2026',
    title: 'Compounding Research Loops: Follow-On Session Generation from Knowledge Gaps, Unresolved Objections, and Resolved Reopen Conditions',
    abstract: 'Describes the follow-on session architecture — the mechanism by which knowledge gaps identified by the Cartographer, unresolved objections from the Contrarian, and triggered reopen conditions automatically generate proposed follow-on research questions. Defines the three-source generation system, priority tier assignment, lineage graph construction, and the user-facing proposal interface. Introduces the compounding research loop as a mechanism for iterative calibration improvement across session chains.',
    tags: ['Follow-on sessions', 'Research loops', 'Session lineage', 'AUGLE-007P'],
    zenodo: 'https://zenodo.org',
    ssrn: 'https://ssrn.com',
  },
];

export default function ResearchPage() {
  return (
    <div className="bg-sand min-h-screen">
      <Nav activeRoute="/company" />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Company', href: '/about' }, { label: 'Research + whitepapers' }]} />

      {/* HERO */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-[96px] grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 items-start">
          <div>
            <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-5">Research</div>
            <h1 className="font-serif text-[36px] lg:text-[56px] font-normal leading-[1.12] tracking-[-0.02em] text-dark mb-6">
              The architecture,<br />published.
            </h1>
            <p className="text-[18px] text-body leading-[1.85] mb-6">
              Seven research papers documenting the Augle system — the seven-agent ensemble, corpus pipeline, confidence scoring, reopen conditions, and evidence admission logic. Published on Zenodo and SSRN to establish prior art and contribute to the field of augmented deliberation. All papers are co-authored by Cory Kelly and Shubhanker Saxena.
            </p>
            {/* Stats */}
            <div className="flex gap-8">
              {[
                { num: '7', label: 'Published papers' },
                { num: '7', label: 'Provisional patents' },
                { num: '2', label: 'Repositories' },
              ].map(({ num, label }) => (
                <div key={label}>
                  <div className="font-serif text-[36px] text-terracotta leading-none mb-1">{num}</div>
                  <div className="text-[13px] text-muted">{label}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Repository panel */}
          <div className="bg-surface border-[0.5px] border-border rounded-lg overflow-hidden">
            <div className="px-5 py-4 border-b-[0.5px] border-border bg-[#EAE6DC]">
              <span className="font-mono text-[10px] tracking-[0.08em] text-muted uppercase">Publication record</span>
            </div>
            {[
              { label: 'Primary DOI', val: '10.5281/zenodo.20619123', mono: true },
              { label: 'SSRN ID', val: '6880718', mono: true },
              { label: 'Authors', val: 'Cory Kelly · Shubhanker Saxena' },
              { label: 'Acknowledged', val: 'Steve Dowdell (all seven papers)' },
              { label: 'Published', val: 'May–June 2026' },
              { label: 'Repositories', val: 'Zenodo + SSRN' },
              { label: 'arXiv', val: 'Pending endorsement' },
              { label: 'Patents', val: '7 provisionals · AUGLE-001P–007P' },
            ].map(({ label, val, mono }) => (
              <div key={label} className="flex items-start justify-between px-5 py-3 border-b-[0.5px] border-border last:border-0">
                <span className="font-mono text-[11px] text-muted min-w-[100px] flex-shrink-0">{label}</span>
                <span className={`text-right max-w-[200px] leading-[1.4] ${mono ? 'font-mono text-[11px] text-terracotta' : 'text-[13px] text-dark'}`}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PAPERS */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">All publications</div>
          <h2 className="font-serif text-[28px] lg:text-[44px] font-normal text-dark leading-[1.15] mb-16">Seven papers.<br />One system.</h2>
          <div className="flex flex-col divide-y-[0.5px] divide-border">
            {PAPERS.map(({ id, date, title, abstract, tags, zenodo, ssrn }) => (
              <div key={id} className="py-10 first:pt-0 grid grid-cols-1 lg:grid-cols-[1fr_160px] gap-6">
                <div>
                  <div className="font-mono text-[11px] text-terracotta mb-2">{id}</div>
                  <h3 className="font-serif text-[20px] lg:text-[22px] font-normal text-dark leading-[1.3] mb-3">{title}</h3>
                  <p className="text-[13px] text-body leading-[1.7] mb-4">Cory Kelly · Shubhanker Saxena · Acknowledged: Steve Dowdell</p>
                  <p className="text-[13px] text-body leading-[1.7] mb-5">{abstract}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {tags.map(tag => (
                      <span key={tag} className={`font-mono text-[10px] px-[9px] py-[3px] rounded-[3px] border-[0.5px] ${tag.startsWith('AUGLE') ? 'bg-[#FBF5F2] text-terracotta border-terracotta' : 'bg-[#EAE6DC] text-muted border-border'}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <a href={zenodo} target="_blank" rel="noopener noreferrer"
                      className="font-mono text-[11px] px-4 py-[6px] rounded border-[0.5px] bg-terracotta text-white border-terracotta no-underline hover:opacity-90 transition-opacity flex items-center gap-1">
                      ↗ Zenodo
                    </a>
                    <a href={ssrn} target="_blank" rel="noopener noreferrer"
                      className="font-mono text-[11px] px-4 py-[6px] rounded border-[0.5px] bg-[#EAE6DC] text-body border-border no-underline hover:border-terracotta hover:text-terracotta transition-colors flex items-center gap-1">
                      ↗ SSRN
                    </a>
                  </div>
                </div>
                <div className="flex flex-col items-start lg:items-end gap-1">
                  <span className="font-mono text-[11px] text-muted">{date}</span>
                  <span className="font-mono text-[10px] text-[#C8C4BA] tracking-[0.04em]">{id}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CITATION */}
      <div className="bg-dark border-b-[0.5px] border-[#49443F]">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="font-serif text-[28px] lg:text-[36px] font-normal text-white mb-4">Citing this work.</h2>
            <p className="text-[16px] text-[#6A645E] leading-[1.85] mb-6">
              The Augle research corpus is open and citable. If you reference the deliberation architecture in your own research, please use the Zenodo DOI for the primary citation. The seven papers are distinct publications — cite the specific paper that covers the component you're referencing.
            </p>
            <p className="text-[14px] text-[#6A645E] leading-[1.6]">
              The Zenodo timestamps establish prior art. The SSRN submissions extend visibility. Both repositories are the authoritative sources — the papers are not behind a paywall.
            </p>
          </div>
          <div>
            <div className="font-mono text-[10px] tracking-[0.06em] text-[#6A645E] uppercase mb-3">Primary citation</div>
            <div className="bg-[#262321] border-[0.5px] border-[#49443F] rounded-[6px] p-5 font-mono text-[12px] text-[#B0ADA5] leading-[1.7] mb-3">
              Kelly, C., & Saxena, S. (2026). Augmented Deliberation via Seven-Agent Ensemble: Architecture, Phase Design, and Confidence Propagation. Zenodo. https://doi.org/10.5281/zenodo.20619123
            </div>
            <p className="text-[13px] text-[#6A645E] leading-[1.6]">
              For specific components, cite the corresponding paper directly. The SSRN Abstract ID is 6880718 for the primary paper.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-terracotta px-4 lg:px-[72px] py-24 text-center">
        <h2 className="font-serif text-[36px] lg:text-[52px] font-normal text-white leading-[1.1] mb-5 tracking-[-0.02em]">
          The architecture is open.<br />The platform is building.
        </h2>
        <p className="text-[19px] text-white/75 mb-10 leading-[1.7]">
          Read the papers. Then join the waitlist and run a real question through the system.
        </p>
        <div className="flex items-center justify-center gap-5 flex-wrap">
          <Link href="/waitlist" className="text-[15px] font-medium text-terracotta bg-white px-8 py-[14px] rounded no-underline hover:opacity-90 transition-opacity">Join waitlist</Link>
          <Link href="/about" className="text-[15px] text-white/80 border-[0.5px] border-white/35 px-7 py-[14px] rounded no-underline hover:bg-white/10 transition-colors">About Augle</Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
