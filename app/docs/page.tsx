import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';

export default function DocsPage() {
  return (
    <div className="bg-sand min-h-screen">
      <Nav activeRoute="/docs" />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Documentation' }]} />

      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-[80px]">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-5">Documentation</div>
          <h1 className="font-serif text-[36px] lg:text-[64px] font-normal leading-[1.12] tracking-[-0.025em] text-dark mb-6 max-w-[700px]">
            API docs land at launch.
          </h1>
          <p className="text-[19px] text-body leading-[1.8] max-w-[600px] mb-10">
            Augle is in early access and the public API is not yet open. In the meantime, the platform overview covers the architecture, session flow, and agent breakdown.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/platform" className="text-[15px] font-medium text-white bg-terracotta px-7 py-[14px] rounded no-underline hover:opacity-[0.88] transition-opacity">
              View the platform overview
            </Link>
            <Link href="/waitlist" className="text-[15px] text-dark border-[0.5px] border-border px-7 py-[14px] rounded no-underline hover:border-terracotta hover:text-terracotta transition-colors">
              Join the waitlist
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
