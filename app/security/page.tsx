import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';

const AREAS = [
  {
    title: 'Data handling',
    body: 'Your research questions, uploaded documents, and session outputs are used only to run and return your session. We do not sell session data or use it to train third-party models.',
  },
  {
    title: 'Encryption',
    body: 'Data is encrypted in transit between your browser, Augle, and every upstream model provider. Session records are encrypted at rest.',
  },
  {
    title: 'Model provider isolation',
    body: 'The seven-agent ensemble is routed across multiple model providers. No single provider sees the full session context, and the Guardian\'s model identity is never disclosed to the other agents or to model providers processing other agents\' requests.',
  },
  {
    title: 'Access control',
    body: 'Session records and audit trails are scoped to the account that created them. Internal access to production data is limited to what is required to operate the platform.',
  },
  {
    title: 'Vulnerability disclosure',
    body: "If you find a security issue, email security@augle.com. We're a small team and read every report directly — no ticketing queue in the way.",
  },
];

export default function SecurityPage() {
  return (
    <div className="bg-sand min-h-screen">
      <Nav activeRoute="/security" />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Security' }]} />

      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-[80px]">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-5">Security</div>
          <h1 className="font-serif text-[36px] lg:text-[64px] font-normal leading-[1.12] tracking-[-0.025em] text-dark mb-6 max-w-[700px]">
            Security overview.
          </h1>
          <p className="text-[19px] text-body leading-[1.8] max-w-[600px]">
            Augle is pre-launch and early stage. This page describes our current practices — it will expand as we complete formal audits and certifications ahead of general availability.
          </p>
        </div>
      </div>

      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20">
          <div className="flex flex-col gap-3 max-w-[820px]">
            {AREAS.map(({ title, body }) => (
              <div key={title} className="bg-surface border-[0.5px] border-border rounded-lg p-6">
                <p className="text-[16px] font-medium text-dark mb-2">{title}</p>
                <p className="text-[14px] text-body leading-[1.7]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-terracotta px-4 lg:px-[72px] py-24 text-center">
        <h2 className="font-serif text-[36px] lg:text-[52px] font-normal text-white leading-[1.12] mb-5 tracking-[-0.025em]">
          Report a security issue.
        </h2>
        <p className="text-[19px] text-white/75 mb-10 leading-[1.7] max-w-[560px] mx-auto">
          We take reports seriously and respond directly — no ticketing system, no runaround.
        </p>
        <Link href="/contact" className="inline-block text-[15px] font-medium text-terracotta bg-white px-8 py-[14px] rounded no-underline hover:opacity-90 transition-opacity">
          Contact us
        </Link>
      </div>

      <Footer />
    </div>
  );
}
