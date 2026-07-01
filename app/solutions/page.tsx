import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';

const VERTICALS = [
  { num: '01 / 11', slug: 'universities', name: 'Universities + academia', personas: 'PhD candidates · Grant applicants · Research faculty · Pre-submission reviewers', desc: 'Research questions don\'t have clean answers before the committee does. Augle maps what\'s settled, what\'s contested, and what\'s genuinely unknown in your methodology — before the defence, before the submission, before the study section finds it first.', question: '"Does experience sampling via smartphone provide sufficient ecological validity to support attentional state claims in naturalistic environments?"', tags: ['Dissertation defence', 'Grant review', 'Replication', 'Peer review prep'], mode: 'Letters & Science · Academic integrity mode' },
  { num: '02 / 11', slug: 'research-labs', name: 'Research labs', personas: 'Principal investigators · Lab directors · Clinical researchers · Biotech scientists', desc: 'High-stakes hypothesis decisions require more than a literature review. Augle stress-tests your evidence base against the strongest objections in the field — surfacing validity gaps before they become rejection vectors or, worse, replication failures.', question: '"Is the protein folding hypothesis supported by the current cryo-EM evidence base, or are the resolution limitations material to the claim?"', tags: ['Hypothesis validation', 'Clinical trial design', 'Landmark finding audit'], mode: 'Letters & Science · Clinical integrity mode' },
  { num: '03 / 11', slug: 'policy', name: 'Policy + lawmakers', personas: 'Legislative analysts · Policy advisors · Congressional staff · Regulatory officers', desc: 'Policy testimony and impact assessments rest on evidence that gets challenged in real time. Augle produces a structured map of what the evidence actually supports — and what it doesn\'t — so you\'re never the one who finds out at the hearing.', question: '"Does the proposed infrastructure bill\'s cost-benefit methodology adequately account for climate-adjusted risk over a 30-year horizon?"', tags: ['Bill testimony', 'CBA review', 'Regulatory impact', 'Education funding'], mode: 'Letters & Science · Policy mode' },
  { num: '04 / 11', slug: 'law-firms', name: 'Law firms', personas: 'Litigation partners · Associates · Expert witness coordinators · Regulatory counsel', desc: "Case theory, expert evidence, and regulatory applicability all need to survive adversarial challenge. Augle's Contrarian plays opposing counsel before opposing counsel does — surfacing the strongest objections and their resolution conditions while you still have time to respond.", question: '"Does the expert testimony meet the Daubert threshold given the methodological assumptions in the underlying study design?"', tags: ['Case theory', 'Daubert review', 'Regulatory applicability', 'Expert evidence'], mode: 'Letters & Science · Legal integrity mode' },
  { num: '05 / 11', slug: 'venture-capital', name: 'Venture capital + PE', personas: 'General partners · Analysts · Operating partners · Investment committees', desc: "TAM assumptions, growth theses, and portfolio pivot decisions all depend on evidence that isn't neutral. Augle stress-tests the claim before the IC does — and when the evidence doesn't support the thesis, it says so, clearly, with the specific construct validity issue identified.", question: '"Does the TAM assumption in this Series A deck reflect the addressable market or the theoretical maximum?"', tags: ['TAM validation', 'Series A review', 'Portfolio pivots', 'IC prep'], mode: 'Letters & Science · Financial mode' },
  { num: '06 / 11', slug: 'think-tanks', name: 'Think tanks + nonprofits', personas: 'Research directors · Policy fellows · Program officers · Impact evaluators', desc: 'Policy reports and intervention recommendations carry institutional weight. Augle maps the evidence landscape before publication — distinguishing what the data supports from what you wish it supported, and producing an auditable record of the deliberation behind the finding.', question: '"Does the available evidence support the criminal justice intervention\'s recidivism reduction claims at the proposed scale?"', tags: ['Policy reports', 'Intervention review', 'Global health', 'Impact evaluation'], mode: 'Letters & Science · Policy mode' },
  { num: '07 / 11', slug: 'enterprise', name: 'Enterprise', personas: 'Strategy leads · Corporate development · M&A teams · Supply chain executives', desc: "Market entry decisions, M&A synergy assumptions, and supply chain resilience theses all carry evidence that needs adversarial pressure before capital is committed. Augle runs the pre-mortem your team won't — because it has no stake in the outcome.", question: '"Does the M&A synergy thesis hold under independent examination of the integration assumptions and market overlap claims?"', tags: ['Market entry', 'M&A synergy', 'Supply chain', 'Pre-mortem'], mode: 'Letters & Science · Enterprise mode' },
  { num: '08 / 11', slug: 'healthcare', name: 'Healthcare + life sciences', personas: 'Chief medical officers · Formulary committees · Health system strategists · Pharma teams', desc: "Drug-drug interactions, health system partnerships, and digital therapeutics coverage decisions all depend on evidence with gaps that matter. Augle's Guardian operates in clinical integrity mode — flagging unverified sources, retracted studies, and the studies that simply don't exist yet.", question: '"Is the drug-drug interaction evidence sufficient to contraindicate concurrent use in patients with moderate hepatic impairment?"', tags: ['Drug interactions', 'Formulary decisions', 'Health system strategy', 'Coverage review'], mode: 'Letters & Science · Clinical integrity mode' },
  { num: '09 / 11', slug: 'government', name: 'Government + public sector', personas: 'Agency analysts · Budget officers · Infrastructure planners · Public safety officials', desc: 'Infrastructure investment prioritisation, regulatory impact assessment, and public safety technology deployment decisions require evidence that can withstand public and legislative scrutiny. Augle produces the auditable deliberation record that accountability demands.', question: '"Does the regulatory impact assessment adequately capture second-order economic effects in underserved communities?"', tags: ['Infrastructure', 'Regulatory impact', 'Public safety tech', 'Budget analysis'], mode: 'Letters & Science · Policy mode' },
  { num: '10 / 11', slug: 'financial-services', name: 'Financial services', personas: 'Risk officers · Compliance teams · ESG analysts · Model validation teams', desc: "Model risk audits, ESG integration decisions, and sanctions compliance exposure reviews all require evidence that holds up to regulatory examination. Augle's Guardian operates in financial integrity mode — and the Synthesizer is architecturally forbidden from producing buy, sell, long, or short framing.", question: '"Does the internal model\'s assumptions adequately capture tail risk under the Basel III stress scenarios?"', tags: ['Model risk', 'ESG integration', 'Sanctions exposure', 'Compliance review'], mode: 'Letters & Science · Financial integrity mode' },
  { num: '11 / 11', slug: 'media', name: 'Media + journalism', personas: 'Investigative reporters · Science journalists · Editors · Fact-checking teams', desc: "Algorithmic bias investigations, source credibility assessments, and science reporting standards all depend on the same thing: knowing what the evidence actually says versus what you've been told it says. Augle's SVS authenticates every source in real time — no hallucinated citations reach the finding.", question: '"Is the algorithmic bias claim in the dataset robust to the methodological critiques raised in the academic literature?"', tags: ['Investigative reporting', 'Science journalism', 'Source verification', 'Fact-checking'], mode: 'Letters & Science · Editorial integrity mode' },
];

