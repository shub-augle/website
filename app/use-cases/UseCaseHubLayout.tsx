'use client';

import { useState } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';

/* ─── Types ─── */
export interface AgentBlock { name: string; text: string }
export interface OutputRow { key: string; val: string; accent?: boolean }
export interface SessionData {
  num: string;
  name: string;
  persona: string;
  question: string;
  tags: { label: string; variant: 'ls' | 'markets' | 'rapid' | 'standard' | 'deep' | 'guardian' }[];
  agentBlocks: AgentBlock[];
  output: OutputRow[];
  unresolvedObjection?: string;
  reopenCondition?: string;
  sessionLink: string;
}

export interface RelatedCard { eyebrow: string; name: string; desc: string; href: string }

export interface HubData {
  slug: string;
  activeSlug: string;
  breadcrumbLabel: string;
  eyebrow: string;
  heroTitle: string;
  heroBody: string;
  heroLinks: string[];
  panelRows: { label: string; value: string; accent?: boolean; link?: string }[];
  sessions: SessionData[];
  relatedCards: RelatedCard[];
  ctaTitle: string;
  ctaBody: string;
  ctaSolutionHref: string;
  ctaSolutionLabel: string;
}

/* ─── All hub nav chips ─── */
const ALL_HUBS = [
  { label: 'Universities + academia', href: '/use-cases/universities' },
  { label: 'Research labs', href: '/use-cases/research-labs' },
  { label: 'Policy + lawmakers', href: '/use-cases/policy' },
  { label: 'Law firms', href: '/use-cases/law-firms' },
  { label: 'Venture capital + PE', href: '/use-cases/venture-capital' },
  { label: 'Think tanks', href: '/use-cases/think-tanks' },
  { label: 'Enterprise', href: '/use-cases/enterprise' },
  { label: 'Healthcare + life sciences', href: '/use-cases/healthcare' },
  { label: 'Government', href: '/use-cases/government' },
  { label: 'Financial services', href: '/use-cases/financial-services' },
  { label: 'Media + journalism', href: '/use-cases/media' },
];

/* ─── Tag styles ─── */
const TAG_STYLE: Record<string, string> = {
  ls: 'bg-[#1E2A10] text-[#6A9E6A]',
  markets: 'bg-[#1E2428] text-[#6A9AAA]',
  rapid: 'bg-[#EAE6DC] text-muted border-[0.5px] border-border',
  standard: 'bg-[#EAE6DC] text-muted border-[0.5px] border-border',
  deep: 'bg-[#2A1A10] text-terracotta',
  guardian: 'bg-[#FBF5F2] text-terracotta border-[0.5px] border-terracotta',
};

