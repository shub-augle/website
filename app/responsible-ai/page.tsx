import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';

const PRINCIPLES = [
  {
    title: 'Findings, not verdicts',
    body: 'Augle never returns a bare answer. Every output is a Finding attached to a confidence grade — Established, Probable, Contested, or Gap — so the strength of the underlying evidence is always visible alongside the conclusion.',
  },
  {
    title: 'Dissent is preserved, not smoothed over',
    body: "Unresolved Strong objections from the Contrarian agent survive verbatim into the final output. Augle is architecturally forbidden from summarizing away disagreement to produce a cleaner-looking answer.",
  },
  {
    title: 'Integrity review is isolated from research reasoning',
    body: "The Guardian agent evaluates source integrity and can halt a session, but it is architecturally isolated from the research deliberation loop and cannot influence a finding. Its model identity is hidden from the other agents to prevent anchoring.",
  },
  {
    title: 'Multi-vendor ensemble, not a single model’s judgment',
    body: 'The seven-agent ensemble is deliberately spread across multiple model providers. No single lab’s training data, guardrails, or failure modes can unilaterally determine a finding.',
  },
  {
    title: 'Confidence bounds propagate one way only',
    body: "The Methodologist's validity bounds are a hard ceiling — no downstream agent, including the Synthesizer, can produce a conclusion more confident than its weakest supporting evidence node permits.",
  },
  {
    title: 'Every source is tiered, not treated as uniform',
    body: 'Evidence is classified into corpus tiers — Gold, Silver, or Flagged — before it can support a finding. Flagged sources are visible in the audit trail but cannot anchor an Established grade on their own.',
  },
];

export default function ResponsibleAIPage() {
  return (
    <div className="bg-sand min-h-screen">
      <Nav activeRoute="/responsible-ai" />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Responsible AI' }]} />

      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-[80px]">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-5">Responsible AI</div>
          <h1 className="font-serif text-[36px] lg:text-[64px] font-normal leading-[1.12] tracking-[-0.025em] text-dark mb-6 max-w-[760px]">
            Confidence you can<br /><em className="italic text-terracotta">interrogate, not just trust.</em>
          </h1>
          <p className="text-[19px] text-body leading-[1.8] max-w-[640px]">
            Augle is built on the premise that a research tool should show its work. Every finding carries its confidence grade, its dissent register, and its source tiering — so the person reading it can judge how much weight it deserves.
          </p>
        </div>
      </div>

      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">Our principles</div>
          <h2 className="font-serif text-[28px] lg:text-[44px] font-normal leading-[1.15] text-dark mb-10">Six commitments the architecture enforces.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {PRINCIPLES.map(({ title, body }) => (
              <div key={title} className="bg-surface border-[0.5px] border-border rounded-lg p-6">
                <p className="text-[16px] font-medium text-dark mb-2">{title}</p>
                <p className="text-[14px] text-body leading-[1.7]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">In practice</div>
          <h2 className="font-serif text-[28px] lg:text-[44px] font-normal leading-[1.15] text-dark mb-6">Where this shows up in the product.</h2>
          <div className="flex flex-col gap-4 max-w-[760px]">
            <p className="text-[16px] text-body leading-[1.85]">
              The Guardian system runs domain-specific integrity modes — Academic, Legal, Clinical, Financial, Editorial, and Markets — each with a different flag taxonomy appropriate to the stakes of that domain. A Clinical session applies stricter halt conditions than a Markets session.
            </p>
            <p className="text-[16px] text-body leading-[1.85]">
              Every session runs at a chosen depth tier — Rapid, Standard, or Deep — and the depth tier is disclosed alongside the finding. A Rapid finding is not presented with the same weight as a Deep one.
            </p>
            <p className="text-[16px] text-body leading-[1.85]">
              Prediction Markets sessions resolve against Kalshi and Polymarket only in v1, and report an Augle Brier score against the market's own Brier score — so calibration claims are checked against a real, external outcome, not graded by Augle itself.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-terracotta px-4 lg:px-[72px] py-24 text-center">
        <h2 className="font-serif text-[36px] lg:text-[52px] font-normal text-white leading-[1.12] mb-5 tracking-[-0.025em]">
          Questions about our approach?
        </h2>
        <p className="text-[19px] text-white/75 mb-10 leading-[1.7] max-w-[560px] mx-auto">
          We read every message that comes through, including ones on responsible AI practice.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/contact" className="text-[15px] font-medium text-terracotta bg-white px-8 py-[14px] rounded no-underline hover:opacity-90 transition-opacity">
            Contact us
          </Link>
          <Link href="/how-it-works/guardian" className="text-[15px] text-white/80 border-[0.5px] border-white/35 px-7 py-[14px] rounded no-underline hover:bg-white/10 transition-colors">
            Read about the Guardian system
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
