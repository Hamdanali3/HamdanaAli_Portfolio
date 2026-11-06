import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { buildBreadcrumbJsonLd, type BreadcrumbItem } from "@/lib/site";

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = buildBreadcrumbJsonLd(items);

  return (
    <div className="mx-auto max-w-[1340px] px-4 sm:px-8 pt-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Breadcrumb"
        className="inline-flex flex-wrap items-center gap-1.5 rounded-full border border-hairline bg-surface-1/85 px-4 py-2 font-mono text-[11px] text-ink-muted backdrop-blur-sm"
      >
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            return (
              <li key={item.path} className="inline-flex items-center gap-1.5">
                {idx > 0 && (
                  <ChevronRight
                    aria-hidden="true"
                    className="h-3 w-3 text-ink-muted/70 shrink-0"
                  />
                )}
                {isLast ? (
                  <span
                    aria-current="page"
                    className="font-semibold text-signal truncate max-w-[260px] sm:max-w-none"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.path}
                    className="inline-flex items-center gap-1 text-ink-secondary hover:text-ink transition-colors"
                  >
                    {idx === 0 && <Home className="h-3 w-3 text-signal" />}
                    <span>{item.name}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