export default function SolutionsPage() {
  return (
    <div className="bg-sand min-h-screen">
      <Nav activeRoute="/solutions" />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Solutions' }]} />

      {/* HERO */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-[96px]">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-5">Solutions</div>
          <h1 className="font-serif text-[36px] lg:text-[64px] font-normal leading-[1.12] tracking-[-0.025em] text-dark mb-6">
            One ensemble.<br /><em className="italic text-terracotta">Eleven verticals.</em><br />One question type.
          </h1>
          <p className="text-[19px] text-body leading-[1.8] max-w-[640px] mb-10">
            The questions that matter most don't sort neatly by industry. A dissertation defence, an M&A thesis, a clinical evidence review, a policy cost-benefit analysis — they all share the same structure: contested evidence, high stakes, and a wrong answer that costs more than the right one would have. Augle is built for that structure, regardless of domain.
          </p>
          {/* Jump links */}
          <div className="flex flex-wrap gap-2">
            {VERTICALS.map(({ slug, name }) => (
              <Link key={slug} href={`/solutions/${slug}`}
                className="font-mono text-[11px] px-3 py-[6px] border-[0.5px] border-border rounded bg-surface hover:border-terracotta hover:text-terracotta transition-colors no-underline text-body">
                {name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* VERTICALS GRID */}
      <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {VERTICALS.map(({ num, slug, name, personas, desc, question, tags, mode }) => (
            <div key={slug} id={slug} className="bg-surface border-[0.5px] border-border rounded-lg overflow-hidden flex flex-col hover:border-terracotta transition-colors">
              <div className="p-6 flex-1">
                <div className="font-mono text-[10px] tracking-[0.06em] text-[#B0ADA5] mb-1">{num}</div>
                <div className="font-serif text-[20px] font-normal text-dark mb-1 leading-[1.3]">{name}</div>
                <div className="text-[12px] text-muted italic mb-4">{personas}</div>
                <p className="text-[13px] text-body leading-[1.7] mb-4">{desc}</p>
                <p className="text-[12px] text-muted italic px-3 py-2 bg-sand border-l-2 border-terracotta rounded leading-[1.5] mb-4">{question}</p>
                <div className="flex flex-wrap gap-1">
                  {tags.map(tag => (
                    <span key={tag} className="font-mono text-[9px] px-2 py-[3px] bg-[#EAE6DC] text-muted rounded border-[0.5px] border-border">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="px-6 py-4 border-t-[0.5px] border-border flex items-center justify-between bg-[#EAE6DC]">
                <span className="font-mono text-[10px] text-[#B0ADA5]">{mode}</span>
                <Link href={`/solutions/${slug}`} className="text-[13px] text-terracotta font-medium no-underline hover:underline">Explore →</Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-terracotta px-4 lg:px-[72px] py-24 text-center">
        <h2 className="font-serif text-[36px] lg:text-[52px] font-normal text-white leading-[1.1] mb-5 tracking-[-0.02em]">
          Same engine.<br />Every domain.
        </h2>
        <p className="text-[19px] text-white/75 mb-10 leading-[1.7]">
          One free Standard session with every new account.<br className="hidden lg:block" />Run it on a real question before your next deadline.
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
