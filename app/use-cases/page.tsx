import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';

const VERTICALS = [
  { id: 'universities', num: '01 / 11', name: 'Universities + academia', desc: 'PhD candidates, faculty researchers, and academic librarians stress-testing methodology claims, literature gaps, and dissertation arguments before submission or defence.', href: '/use-cases/universities', solutionsHref: '/solutions/universities' },
  { id: 'research-labs', num: '02 / 11', name: 'Research labs', desc: 'Corporate and independent research labs validating experimental findings, stress-testing publication claims, and reviewing competitive landscape assumptions before committing resources.', href: '/use-cases/research-labs', solutionsHref: '/solutions/research-labs' },
  { id: 'policy', num: '03 / 11', name: 'Policy + lawmakers', desc: 'Legislative staff, policy advisors, and regulatory analysts reviewing the evidence base behind proposed legislation and stress-testing counterarguments before committee hearings.', href: '/use-cases/policy', solutionsHref: '/solutions/policy' },
  { id: 'law-firms', num: '04 / 11', name: 'Law firms', desc: "Litigation partners, senior associates, and in-house counsel reviewing expert evidence, verifying case citations, and running opposing counsel's cross-examination before the hearing.", href: '/use-cases/law-firms', solutionsHref: '/solutions/law-firms' },
  { id: 'vc', num: '05 / 11', name: 'Venture capital + PE', desc: 'VC partners, PE associates, and growth equity teams stress-testing investment theses, TAM assumptions, and acquisition diligence before investment committee.', href: '/use-cases/venture-capital', solutionsHref: '/solutions/venture-capital' },
  { id: 'think-tanks', num: '06 / 11', name: 'Think tanks + nonprofits', desc: 'Research directors, advocacy teams, and programme officers running adversarial pre-publication review on policy papers, campaign evidence bases, and grant-funded research claims.', href: '/use-cases/think-tanks', solutionsHref: '/solutions/think-tanks' },
  { id: 'enterprise', num: '07 / 11', name: 'Enterprise', desc: 'Strategy teams, corporate development, and procurement functions stress-testing market entry analyses, vendor claims, and competitive intelligence before board-level decisions.', href: '/use-cases/enterprise', solutionsHref: '/solutions/enterprise' },
  { id: 'healthcare', num: '08 / 11', name: 'Healthcare + life sciences', desc: 'Medical affairs teams, HTA analysts, and clinical research directors reviewing clinical evidence to the standard it will face from regulators, payers, and ERG reviewers.', href: '/use-cases/healthcare', solutionsHref: '/solutions/healthcare' },
  { id: 'government', num: '09 / 11', name: 'Government + public sector', desc: 'Civil servants, policy teams, and legal advisors reviewing business cases, ministerial briefs, and decision records to the standard of NAO scrutiny, parliamentary committees, and judicial review.', href: '/use-cases/government', solutionsHref: '/solutions/government' },
  { id: 'financial', num: '10 / 11', name: 'Financial services', desc: 'Compliance teams, research analysts, and risk functions stress-testing compliance positions, equity research reports, and risk model assumptions before the regulator does.', href: '/use-cases/financial-services', solutionsHref: '/solutions/financial-services' },
  { id: 'media', num: '11 / 11', name: 'Media + journalism', desc: 'Investigative reporters, science editors, and data journalists stress-testing evidence, statistical claims, and source independence before publication enters the public record.', href: '/use-cases/media', solutionsHref: '/solutions/media' },
];

const CROSS_VERTICALS = [
  { title: 'Investment thesis validation', desc: 'Stress-testing the core assumptions behind a position before committing capital or publishing a recommendation.', chips: ['VC + PE', 'Financial services', 'Enterprise'] },
  { title: 'Pre-publication evidence review', desc: "Running the adversarial reader's review before research, policy papers, or journalism enters the public record.", chips: ['Think tanks', 'Media', 'Universities'] },
  { title: 'Regulatory compliance review', desc: "Validating a compliance position or regulatory submission against the standard the regulator's reviewer will apply.", chips: ['Law firms', 'Financial services', 'Healthcare'] },
  { title: 'Expert evidence stress-test', desc: 'Surfacing the methodological objection an opposing expert, regulator, or ERG reviewer will raise before the hearing or submission.', chips: ['Law firms', 'Healthcare', 'Government'] },
  { title: 'Market sizing validation', desc: 'Triangulating TAM claims and growth rate projections against independent sources before they enter an IC memo or investor presentation.', chips: ['VC + PE', 'Enterprise', 'Research labs'] },
  { title: 'Policy evidence base review', desc: 'Evaluating whether the evidence behind a policy recommendation generalises to the target population and scale.', chips: ['Policy', 'Government', 'Think tanks'] },
  { title: 'Grant + proposal evaluation', desc: 'Assessing whether the causal claims and evidence base in a research proposal survive independent methodological review.', chips: ['Universities', 'Think tanks', 'Research labs'] },
  { title: 'Competitive landscape assessment', desc: 'Mapping the full competitive picture — including announced moves the internal analysis has not accounted for.', chips: ['Enterprise', 'VC + PE', 'Research labs'] },
];

