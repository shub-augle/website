import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';

const BUILT_ITEMS = [
  {
    eyebrow: '01 · Architecture',
    title: 'Unidirectional confidence propagation',
    body: 'Confidence bounds established by the Methodologist agent serve as hard upper constraints on the Synthesizer and Pragmatist. No downstream agent can produce a finding more confident than the evidence warrants. This constraint is architectural — it cannot be overridden by prompting, context, or user instruction.',
  },
  {
    eyebrow: '02 · Integrity',
    title: 'Phase-boundary Guardian layer',
    body: 'An independent integrity agent operates exclusively at phase boundaries — outside the research deliberation loop. It authenticates every source in real time, holds halt authority over the entire session, and operates with a hidden model identity to prevent anchoring effects on other agents and users. It cannot produce findings. It cannot be influenced by the deliberation.',
  },
  {
    eyebrow: '03 · Calibration',
    title: 'Ground-truth-mapped reasoning corpus',
    body: 'Every session produces a structured reasoning artifact mapped to a verifiable outcome — a prediction market contract that resolves to binary ground truth. As the corpus grows, Augle builds the only dataset of its kind: calibrated multi-agent deliberation traces mapped to real-world outcomes. This corpus is the moat. It does not exist anywhere else.',
  },
];

const WHAT_WE_BUILD = [
  {
    eyebrow: 'Architecture',
    title: 'Seven-agent deliberation ensemble',
    body: 'A structured multi-agent system where each agent has a defined role, typed output contract, and a set of things it is architecturally forbidden from doing. The ensemble produces findings that no individual model can produce alone.',
  },
  {
    eyebrow: 'Integrity',
    title: 'Guardian integrity layer',
    body: 'An independent integrity agent operating at every phase boundary with halt authority, real-time source verification, and hidden model identity. It does not participate in deliberation. It certifies it.',
  },
  {
    eyebrow: 'Calibration',
    title: 'Calibrated reasoning corpus',
    body: 'Every session produces a structured reasoning artifact mapped to a verifiable binary outcome. The corpus is the moat — calibrated multi-agent deliberation traces mapped to ground truth. It does not exist anywhere else.',
  },
];

const FOUNDATION_STATS = [
  {
    num: '7',
    label: 'Provisional patents filed',
    body: 'USPTO applications covering all core architectural innovations. Filing window: June 4–19, 2026. Non-provisional deadlines begin June 2027.',
  },
  {
    num: '7',
    label: 'Peer-reviewed preprints published',
    body: 'Co-authored by the Augle team. Published on Zenodo and SSRN. Zenodo DOI: 10.5281/zenodo.20619123. SSRN Abstract ID: 6880718.',
  },
  {
    num: '100%',
    label: 'Ensemble shipped and operational',
    body: 'All seven agents deployed across the full three-phase deliberation arc. Guardian integrity layer active. Source Verification Service operational.',
  },
];

const PATENTS = [
  { id: 'AUGLE-001P', title: 'Seven-agent ensemble · Confidence propagation · Guardian layer' },
  { id: 'AUGLE-002P', title: 'Corpus-driven document synthesis · Adversarial pre-submission review' },
  { id: 'AUGLE-003P', title: 'Source Verification Service · Confidence-tiered evidence downgrade' },
  { id: 'AUGLE-004P', title: 'Ground-truth-mapped reasoning corpus · Prediction market pairing' },
  { id: 'AUGLE-005P', title: 'Round-Aware Evidence Admission Protocol (REAP)' },
  { id: 'AUGLE-006P', title: 'Verdict fragility · Structured reopen conditions' },
  { id: 'AUGLE-007P', title: 'Automated follow-on session generation · Session lineage tracking' },
];

const RESEARCH_ROWS = [
  { id: 'SSRN', title: 'Abstract ID 6880718' },
  { id: 'Zenodo', title: 'DOI 10.5281/zenodo.20619123' },
  { id: 'Authors', title: 'Cory Kelly · Shubhanker Saxena' },
  { id: 'Published', title: 'May–June 2026' },
];

const CONTACT_ROWS = [
  { label: 'General', value: 'hello@augle.com', href: 'mailto:hello@augle.com' },
  { label: 'Press', value: 'press@augle.com', href: 'mailto:press@augle.com' },
  { label: 'Website', value: 'augle.com', href: 'https://augle.com' },
];

