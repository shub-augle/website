import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';

export default function CareersPage() {
  return (
    <div className="bg-sand min-h-screen">
      <Nav activeRoute="/careers" />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Careers' }]} />

      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-[80px]">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-5">Careers</div>
          <h1 className="font-serif text-[36px] lg:text-[64px] font-normal leading-[1.12] tracking-[-0.025em] text-dark mb-6 max-w-[700px]">
            We&apos;re a small team,<br /><em className="italic text-terracotta">building deliberately.</em>
          </h1>
          <p className="text-[19px] text-body leading-[1.8] max-w-[600px]">
            Augle is founder-led and pre-launch. We&apos;re not running an open hiring process right now, but we&apos;re always interested in hearing from people who care about rigorous, adversarially-tested reasoning.
          </p>
        </div>
      </div>

      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-border border-[0.5px] border-border rounded-lg overflow-hidden">
            {[
              { label: 'Open roles', text: 'No open roles at this time. Check back after early access launches, or reach out below to be considered for future openings.' },
              { label: 'What we look for', text: 'People who are comfortable with adversarial rigor — the same standard the Contrarian agent holds every finding to.' },
              { label: 'How to reach us', text: "Email us directly. We're a small team, so a resume that goes to careers@augle.com goes to the founders." },
            ].map(({ label, text }) => (
              <div key={label} className="bg-surface px-6 py-6">
                <div className="font-mono text-[10px] tracking-[0.08em] text-terracotta uppercase mb-2">{label}</div>
                <p className="text-[14px] text-body leading-[1.7]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-terracotta px-4 lg:px-[72px] py-24 text-center">
        <h2 className="font-serif text-[36px] lg:text-[52px] font-normal text-white leading-[1.12] mb-5 tracking-[-0.025em]">
          Interested in Augle?
        </h2>
        <p className="text-[19px] text-white/75 mb-10 leading-[1.7] max-w-[560px] mx-auto">
          Send us a note. We read everything, even without an open role posted.
        </p>
        <Link href="/contact" className="inline-block text-[15px] font-medium text-terracotta bg-white px-8 py-[14px] rounded no-underline hover:opacity-90 transition-opacity">
          Contact us
        </Link>
      </div>

      <Footer />
    </div>
  );
}