export default function UseCasesIndexPage() {
  return (
    <div className="bg-sand min-h-screen">
      <Nav activeRoute="/use-cases" />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Use cases' }]} />

      {/* HERO */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-[96px] grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 items-start">
          <div>
            <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-5">Use cases</div>
            <h1 className="font-serif text-[36px] lg:text-[64px] font-normal leading-[1.12] tracking-[-0.025em] text-dark mb-6">
              Thirty-three sessions.<br /><em className="italic text-terracotta">Eleven verticals.</em>
            </h1>
            <p className="text-[19px] text-body leading-[1.8] max-w-[600px]">
              Each use case illustrates a realistic Augle deliberation — the question, the ensemble's behaviour, the unresolved objections, and the output. Sessions span both Prediction Markets and Letters & Science modes across three depth tiers. Personas and questions are hypothetical illustrations of product capability.
            </p>
          </div>
          {/* Stats */}
          <div className="flex flex-col divide-y-[0.5px] divide-border border-[0.5px] border-border rounded-lg bg-surface overflow-hidden">
            {[
              { val: '33', label: 'Hypothetical sessions\nacross eleven verticals' },
              { val: '11', label: 'Solution verticals\ncovered' },
              { val: '2', label: 'Session modes\nPrediction Markets + L&S' },
              { val: '3', label: 'Depth tiers\nRapid · Standard · Deep' },
            ].map(({ val, label }) => (
              <div key={val} className="px-6 py-5 flex items-center gap-5">
                <div className="font-serif text-[36px] text-terracotta font-normal leading-none flex-shrink-0">{val}</div>
                <div className="text-[13px] text-body leading-[1.5] whitespace-pre-line">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="bg-surface border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-4 flex items-center gap-3 flex-wrap">
          <span className="font-mono text-[10px] text-muted uppercase">Jump to</span>
          {VERTICALS.map(({ id, name }) => (
            <a key={id} href={`#${id}`}
              className="font-mono text-[11px] px-3 py-[5px] rounded border-[0.5px] border-border bg-sand text-body hover:border-terracotta hover:text-terracotta transition-colors no-underline">
              {name.split(' ')[0]}
            </a>
          ))}
        </div>
      </div>

      {/* VERTICALS */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-16">
          <div className="flex flex-col gap-12">
            {VERTICALS.map(({ id, num, name, desc, href, solutionsHref }) => (
              <div key={id} id={id} className="border-t-[0.5px] border-border pt-8 first:border-0 first:pt-0">
                <div className="flex items-start justify-between gap-6 mb-6">
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.06em] text-[#B0ADA5] mb-1">{num}</div>
                    <h2 className="font-serif text-[24px] font-normal text-dark leading-[1.3] mb-2">{name}</h2>
                    <p className="text-[14px] text-body leading-[1.65] max-w-[560px]">{desc}</p>
                  </div>
                  <Link href={solutionsHref} className="font-mono text-[11px] text-terracotta no-underline hover:underline whitespace-nowrap flex-shrink-0 pt-[3px]">
                    View solutions page →
                  </Link>
                </div>
                {/* Session cards — compact index view */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* These are placeholder cards linking through to hub; session data lives in hub pages */}
                  <Link href={href} className="bg-surface border-[0.5px] border-border rounded-lg p-5 hover:border-terracotta transition-colors no-underline group">
                    <div className="font-mono text-[9px] text-muted uppercase mb-1">Use case 01 of 03</div>
                    <div className="text-[13px] font-medium text-dark group-hover:text-terracotta transition-colors">View all three sessions →</div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CROSS-VERTICAL */}
      <div className="bg-surface border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">Cross-vertical use cases</div>
          <h2 className="font-serif text-[28px] lg:text-[44px] font-normal text-dark leading-[1.15] mb-4">Question types that<br />span every vertical.</h2>
          <p className="text-[18px] text-body leading-[1.85] max-w-[640px] mb-12">
            Some question types recur across multiple verticals. These cross-cutting use cases appear under different names in different contexts — the underlying deliberation pattern is the same.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {CROSS_VERTICALS.map(({ title, desc, chips }) => (
              <div key={title} className="bg-sand border-[0.5px] border-border rounded-lg p-5">
                <div className="text-[14px] font-medium text-dark mb-2 leading-[1.3]">{title}</div>
                <p className="text-[12px] text-body leading-[1.6] mb-3">{desc}</p>
                <div className="flex flex-wrap gap-1">
                  {chips.map(chip => (
                    <span key={chip} className="font-mono text-[9px] px-2 py-[3px] bg-[#EAE6DC] text-muted rounded border-[0.5px] border-border">{chip}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-terracotta px-4 lg:px-[72px] py-24 text-center">
        <h2 className="font-serif text-[36px] lg:text-[52px] font-normal text-white leading-[1.1] mb-5 tracking-[-0.02em]">
          See the deliberation<br />behind the finding.
        </h2>
        <p className="text-[19px] text-white/75 mb-10 leading-[1.7]">
          Join the waitlist and run a session on a real question before you spend anything.
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
