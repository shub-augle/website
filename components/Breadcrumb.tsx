import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string; // omit for the current (active) item
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="border-b-[0.5px] border-border">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-[14px] flex gap-[6px] items-center font-mono text-[12px] text-[#B0ADA5]">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-[6px]">
            {i > 0 && <span className="text-[#B0ADA5]">›</span>}
            {item.href ? (
              <Link href={item.href} className="text-[#B0ADA5] hover:text-dark transition-colors no-underline">
                {item.label}
              </Link>
            ) : (
              <span className="text-terracotta">{item.label}</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