export default function AboutPage() {
  return (
    <div className="bg-sand min-h-screen">
      <Nav activeRoute="/company" />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />

      {/* HERO */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-[96px]">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-5">About Augle</div>
          <h1 className="font-serif text-[36px] lg:text-[64px] font-normal leading-[1.12] tracking-[-0.025em] text-dark mb-7 max-w-[800px]">
            We built the platform<br />we couldn't find<br /><em className="italic text-terracotta">anywhere else.</em>
          </h1>
          <div className="flex flex-col gap-5 max-w-[680px]">
            <p className="text-[19px] text-body leading-[1.8]">
              Single AI models produce confident answers. That's not the same as correct answers. The confidence problem in AI isn't about better prompting — it's structural. No individual model has the architecture to challenge its own reasoning, authenticate its own sources, or preserve the objections it can't resolve.
            </p>
            <p className="text-[19px] text-body leading-[1.8]">
              Augle is built on a different premise: rigorous reasoning is a property of a system, not a property of any individual model. You build it through structure — through a seven-agent ensemble where each agent has a defined role, a typed output contract, and a set of things it is architecturally forbidden from doing.
            </p>
          </div>
        </div>
      </div>

      {/* MISSION */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-7">Mission</div>
          <blockquote className="font-serif text-[24px] lg:text-[32px] font-normal italic leading-[1.5] text-dark pl-7 border-l-[3px] border-terracotta mb-7 max-w-[800px]">
            "Rigorous reasoning is a structural property — not a property of any individual model. You cannot prompt your way to it. You build it."
          </blockquote>
          <p className="text-[16px] text-body leading-[1.8] max-w-[680px]">
            Augle exists to make structured, accountable deliberation accessible for the questions that matter most. Not summaries. Not confident guesses. Evidence-anchored findings with calibrated confidence grades, a full audit trail, and the preserved objections that the system couldn't resolve — so you know exactly where the edges of your knowledge are before the stakes are live.
          </p>
        </div>
      </div>

      {/* PULL QUOTE */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20">
          <p className="font-serif text-[28px] lg:text-[32px] font-normal text-dark leading-[1.4] max-w-[820px]">
            Augle is building the infrastructure for calibrated reasoning at scale. The deliberation corpus is the asset. The platform is how it's built.
          </p>
        </div>
      </div>

      {/* WHAT WE BUILT — light */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-5">What we built</div>
          <h2 className="font-serif text-[28px] lg:text-[44px] font-normal text-dark leading-[1.15] mb-12">
            Three architectural innovations<br />that didn't exist before Augle.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {BUILT_ITEMS.map(({ eyebrow, title, body }) => (
              <div key={eyebrow} className="bg-surface border-[0.5px] border-border rounded-lg p-7">
                <div className="font-mono text-[10px] tracking-[0.08em] text-terracotta uppercase mb-3">{eyebrow}</div>
                <div className="font-serif text-[20px] font-normal text-dark mb-3 leading-[1.3]">{title}</div>
                <p className="text-[13px] text-body leading-[1.75]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WHAT WE BUILD — dark */}
      <div className="bg-dark border-b-[0.5px] border-[#49443F]">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-14">
          <div className="font-mono text-[10px] tracking-[0.1em] text-terracotta uppercase mb-10">What we build</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[#49443F] border-[0.5px] border-[#49443F] rounded-lg overflow-hidden">
            {WHAT_WE_BUILD.map(({ eyebrow, title, body }) => (
              <div key={eyebrow} className="bg-[#262321] p-8">
                <div className="font-mono text-[10px] tracking-[0.08em] text-terracotta uppercase mb-3">{eyebrow}</div>
                <div className="font-serif text-[20px] font-normal text-white mb-3 leading-[1.3]">{title}</div>
                <p className="text-[13px] text-[#6A645E] leading-[1.75]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOUNDATION STATS */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-5">Foundation</div>
          <h2 className="font-serif text-[28px] lg:text-[44px] font-normal text-dark leading-[1.15] mb-12">
            Prior art established.<br />Architecture protected.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-border border-[0.5px] border-border rounded-lg overflow-hidden">
            {FOUNDATION_STATS.map(({ num, label, body }) => (
              <div key={label} className="bg-surface px-8 py-8">
                <div className="font-serif text-[48px] font-normal text-dark leading-none mb-2">{num}</div>
                <div className="text-[14px] font-medium text-dark mb-2">{label}</div>
                <p className="text-[13px] text-muted leading-[1.6]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* IP + RESEARCH */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20 grid grid-cols-1 lg:grid-cols-2 gap-[60px]">
          {/* Patents */}
          <div>
            <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">Patent portfolio</div>
            <h3 className="font-serif text-[24px] font-normal text-dark leading-[1.3] mb-3">Seven provisional patents.</h3>
            <p className="text-[14px] text-body leading-[1.75] mb-6">
              Every core architectural innovation is protected. The filing window spans June 4 through June 19, 2026 — non-provisional deadlines begin June 2027.
            </p>
            <div className="flex flex-col divide-y-[0.5px] divide-border">
              {PATENTS.map(({ id, title }) => (
                <div key={id} className="flex items-baseline gap-3 py-[10px]">
                  <span className="font-mono text-[11px] text-terracotta min-w-[100px] flex-shrink-0">{id}</span>
                  <span className="text-[13px] text-body leading-[1.5]">{title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Research */}
          <div>
            <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">Research</div>
            <h3 className="font-serif text-[24px] font-normal text-dark leading-[1.3] mb-3">Seven papers. One architecture. All open.</h3>
            <p className="text-[14px] text-body leading-[1.75] mb-6">
              Augle publishes its research. Every architectural decision is documented in peer-reviewed preprints available on Zenodo and SSRN. This isn't marketing — it's the timestamped prior art record that establishes Augle's architectural precedence.
            </p>
            <div className="flex flex-col divide-y-[0.5px] divide-border mb-5">
              {RESEARCH_ROWS.map(({ id, title }) => (
                <div key={id} className="flex items-baseline gap-3 py-[10px]">
                  <span className="font-mono text-[11px] text-terracotta min-w-[80px] flex-shrink-0">{id}</span>
                  <span className="text-[13px] text-body leading-[1.5]">{title}</span>
                </div>
              ))}
            </div>
            <Link href="/research" className="text-[13px] text-terracotta font-medium no-underline hover:underline">
              Browse all seven papers →
            </Link>
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">Contact</div>
            <h2 className="font-serif text-[32px] lg:text-[44px] font-normal text-dark leading-[1.15] mb-5">Work with us.</h2>
            <p className="text-[16px] text-body leading-[1.8] mb-8">
              Augle is accepting early access requests from researchers, analysts, and institutional teams. For partnership, research collaboration, or platform enquiries, reach out directly.
            </p>
            <Link href="/waitlist"
              className="inline-block text-[15px] font-medium text-white bg-terracotta px-7 py-[14px] rounded no-underline hover:opacity-[0.88] transition-opacity">
              Join waitlist →
            </Link>
          </div>
          <div className="flex flex-col divide-y-[0.5px] divide-border">
            {CONTACT_ROWS.map(({ label, value, href }) => (
              <div key={label} className="flex items-center justify-between py-4 first:pt-0">
                <span className="font-mono text-[11px] tracking-[0.06em] text-muted uppercase">{label}</span>
                <a href={href} className="text-[14px] text-terracotta no-underline hover:underline">{value}</a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-terracotta px-4 lg:px-[72px] py-24 text-center">
        <h2 className="font-serif text-[36px] lg:text-[52px] font-normal text-white leading-[1.1] mb-5 tracking-[-0.02em]">
          The architecture is built.<br />The corpus is accumulating.
        </h2>
        <p className="text-[19px] text-white/75 mb-10 leading-[1.7]">
          Request early access and run a session on a question that matters to your work.
        </p>
        <div className="flex items-center justify-center gap-5 flex-wrap">
          <Link href="/waitlist" className="text-[15px] font-medium text-terracotta bg-white px-8 py-[14px] rounded no-underline hover:opacity-90 transition-opacity">
            Join waitlist
          </Link>
          <Link href="/research" className="text-[15px] text-white/80 border-[0.5px] border-white/35 px-7 py-[14px] rounded no-underline hover:bg-white/10 transition-colors">
            Read the research
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
