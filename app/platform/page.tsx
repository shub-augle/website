import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';

const AGENTS = [
  { n: '—', name: 'Guardian', role: 'Integrity', desc: 'Architecturally isolated from the research loop. Evaluates integrity, holds halt authority, never contributes to findings.' },
  { n: '1', name: 'Topic Architect', role: 'Orchestration', desc: 'The only agent with a user-facing interface. Parses the question, sets depth tier, manages phase transitions.' },
  { n: '2', name: 'Cartographer', role: 'Landscape', desc: 'Dispatched first in every phase. Maps the evidence terrain into Settled / Contested / Unknown.' },
  { n: '3', name: 'Methodologist', role: 'Validity', desc: 'Issues confidence bounds across four validity dimensions — hard constraints on every downstream finding.' },
  { n: '4', name: 'Contrarian', role: 'Adversarial', desc: 'Steelmans, then challenges, every claim. Unresolved Strong objections surface verbatim in the final output.' },
  { n: '5', name: 'Synthesizer', role: 'Finding', desc: 'Temperature locked at zero. Anchors to the structured evidence registry to produce the finding.' },
  { n: '6', name: 'Pragmatist', role: 'Application', desc: 'Fires in Phase 3 only. Converts the finding into concrete next steps, bounded by the Synthesizer\'s confidence ceiling.' },
];

const PHASES = [
  { num: 'Phase 1', name: 'Exploration', label: 'Map the terrain' },
  { num: 'Phase 2', name: 'Deliberation', label: 'Apply adversarial pressure' },
  { num: 'Phase 3', name: 'Synthesis', label: 'Produce the finding' },
];

