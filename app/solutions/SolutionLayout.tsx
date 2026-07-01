import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';

/* ─── Types ─── */
export interface PanelRow { label: string; value: string; accent?: boolean }
export interface ProblemItem { title: string; body: string }
export interface UseCase {
  num: string;
  name: string;
  persona: string;
  badge: string;
  badgeVariant?: 'standard' | 'deep';
  question: string;
  highlights: { agent: string; text: string }[];
  outcome: { label: string; rows: { key: string; val: string }[] };
  value: string;
}
export interface WhyCard { title: string; body: string }

export interface VerticalData {
  slug: string;
  breadcrumbLabel: string;
  eyebrow: string;
  heroTitle: string; // raw HTML allowed e.g. "The committee<br>already knows<br><em>your weaknesses.</em>"
  heroBody: string;
  personas: string[];
  panelLabel: string;
  panelRows: PanelRow[];
  problemTitle: string;
  problemBody: string;
  problemQuestions: string[];
  problemItems: ProblemItem[];
  useCasesTitle: string;
  useCasesBody: string;
  useCases: UseCase[];
  howTitle: string;
  howSteps: { n: number; title: string; body: string }[];
  configLabel: string;
  configRows: { key: string; val: string }[];
  whyTitle: string;
  whyCards: WhyCard[];
  ctaTitle: string;
  ctaBody: string;
  activeSlug: string;
}

/* ─── Vertical chip list ─── */
const ALL_VERTICALS = [
  { label: 'Universities + academia', href: '/solutions/universities' },
  { label: 'Research labs', href: '/solutions/research-labs' },
  { label: 'Policy + lawmakers', href: '/solutions/policy' },
  { label: 'Law firms', href: '/solutions/law-firms' },
  { label: 'Venture capital + PE', href: '/solutions/venture-capital' },
  { label: 'Think tanks', href: '/solutions/think-tanks' },
  { label: 'Enterprise', href: '/solutions/enterprise' },
  { label: 'Healthcare + life sciences', href: '/solutions/healthcare' },
  { label: 'Government', href: '/solutions/government' },
  { label: 'Financial services', href: '/solutions/financial-services' },
  { label: 'Media + journalism', href: '/solutions/media' },
];

const BADGE_STYLE: Record<string, string> = {
  standard: 'bg-[#EAE6DC] text-body border-[0.5px] border-border',
  deep: 'bg-[#FBF5F2] text-terracotta border-[0.5px] border-terracotta',
};

