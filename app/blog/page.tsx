import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';

export default function BlogPage() {
  return (
    <div className="bg-sand min-h-screen">
      <Nav activeRoute="/blog" />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Blog' }]} />

      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-[80px]">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-5">Blog</div>
          <h1 className="font-serif text-[36px] lg:text-[64px] font-normal leading-[1.12] tracking-[-0.025em] text-dark mb-6 max-w-[700px]">
            Nothing published yet.
          </h1>
          <p className="text-[19px] text-body leading-[1.8] max-w-[600px]">
            We&apos;re writing about the architecture, the methodology behind the confidence grading, and what we&apos;re learning from early access sessions. First posts land around launch.
          </p>
        </div>
      </div>

      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20">
          <div className="bg-surface border-[0.5px] border-border rounded-lg p-10 text-center max-w-[600px] mx-auto">
            <p className="text-[16px] font-medium text-dark mb-2">In the meantime</p>
            <p className="text-[14px] text-body leading-[1.7] mb-6">
              Our published research papers cover the methodology in depth — corpus construction, the Guardian integrity system, and confidence propagation.
            </p>
            <Link href="/research" className="text-[14px] text-terracotta no-underline hover:underline">
              Read the research papers →
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