export default function PlatformPage() {
  return (
    <div className="bg-sand min-h-screen">
      <Nav activeRoute="/platform" />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Platform' }]} />

      {/* HERO */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-[80px]">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-5">Platform</div>
          <h1 className="font-serif text-[36px] lg:text-[64px] font-normal leading-[1.12] tracking-[-0.025em] text-dark mb-6 max-w-[760px]">
            One question in.<br /><em className="italic text-terracotta">A structured finding out.</em>
          </h1>
          <p className="text-[19px] text-body leading-[1.8] max-w-[640px]">
            Augle routes every research question through a seven-agent ensemble across three deliberation phases, with an isolated Guardian holding halt authority throughout. Nothing is summarized away — dissent, confidence bounds, and unresolved objections all survive to the final output.
          </p>
        </div>
      </div>

      {/* SESSION FLOW */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">Session flow</div>
          <h2 className="font-serif text-[28px] lg:text-[44px] font-normal leading-[1.15] text-dark mb-10">A fixed dispatch sequence, not a chat loop.</h2>

          <div className="flex flex-col lg:flex-row items-stretch gap-4">
            <div className="flex-1 bg-surface border-[0.5px] border-border rounded-lg p-6">
              <div className="font-mono text-[10px] tracking-[0.08em] text-muted uppercase mb-2">In</div>
              <p className="text-[15px] text-dark font-medium">Your research question</p>
              <p className="text-[13px] text-body mt-1">Topic Architect sets depth tier + Guardian mode</p>
            </div>
            <div className="flex items-center justify-center text-terracotta text-[20px] lg:rotate-0 rotate-90">→</div>
            {PHASES.map(p => (
              <div key={p.num} className="flex-1 bg-surface border-[0.5px] border-border rounded-lg p-6 relative">
                <div className="font-mono text-[10px] tracking-[0.08em] text-terracotta uppercase mb-2">{p.num}</div>
                <p className="text-[15px] text-dark font-medium">{p.name}</p>
                <p className="text-[13px] text-body mt-1">{p.label}</p>
              </div>
            ))}
            <div className="flex items-center justify-center text-terracotta text-[20px] lg:rotate-0 rotate-90">→</div>
            <div className="flex-1 bg-dark border-[0.5px] border-[#49443F] rounded-lg p-6">
              <div className="font-mono text-[10px] tracking-[0.08em] text-[#6A645E] uppercase mb-2">Out</div>
              <p className="text-[15px] text-white font-medium">Finding + confidence grade</p>
              <p className="text-[13px] text-[#B0ADA5] mt-1">Dissent register preserved verbatim</p>
            </div>
          </div>

          <p className="text-[13px] text-muted mt-6 max-w-[640px]">
            The Guardian holds halt authority at every phase boundary and is architecturally isolated from the research discourse — it can stop a session, but it cannot influence a finding.
          </p>
        </div>
      </div>

      {/* AGENT BREAKDOWN */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">Agent breakdown</div>
          <h2 className="font-serif text-[28px] lg:text-[44px] font-normal leading-[1.15] text-dark mb-10">Seven agents. Fixed roles. Typed handoffs.</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {AGENTS.map(a => (
              <div key={a.name} className={`border-[0.5px] rounded-lg p-5 ${a.n === '—' ? 'bg-dark border-[#49443F]' : 'bg-surface border-border'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`font-mono text-[10px] ${a.n === '—' ? 'text-terracotta' : 'text-muted'}`}>{a.n === '—' ? 'GUARDIAN' : `0${a.n}`}</span>
                  <span className={`font-mono text-[10px] tracking-[0.06em] uppercase ${a.n === '—' ? 'text-[#6A645E]' : 'text-muted'}`}>{a.role}</span>
                </div>
                <p className={`text-[15px] font-medium mb-2 ${a.n === '—' ? 'text-white' : 'text-dark'}`}>{a.name}</p>
                <p className={`text-[13px] leading-[1.6] ${a.n === '—' ? 'text-[#B0ADA5]' : 'text-body'}`}>{a.desc}</p>
              </div>
            ))}
          </div>

          <Link href="/how-it-works/agents" className="inline-block mt-8 text-[14px] text-terracotta no-underline hover:underline">
            Full agent spec table — output contracts, model assignment, forbidden actions →
          </Link>
        </div>
      </div>

      {/* ARCHITECTURE PRINCIPLES */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">Architecture principles</div>
          <h2 className="font-serif text-[28px] lg:text-[44px] font-normal leading-[1.15] text-dark mb-10">What the architecture enforces, not just recommends.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-border border-[0.5px] border-border rounded-lg overflow-hidden">
            {[
              { title: 'Unidirectional confidence propagation', body: 'A finding cannot exceed the confidence grade of its weakest supporting evidence node. Methodologist bounds are absolute — no agent downstream can override them.' },
              { title: 'Verbatim dissent preservation', body: 'Unresolved Strong Contrarian objections are never summarized or softened. They surface in the final output exactly as raised.' },
              { title: 'Guardian isolation', body: "The Guardian's model identity is hidden from every other agent to prevent anchoring. It can halt a session; it cannot shape a finding." },
            ].map(({ title, body }) => (
              <div key={title} className="bg-surface px-6 py-6">
                <p className="text-[15px] font-medium text-dark mb-2">{title}</p>
                <p className="text-[14px] text-body leading-[1.7]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-terracotta px-4 lg:px-[72px] py-24 text-center">
        <h2 className="font-serif text-[36px] lg:text-[52px] font-normal text-white leading-[1.12] mb-5 tracking-[-0.025em]">
          See the full architecture.
        </h2>
        <p className="text-[19px] text-white/75 mb-10 leading-[1.7] max-w-[560px] mx-auto">
          Phase-by-phase mechanics, the Guardian flag taxonomy, and the confidence propagation model — all documented.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/how-it-works" className="text-[15px] font-medium text-terracotta bg-white px-8 py-[14px] rounded no-underline hover:opacity-90 transition-opacity">
            Read how it works
          </Link>
          <Link href="/waitlist" className="text-[15px] text-white/80 border-[0.5px] border-white/35 px-7 py-[14px] rounded no-underline hover:bg-white/10 transition-colors">
            Join the waitlist
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