/* ─── Accordion session card ─── */
function SessionCard({ session, defaultOpen }: { session: SessionData; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`bg-surface border-b-[0.5px] border-border last:border-0 ${open ? 'bg-[#EAE6DC]' : ''}`}>
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left grid grid-cols-[1fr_auto] gap-6 items-start px-8 py-7 hover:bg-[#EAE6DC] transition-colors cursor-pointer bg-transparent border-none"
      >
        <div>
          <div className="font-mono text-[10px] tracking-[0.06em] text-terracotta uppercase mb-2">{session.num}</div>
          <div className="font-serif text-[22px] font-normal text-dark mb-1 leading-[1.3]">{session.name}</div>
          <div className="text-[13px] text-muted italic mb-3">{session.persona}</div>
          <p className="text-[13px] text-body italic px-4 py-3 bg-[#EAE6DC] rounded border-l-2 border-terracotta leading-[1.6] max-w-[640px]">
            {session.question}
          </p>
          <div className="flex gap-2 mt-3 flex-wrap">
            {session.tags.map(({ label, variant }) => (
              <span key={label} className={`font-mono text-[10px] px-[10px] py-[4px] rounded-[3px] ${TAG_STYLE[variant]}`}>
                {label}
              </span>
            ))}
          </div>
        </div>
        <span className={`font-mono text-[20px] flex-shrink-0 mt-1 ${open ? 'text-terracotta' : 'text-border'}`}>
          {open ? '−' : '+'}
        </span>
      </button>

      {/* Body */}
      {open && (
        <div className="px-8 pb-8">
          {/* Agent deliberation grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
            {session.agentBlocks.map(({ name, text }) => (
              <div key={name} className="bg-sand border-[0.5px] border-border rounded-lg p-4">
                <div className="font-mono text-[10px] tracking-[0.06em] text-terracotta uppercase mb-2">{name}</div>
                <p className="text-[13px] text-body leading-[1.65]">{text}</p>
              </div>
            ))}
          </div>

          {/* Session output */}
          <div className="bg-dark rounded-lg p-6">
            <div className="font-mono text-[10px] tracking-[0.06em] text-terracotta uppercase mb-4">Session output</div>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {session.output.map(({ key, val, accent }) => (
                <div key={key} className="bg-[#262321] rounded-lg p-3">
                  <div className="font-mono text-[9px] text-[#49443F] uppercase mb-[6px] tracking-[0.05em]">{key}</div>
                  <div className={`text-[12px] leading-[1.5] ${accent ? 'text-terracotta' : 'text-[#6A645E]'}`}>{val}</div>
                </div>
              ))}
            </div>

            {(session.unresolvedObjection || session.reopenCondition) && (
              <div className="bg-[#262321] rounded-lg p-4 mb-4">
                <div className="font-mono text-[9px] text-[#49443F] uppercase mb-2 tracking-[0.05em]">
                  {session.unresolvedObjection ? 'Unresolved objection' : 'Reopen condition'}
                </div>
                <p className="text-[13px] text-[#D4CFC6] leading-[1.5] italic">
                  {session.unresolvedObjection ?? session.reopenCondition}
                </p>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t-[0.5px] border-[#49443F]">
              <span className="text-[13px] text-[#6A645E]">Illustrative session · augle.com</span>
              <Link href={session.sessionLink} className="font-mono text-[13px] font-medium text-terracotta no-underline hover:underline">
                View full session record →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Layout ─── */
export default function UseCaseHubLayout({ hub }: { hub: HubData }) {
  return (
    <div className="bg-sand min-h-screen">
      <Nav activeRoute="/use-cases" />
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Use cases', href: '/use-cases' },
        { label: hub.breadcrumbLabel },
      ]} />

      {/* HERO */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-[96px] grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 items-start">
          <div>
            <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-5">{hub.eyebrow}</div>
            <h1 className="font-serif text-[36px] lg:text-[64px] font-normal leading-[1.12] tracking-[-0.025em] text-dark mb-6"
              dangerouslySetInnerHTML={{ __html: hub.heroTitle }} />
            <p className="text-[19px] text-body leading-[1.8] mb-8 max-w-[580px]">{hub.heroBody}</p>
            <div className="flex flex-col gap-2">
              {hub.heroLinks.map(link => (
                <div key={link} className="flex items-center gap-3">
                  <div className="w-[5px] h-[5px] rounded-full bg-terracotta flex-shrink-0" />
                  <span className="text-[14px] text-body">{link}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Panel */}
          <div className="bg-surface border-[0.5px] border-border rounded-lg overflow-hidden">
            <div className="px-5 py-3 border-b-[0.5px] border-border bg-[#EAE6DC]">
              <span className="font-mono text-[10px] tracking-[0.08em] text-muted uppercase">Vertical overview</span>
            </div>
            {hub.panelRows.map(({ label, value, accent, link }) => (
              <div key={label} className="flex items-baseline justify-between gap-3 px-5 py-3 border-b-[0.5px] border-border last:border-0">
                <span className="font-mono text-[10px] tracking-[0.05em] text-muted uppercase flex-shrink-0">{label}</span>
                <span className={`text-[13px] text-right leading-[1.4] ${accent ? 'text-terracotta font-medium' : 'text-dark'}`}>
                  {link ? (
                    <Link href={link} className="text-terracotta no-underline hover:underline">{value} →</Link>
                  ) : value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SESSIONS */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">Three sessions</div>
          <h2 className="font-serif text-[28px] lg:text-[44px] font-normal text-dark leading-[1.15] mb-4">The deliberation in full.</h2>
          <p className="text-[18px] text-body leading-[1.85] max-w-[640px] mb-12">
            Each session below shows the complete arc: question submitted, ensemble behaviour across agents, unresolved objections preserved verbatim, and the session output. Click any session to expand.
          </p>
          <div className="border-[0.5px] border-border rounded-lg overflow-hidden">
            {hub.sessions.map((session, i) => (
              <SessionCard key={session.num} session={session} defaultOpen={i === 0} />
            ))}
          </div>
        </div>
      </div>

      {/* RELATED */}
      <div className="bg-surface border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">Related</div>
          <h2 className="font-serif text-[28px] lg:text-[44px] font-normal text-dark leading-[1.15] mb-12">Where to go next.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {hub.relatedCards.map(({ eyebrow, name, desc, href }) => (
              <div key={name} className="bg-sand border-[0.5px] border-border rounded-lg p-6 hover:border-terracotta transition-colors">
                <div className="font-mono text-[10px] tracking-[0.06em] text-terracotta uppercase mb-2">{eyebrow}</div>
                <div className="font-serif text-[18px] font-normal text-dark mb-2 leading-[1.3]">{name}</div>
                <p className="text-[13px] text-body leading-[1.65] mb-4">{desc}</p>
                <Link href={href} className="text-[13px] text-terracotta no-underline hover:underline">View →</Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HUB NAV */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-10">
          <div className="font-mono text-[10px] tracking-[0.08em] text-muted uppercase mb-4">All use case hubs</div>
          <div className="flex flex-wrap gap-2">
            {ALL_HUBS.map(({ label, href }) => (
              <Link key={href} href={href}
                className={`font-mono text-[11px] px-4 py-[7px] rounded border-[0.5px] no-underline transition-colors ${href === `/use-cases/${hub.activeSlug}` ? 'bg-dark text-white border-dark' : 'bg-surface text-body border-border hover:border-dark'}`}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-terracotta px-4 lg:px-[72px] py-24 text-center">
        <h2 className="font-serif text-[36px] lg:text-[52px] font-normal text-white leading-[1.1] mb-5 tracking-[-0.02em]"
          dangerouslySetInnerHTML={{ __html: hub.ctaTitle }} />
        <p className="text-[19px] text-white/75 mb-10 leading-[1.7]">{hub.ctaBody}</p>
        <div className="flex items-center justify-center gap-5 flex-wrap">
          <Link href="/waitlist" className="text-[15px] font-medium text-terracotta bg-white px-8 py-[14px] rounded no-underline hover:opacity-90 transition-opacity">Join waitlist</Link>
          <Link href={hub.ctaSolutionHref} className="text-[15px] text-white/80 border-[0.5px] border-white/35 px-7 py-[14px] rounded no-underline hover:bg-white/10 transition-colors">
            {hub.ctaSolutionLabel}
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
