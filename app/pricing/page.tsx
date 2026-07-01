'use client';

import { useState } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';

interface TierCardProps {
  badge: string;
  name: string;
  subtitle: string;
  price: string;
  credits: string;
  specs: { label: string; val: string }[];
  features: { check: boolean; text: string }[];
  cta: string;
  note: string;
  recommended?: boolean;
}

function TierCard({ badge, name, subtitle, price, credits, specs, features, cta, note, recommended }: TierCardProps) {
  return (
    <div className={`border-[0.5px] rounded-lg overflow-hidden flex flex-col ${recommended ? 'border-terracotta bg-[#FBF5F2]' : 'border-border bg-surface'}`}>
      <div className={`p-7 flex-1 border-b-[0.5px] ${recommended ? 'border-[#E8C4B4]' : 'border-border'}`}>
        <span className={`font-mono text-[10px] tracking-[0.06em] uppercase block mb-[10px] ${recommended ? 'text-terracotta' : 'text-[#B0ADA5]'}`}>{badge}</span>
        <div className="font-serif text-[32px] font-normal text-dark mb-[6px]">{name}</div>
        <div className="text-[13px] text-muted italic mb-6">{subtitle}</div>
        <div className="flex items-baseline gap-2 mb-[6px]">
          <span className="font-serif text-[48px] font-normal text-terracotta leading-none">{price}</span>
        </div>
        <div className="font-mono text-[12px] text-[#B0ADA5] mb-6">{credits}</div>
        <div className={`h-[0.5px] mb-5 ${recommended ? 'bg-[#E8C4B4]' : 'bg-border'}`} />
        <div className="flex flex-col gap-[10px] mb-5">
          {specs.map(({ label, val }) => (
            <div key={label} className="flex gap-3 items-start">
              <span className="font-mono text-[10px] tracking-[0.05em] text-[#B0ADA5] uppercase min-w-[64px] flex-shrink-0 pt-[2px]">{label}</span>
              <span className="text-[13px] text-body leading-[1.5]">{val}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {features.map(({ check, text }) => (
            <div key={text} className="flex gap-[10px] items-start">
              <span className={`text-[13px] flex-shrink-0 mt-[1px] leading-[1.5] ${check ? 'text-terracotta' : 'text-border'}`}>{check ? '✓' : '✗'}</span>
              <span className={`text-[13px] leading-[1.5] ${check ? 'text-body' : 'text-border'}`}>{text}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={`px-7 py-[18px] border-t-[0.5px] ${recommended ? 'bg-[#F5E8E0] border-[#E8C4B4]' : 'bg-[#EAE6DC] border-border'}`}>
        <div className="flex items-center justify-between text-[14px] font-medium text-terracotta">{cta}<span>→</span></div>
        <div className="text-[12px] text-[#B0ADA5] mt-1">{note}</div>
      </div>
    </div>
  );
}

const TIERS: TierCardProps[] = [
  {
    badge: 'Rapid',
    name: 'Rapid',
    subtitle: 'Quick orientation — single round',
    price: '$0.20',
    credits: 'per session · 1 credit · ~3 minutes',
    specs: [
      { label: 'Agents', val: 'Cartographer + Synthesizer' },
      { label: 'Guardian', val: 'Not active' },
      { label: 'Rounds', val: 'Single round — no deliberation phases' },
      { label: 'Output', val: 'Preliminary evidence landscape + confidence-bounded finding' },
    ],
    features: [
      { check: true, text: 'Evidence terrain map — Settled / Contested / Unknown' },
      { check: true, text: 'Preliminary confidence-bounded finding' },
      { check: true, text: 'Knowledge gap register' },
      { check: false, text: 'No Guardian integrity verification' },
      { check: false, text: 'No Contrarian adversarial pressure' },
      { check: false, text: 'No audit trail' },
    ],
    cta: 'Use for initial orientation',
    note: 'Not recommended for high-stakes decisions',
  },
  {
    badge: 'Standard · Recommended',
    name: 'Standard',
    subtitle: 'Full deliberation — three phases',
    price: '$0.60',
    credits: 'per session · 3 credits · ~15 minutes',
    specs: [
      { label: 'Agents', val: 'Full seven-agent ensemble' },
      { label: 'Guardian', val: 'Active at all phase boundaries' },
      { label: 'Rounds', val: 'Exploration · Deliberation · Synthesis' },
      { label: 'Output', val: 'Evidence-anchored finding · unresolved objections · reopen conditions · audit trail' },
    ],
    features: [
      { check: true, text: 'Full seven-agent deliberation across three phases' },
      { check: true, text: 'Guardian SVS authentication on every citation' },
      { check: true, text: 'Contrarian adversarial pressure — steelmanned objections' },
      { check: true, text: 'Calibrated confidence grade — Established / Probable / Contested / Gap' },
      { check: true, text: 'Unresolved objections preserved verbatim in output' },
      { check: true, text: 'Full session audit trail — exportable' },
    ],
    cta: 'The right choice for most questions',
    note: 'Free for first session on every new account',
    recommended: true,
  },
  {
    badge: 'Deep',
    name: 'Deep',
    subtitle: 'Maximum adversarial pressure',
    price: '$1.20',
    credits: 'per session · 6 credits · ~45 minutes',
    specs: [
      { label: 'Agents', val: 'Full ensemble + flagship Contrarian' },
      { label: 'Contrarian', val: 'Opus tier — highest-capability steelmanning' },
      { label: 'Expert', val: 'Async domain expert interjection at P1/P2 boundary' },
      { label: 'Output', val: 'Everything in Standard + authenticated expert contribution' },
    ],
    features: [
      { check: true, text: 'Everything in Standard' },
      { check: true, text: 'Contrarian runs on Opus tier — maximum steelmanning quality' },
      { check: true, text: 'Async domain expert interjection — authenticated by Guardian before integration' },
      { check: true, text: 'Expert contribution enters evidence record as authenticated node' },
      { check: true, text: 'Deepest adversarial pressure available in any session' },
    ],
    cta: 'For the highest-stakes questions',
    note: 'Augle selects optimal models — you don\'t configure agents',
  },
];

const BUNDLES = [
  { credits: 10, price: '$2.00', rate: '$0.20 / credit', items: ['10 Rapid sessions, or', '3 Standard sessions + 1 credit remaining, or', '1 Deep session + 4 credits remaining'], best: false },
  { credits: 30, price: '$5.40', rate: '$0.18 / credit · 10% off', items: ['30 Rapid sessions, or', '10 Standard sessions, or', '5 Deep sessions, or', 'Any combination across all three tiers'], best: true },
  { credits: 50, price: '$8.00', rate: '$0.16 / credit · 20% off', items: ['50 Rapid sessions, or', '16 Standard sessions + 2 credits, or', '8 Deep sessions + 2 credits remaining'], best: false },
];

const FAQ_COLS = [
  [
    { q: 'Do credits expire?', a: "No. Credits you purchase are yours indefinitely. There's no billing cycle, no monthly reset, and no expiry date. You spend them when you need deliberation." },
    { q: 'Is the free session a real deliberation or a demo?', a: 'Real deliberation. Real API calls across all seven agents. Real Guardian source verification. The free session runs exactly the same architecture as a paid Standard session — we run real API calls and absorb the cost. There\'s no simulation, no canned output, and no version of the product you\'re not seeing.' },
    { q: 'What happens if the Guardian stops my session?', a: 'If the Guardian issues a Hard Block that permanently terminates the session, you receive a full credit refund. The flag record and the reason for termination are provided in full. Sessions that pause with a Soft Block do not trigger a refund — you can resolve the condition and continue.' },
    { q: 'When will Augle be publicly available?', a: "We're in early access now, accepting waitlist requests. We'll notify you by email when your account is ready. Join the waitlist below — we're working through it as quickly as the corpus build allows." },
  ],
  [
    { q: "What's the difference between Standard and Deep?", a: "Both run the full seven-agent ensemble across three phases with Guardian active. Deep adds the flagship Contrarian model (Opus tier for maximum steelmanning quality) and an asynchronous domain expert interjection at the Phase 1/Phase 2 boundary. Use Deep for the questions where the quality of adversarial pressure is most critical." },
    { q: 'Can I get a refund on unused credits?', a: 'Yes — unused credit bundles are refundable within 30 days of purchase. Once credits are spent on sessions, they cannot be refunded, but we issue full credit refunds on any session that terminates due to a Guardian Hard Block before the session is complete.' },
    { q: "I'm a researcher at a university. Is there an academic rate?", a: 'At current credit pricing ($0.60 for a full Standard deliberation), the academic use case is already cost-effective. We\'re building an institutional academia tier with volume access and compliance-ready output. Contact us and we\'ll work something out for your lab or department while that tier is in development.' },
    { q: 'Does Augle choose which models to use, or can I configure that?', a: 'Augle selects and manages all model assignments. Each agent is assigned to the model best suited to its role — you don\'t configure this, and you shouldn\'t have to. The model selection is part of what makes the deliberation reliable. Deep sessions automatically use the highest-capability available model for the Contrarian agent.' },
  ],
];

type WaitlistStatus = 'idle' | 'loading' | 'success' | 'error';

async function submitWaitlist(email: string, source: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source }),
    });
    const data = await res.json();
    return res.ok ? { ok: true } : { ok: false, error: data.error ?? 'Something went wrong.' };
  } catch {
    return { ok: false, error: 'Something went wrong.' };
  }
}

export default function PricingPage() {
  const [email, setEmail] = useState('');
  const [ctaEmail, setCtaEmail] = useState('');
  const [bannerStatus, setBannerStatus] = useState<WaitlistStatus>('idle');
  const [ctaStatus, setCtaStatus] = useState<WaitlistStatus>('idle');

  async function handleBannerSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBannerStatus('loading');
    const result = await submitWaitlist(email, 'pricing-banner');
    setBannerStatus(result.ok ? 'success' : 'error');
  }

  async function handleCtaSubmit(e: React.FormEvent) {
    e.preventDefault();
    setCtaStatus('loading');
    const result = await submitWaitlist(ctaEmail, 'pricing-cta');
    setCtaStatus(result.ok ? 'success' : 'error');
  }

  return (
    <div className="bg-sand min-h-screen">
      <Nav activeRoute="/pricing" />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Pricing' }]} />

      {/* HERO */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-[80px]">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-5">Pricing</div>
          <h1 className="font-serif text-[36px] lg:text-[64px] font-normal leading-[1.12] tracking-[-0.025em] text-dark mb-6 max-w-[800px]">
            Credits. No subscriptions.<br /><em className="italic text-terracotta">You pay for what you run.</em>
          </h1>
          <p className="text-[19px] text-body leading-[1.8] max-w-[640px] mb-9">
            Buy credits. Spend them on sessions. Credits never expire, there's no monthly commitment, and you get one free Standard session to run a real question before you spend anything. The ensemble runs the same regardless of tier — what changes is depth and deliberation time.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-border border-[0.5px] border-border rounded-lg overflow-hidden">
            {[
              { label: 'No subscription', text: 'No monthly fee. No seat count. Purchase credit bundles and spend them when you need deliberation — not on a schedule.' },
              { label: 'Credits never expire', text: "Credits you purchase don't disappear at the end of a billing cycle. They're yours until you use them." },
              { label: 'One free session', text: 'Every new account gets one Standard session at no cost. Real API calls, real deliberation — not a demo simulation.' },
            ].map(({ label, text }) => (
              <div key={label} className="bg-surface px-6 py-5">
                <div className="font-mono text-[10px] tracking-[0.08em] text-terracotta uppercase mb-2">{label}</div>
                <p className="text-[14px] text-body leading-[1.6]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WAITLIST BANNER */}
      <div className="bg-terracotta">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p className="text-[16px] text-white leading-[1.6]">
            <strong className="font-semibold">Augle is currently in early access.</strong> Pricing is live — join the waitlist and we'll notify you when your account is ready.
          </p>
          {bannerStatus === 'success' ? (
            <p className="text-[14px] text-white font-medium">You&apos;re on the list — we&apos;ll be in touch.</p>
          ) : (
            <form onSubmit={handleBannerSubmit} className="flex gap-3 items-center flex-shrink-0">
              <input
                type="email" required value={email} onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="text-[14px] px-4 py-[10px] rounded border-none bg-white text-dark w-[260px] font-sans placeholder:text-[#B0ADA5] outline-none"
              />
              <button type="submit" disabled={bannerStatus === 'loading'} className="text-[14px] font-medium text-terracotta bg-white px-5 py-[10px] rounded whitespace-nowrap cursor-pointer disabled:opacity-60">
                {bannerStatus === 'loading' ? 'Joining…' : 'Join waitlist'}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* SESSION TIERS */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">Session tiers</div>
          <h2 className="font-serif text-[28px] lg:text-[44px] font-normal leading-[1.15] text-dark mb-3">Three depths.<br />One ensemble.</h2>
          <p className="text-[18px] text-body leading-[1.85] max-w-[640px] mb-12">
            The same seven-agent architecture runs at every tier. What changes is the number of deliberation rounds, whether the Guardian is active, and whether the Contrarian runs at its highest capability. Most substantive research questions belong in Standard. Run Rapid when you need a fast orientation. Run Deep when the stakes are highest.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {TIERS.map(tier => <TierCard key={tier.name} {...tier} />)}
          </div>
        </div>
      </div>

      {/* CREDIT BUNDLES */}
      <div className="bg-surface border-b-[0.5px] border-border py-20">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px]">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">Credit bundles</div>
          <h2 className="font-serif text-[28px] lg:text-[44px] font-normal leading-[1.15] text-dark">Buy more, pay less<br />per credit.</h2>
          <p className="text-[18px] text-body leading-[1.85] mt-3 max-w-[640px]">
            All bundles are pay-once. Credits never expire. No renewal, no commitment. The best-value bundle covers 10 Standard sessions or 5 Deep sessions — enough to evaluate the platform thoroughly before committing further.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-12">
            {BUNDLES.map(({ credits, price, rate, items, best }) => (
              <div key={credits} className={`bg-sand border-[0.5px] rounded-lg p-7 relative ${best ? 'border-terracotta' : 'border-border'}`}>
                {best && (
                  <div className="absolute -top-[1px] right-5 font-mono text-[10px] text-white bg-terracotta px-[10px] py-1 rounded-b tracking-[0.06em] uppercase">Best value</div>
                )}
                <div className="font-serif text-[40px] font-normal text-dark mb-1">{credits}</div>
                <div className="text-[14px] text-[#B0ADA5] mb-5">credits</div>
                <div className="font-serif text-[28px] font-normal text-terracotta mb-1">{price}</div>
                <div className="font-mono text-[12px] text-[#B0ADA5] mb-5">{rate}</div>
                <div className="flex flex-col gap-[6px]">
                  {items.map(item => (
                    <div key={item} className="text-[13px] text-muted">
                      <span className="font-medium text-dark">{item.split(' ')[0]}</span>{' '}{item.split(' ').slice(1).join(' ')}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 px-5 py-4 bg-[#EAE6DC] border-[0.5px] border-border rounded-[6px] text-[13px] text-muted text-center leading-[1.6]">
            Credits never expire · No subscription required · Unused credits carry forward indefinitely · Refunds available for unused credit bundles within 30 days of purchase
          </div>
        </div>
      </div>

      {/* FREE SESSION */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          <div>
            <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">Free session</div>
            <h2 className="font-serif text-[28px] lg:text-[44px] font-normal text-dark leading-[1.15] mb-4">One Standard session.<br />On us. No card required.</h2>
            <p className="text-[18px] text-body leading-[1.85] mb-7">
              Every new account gets one Standard session at no cost — the full seven-agent deliberation across all three phases. Real API calls. Real Guardian verification. Real Contrarian pressure. Not a simulated demo.
            </p>
            <p className="text-[14px] text-muted leading-[1.7]">
              Run it on a question that matters to your work. If the output doesn't demonstrate the value of structured deliberation on your actual research question, you'll know before you spend anything. We're confident enough to run real sessions for free because the architecture speaks for itself.
            </p>
          </div>
          <div className="bg-dark rounded-lg p-7">
            <div className="font-mono text-[10px] tracking-[0.08em] text-terracotta uppercase mb-[18px]">Free session · what's included</div>
            {[
              { label: 'Session depth', val: 'Standard', accent: false },
              { label: 'Agents active', val: 'All seven', accent: false },
              { label: 'Guardian', val: 'Active', accent: true },
              { label: 'Contrarian', val: 'Active · Sonnet tier', accent: true },
              { label: 'Output', val: 'Full finding · audit trail', accent: false },
              { label: 'API calls', val: 'Real — not simulated', accent: false },
              { label: 'Credit card', val: 'Not required', accent: false },
              { label: 'Limit', val: 'One per account', accent: false },
            ].map(({ label, val, accent }) => (
              <div key={label} className="flex items-center justify-between py-3 border-b-[0.5px] border-[#49443F] last:border-0">
                <span className="text-[13px] text-[#6A645E]">{label}</span>
                <span className={`font-mono text-[12px] ${accent ? 'text-terracotta' : 'text-[#D4CFC6]'}`}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ENTERPRISE */}
      <div className="bg-dark border-t-[0.5px] border-b-[0.5px] border-[#49443F] py-20">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px]">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">Enterprise</div>
          <h2 className="font-serif text-[28px] lg:text-[44px] font-normal text-white leading-[1.15] mb-3">A different product<br />on the same engine.</h2>
          <p className="text-[18px] text-[#6A645E] leading-[1.85] max-w-[640px] mb-12">
            Enterprise isn't a markup on credits. It's a different access model built for institutional research teams — with SSO, data segregation, audit-ready export, and a dedicated account contact. Available when these features are built. Contact us now to get on the early access list.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[#49443F] border-[0.5px] border-[#49443F] rounded-lg overflow-hidden mb-8">
            {[
              { feature: 'SSO / SAML', desc: 'Role-based access controls, per-seat provisioning, and single sign-on integration for your organization\'s identity provider.' },
              { feature: 'Data segregation', desc: 'Segregated data environment with IP and confidentiality controls. Corpus opt-out available — your sessions stay yours.' },
              { feature: 'Audit-ready export', desc: 'Structured export with institutional letterhead and compliance formatting. Organization-wide session management and admin dashboard.' },
              { feature: 'Priority queue', desc: 'Guaranteed uptime SLA, no rate limits, and a priority dispatch queue for time-sensitive institutional research.' },
              { feature: 'Custom configuration', desc: 'Custom depth tiers, agent configuration, output templates, and direct API access for integration into institutional research workflows.' },
              { feature: 'Dedicated support', desc: 'Dedicated account contact, signed contract, vendor onboarding, invoicing on NET-30/60 terms, and priority support response.' },
            ].map(({ feature, desc }) => (
              <div key={feature} className="bg-[#262321] px-7 py-6 grid grid-cols-[180px_1fr] gap-5">
                <span className="text-[13px] font-medium text-[#D4CFC6]">{feature}</span>
                <span className="text-[13px] text-[#6A645E] leading-[1.6]">{desc}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <a href="mailto:hello@augle.com" className="text-[15px] font-medium text-dark bg-white px-6 py-[10px] rounded whitespace-nowrap no-underline hover:opacity-90 transition-opacity">
              Contact us about enterprise →
            </a>
            <span className="text-[14px] text-[#49443F] leading-[1.6]">
              Enterprise access is currently by arrangement. Contact us to discuss your institution's requirements and join the early access list.
            </span>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="border-b-[0.5px] border-border py-20">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px]">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">Common questions</div>
          <h2 className="font-serif text-[28px] lg:text-[44px] font-normal text-dark mb-12">Answered.</h2>
          <div className="flex flex-col lg:flex-row gap-14 items-start">
            {FAQ_COLS.map((col, ci) => (
              <div key={ci} className="flex flex-col gap-8 flex-1">
                {col.map(({ q, a }) => (
                  <div key={q}>
                    <div className="text-[16px] font-medium text-dark mb-[10px] leading-[1.4]">{q}</div>
                    <p className="text-[14px] text-muted leading-[1.7]">{a}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-terracotta px-4 lg:px-[72px] py-24 text-center">
        <h2 className="font-serif text-[36px] lg:text-[52px] font-normal text-white leading-[1.12] mb-5 tracking-[-0.025em]">
          Join the waitlist.<br />Run your first session free.
        </h2>
        <p className="text-[19px] text-white/75 mb-10 leading-[1.7]">
          Enter your email and we'll notify you when your account is ready.<br className="hidden lg:block" />
          No card required to join — or to run your first session.
        </p>
        {ctaStatus === 'success' ? (
          <p className="text-[16px] text-white font-medium max-w-[480px] mx-auto">You&apos;re on the list — we&apos;ll be in touch.</p>
        ) : (
          <form onSubmit={handleCtaSubmit} className="flex items-center justify-center gap-3 max-w-[480px] mx-auto">
            <input
              type="email" required value={ctaEmail} onChange={e => setCtaEmail(e.target.value)}
              placeholder="your@email.com"
              className="text-[15px] px-5 py-[14px] rounded border-none bg-white text-dark flex-1 font-sans placeholder:text-[#B0ADA5] outline-none"
            />
            <button type="submit" disabled={ctaStatus === 'loading'} className="text-[15px] font-medium text-terracotta bg-white px-6 py-[14px] rounded whitespace-nowrap cursor-pointer disabled:opacity-60">
              {ctaStatus === 'loading' ? 'Joining…' : 'Join waitlist'}
            </button>
          </form>
        )}
        <p className="text-[13px] text-white/50 mt-4">One free Standard session with every new account · Credits never expire · No subscription</p>
      </div>

      <Footer />
    </div>
  );
}