/* ─── Layout component ─── */
export default function SolutionLayout({ v }: { v: VerticalData }) {
  return (
    <div className="bg-sand min-h-screen">
      <Nav activeRoute="/solutions" />
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Solutions', href: '/solutions' },
        { label: v.breadcrumbLabel },
      ]} />

      {/* ── HERO ── */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-[96px] grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 items-start">
          <div>
            <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-5">{v.eyebrow}</div>
            <h1 className="font-serif text-[36px] lg:text-[64px] font-normal leading-[1.12] tracking-[-0.025em] text-dark mb-6"
              dangerouslySetInnerHTML={{ __html: v.heroTitle }} />
            <p className="text-[19px] text-body leading-[1.8] mb-8 max-w-[580px]">{v.heroBody}</p>
            <div className="flex flex-col gap-2">
              {v.personas.map(p => (
                <div key={p} className="flex items-center gap-3">
                  <div className="w-[5px] h-[5px] rounded-full bg-terracotta flex-shrink-0" />
                  <span className="text-[14px] text-body">{p}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Config panel */}
          <div className="bg-surface border-[0.5px] border-border rounded-lg overflow-hidden">
            <div className="px-5 py-3 border-b-[0.5px] border-border bg-[#EAE6DC]">
              <span className="font-mono text-[10px] tracking-[0.08em] text-muted uppercase">{v.panelLabel}</span>
            </div>
            {v.panelRows.map(({ label, value, accent }) => (
              <div key={label} className="flex items-baseline justify-between gap-3 px-5 py-3 border-b-[0.5px] border-border last:border-0">
                <span className="font-mono text-[10px] tracking-[0.05em] text-muted uppercase flex-shrink-0">{label}</span>
                <span className={`text-[13px] text-right leading-[1.4] ${accent ? 'text-terracotta font-medium' : 'text-dark'}`}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PROBLEM ── */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">The problem</div>
            <h2 className="font-serif text-[28px] lg:text-[44px] font-normal text-dark leading-[1.15] mb-5"
              dangerouslySetInnerHTML={{ __html: v.problemTitle }} />
            <p className="text-[16px] text-body leading-[1.8] mb-8">{v.problemBody}</p>
            <div className="flex flex-col gap-2">
              {v.problemQuestions.map(q => (
                <div key={q} className="text-[13px] text-muted italic px-4 py-[10px] bg-surface rounded border-l-2 border-terracotta leading-[1.6]">
                  {q}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {v.problemItems.map(({ title, body }) => (
              <div key={title} className="bg-surface border-[0.5px] border-border rounded-lg p-5">
                <div className="text-[14px] font-medium text-dark mb-2">{title}</div>
                <p className="text-[13px] text-body leading-[1.65]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── USE CASES ── */}
      <div className="bg-dark border-b-[0.5px] border-[#49443F]">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">How it works in practice</div>
          <h2 className="font-serif text-[28px] lg:text-[44px] font-normal text-white leading-[1.15] mb-3"
            dangerouslySetInnerHTML={{ __html: v.useCasesTitle }} />
          <p className="text-[18px] text-[#6A645E] leading-[1.85] max-w-[640px] mb-12">{v.useCasesBody}</p>
          <div className="flex flex-col gap-4">
            {v.useCases.map(uc => (
              <div key={uc.num} className="bg-[#262321] border-[0.5px] border-[#49443F] rounded-lg overflow-hidden">
                {/* UC header */}
                <div className="px-7 py-5 border-b-[0.5px] border-[#49443F] flex items-start justify-between gap-4">
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.06em] text-terracotta uppercase mb-1">{uc.num}</div>
                    <div className="font-serif text-[22px] font-normal text-white mb-1">{uc.name}</div>
                    <div className="text-[13px] text-[#6A645E] italic">{uc.persona}</div>
                  </div>
                  <span className={`font-mono text-[10px] px-2 py-[4px] rounded flex-shrink-0 ${BADGE_STYLE[uc.badgeVariant ?? 'standard']}`}>
                    {uc.badge}
                  </span>
                </div>
                {/* UC body */}
                <div className="p-7 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
                  <div>
                    <p className="text-[13px] text-[#D4CFC6] italic leading-[1.6] px-4 py-3 bg-dark rounded border-l-2 border-terracotta mb-6">{uc.question}</p>
                    <div className="flex flex-col gap-3 mb-6">
                      {uc.highlights.map(({ agent, text }) => (
                        <div key={agent} className="flex gap-3 items-start">
                          <span className="font-mono text-[10px] text-terracotta bg-[#3D1A10] px-2 py-[3px] rounded flex-shrink-0 mt-[1px]">{agent}</span>
                          <p className="text-[13px] text-[#6A645E] leading-[1.6]">{text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    {/* Outcome */}
                    <div className="bg-dark border-[0.5px] border-[#49443F] rounded-lg overflow-hidden mb-4">
                      <div className="px-4 py-2 border-b-[0.5px] border-[#49443F]">
                        <span className="font-mono text-[9px] tracking-[0.06em] text-[#6A645E] uppercase">{uc.outcome.label}</span>
                      </div>
                      <div className="flex flex-col divide-y-[0.5px] divide-[#49443F]">
                        {uc.outcome.rows.map(({ key, val }) => (
                          <div key={key} className="flex gap-3 items-start px-4 py-2">
                            <span className="font-mono text-[9px] text-[#6A645E] uppercase min-w-[70px] flex-shrink-0 pt-[2px]">{key}</span>
                            <span className="text-[12px] text-[#B0ADA5] leading-[1.5]">{val}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Value */}
                    <div className="bg-terracotta rounded-lg p-4">
                      <div className="font-mono text-[9px] text-white/60 uppercase mb-2">The value</div>
                      <p className="text-[12px] text-white leading-[1.65]">{uc.value}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">How Augle works for {v.breadcrumbLabel.toLowerCase()}</div>
          <h2 className="font-serif text-[28px] lg:text-[44px] font-normal text-dark leading-[1.15] mb-12"
            dangerouslySetInnerHTML={{ __html: v.howTitle }} />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 items-start">
            <div className="flex flex-col gap-6">
              {v.howSteps.map(({ n, title, body }) => (
                <div key={n} className="flex gap-5 items-start">
                  <div className="w-8 h-8 rounded-full bg-terracotta flex items-center justify-center flex-shrink-0 font-mono text-[12px] text-white font-medium">{n}</div>
                  <div>
                    <div className="text-[15px] font-medium text-dark mb-1">{title}</div>
                    <p className="text-[13px] text-body leading-[1.65]">{body}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Config panel */}
            <div className="bg-dark rounded-lg overflow-hidden">
              <div className="px-5 py-3 border-b-[0.5px] border-[#49443F]">
                <span className="font-mono text-[10px] tracking-[0.08em] text-terracotta uppercase">{v.configLabel}</span>
              </div>
              {v.configRows.map(({ key, val }) => (
                <div key={key} className="grid grid-cols-[120px_1fr] gap-4 px-5 py-3 border-b-[0.5px] border-[#49443F] last:border-0">
                  <span className="text-[12px] text-[#B0ADA5] leading-[1.4]">{key}</span>
                  <span className="text-[12px] text-[#6A645E] leading-[1.5]">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── WHY AUGLE ── */}
      <div className="bg-surface border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">Why Augle for {v.breadcrumbLabel.toLowerCase()}</div>
          <h2 className="font-serif text-[28px] lg:text-[44px] font-normal text-dark leading-[1.15] mb-12"
            dangerouslySetInnerHTML={{ __html: v.whyTitle }} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {v.whyCards.map(({ title, body }) => (
              <div key={title} className="bg-sand border-[0.5px] border-border rounded-lg p-6">
                <div className="font-serif text-[18px] font-normal text-dark leading-[1.3] mb-3">{title}</div>
                <p className="text-[13px] text-body leading-[1.7]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── VERTICALS NAV ── */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-10">
          <div className="font-mono text-[10px] tracking-[0.08em] text-muted uppercase mb-4">All solution verticals</div>
          <div className="flex flex-wrap gap-2">
            {ALL_VERTICALS.map(({ label, href }) => (
              <Link key={href} href={href}
                className={`font-mono text-[11px] px-4 py-[7px] rounded border-[0.5px] no-underline transition-colors ${href === `/solutions/${v.activeSlug}` ? 'bg-dark text-white border-dark' : 'bg-sand text-body border-border hover:border-dark'}`}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="bg-terracotta px-4 lg:px-[72px] py-24 text-center">
        <h2 className="font-serif text-[36px] lg:text-[52px] font-normal text-white leading-[1.1] mb-5 tracking-[-0.02em]"
          dangerouslySetInnerHTML={{ __html: v.ctaTitle }} />
        <p className="text-[19px] text-white/75 mb-10 leading-[1.7]">{v.ctaBody}</p>
        <div className="flex items-center justify-center gap-5 flex-wrap">
          <Link href="/waitlist" className="text-[15px] font-medium text-terracotta bg-white px-8 py-[14px] rounded no-underline hover:opacity-90 transition-opacity">Join waitlist</Link>
          <Link href="/how-it-works" className="text-[15px] text-white/80 border-[0.5px] border-white/35 px-7 py-[14px] rounded no-underline hover:bg-white/10 transition-colors">How it works</Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
