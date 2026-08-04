import Link from "next/link";
import { Sidebar } from "./Sidebar";
import { siteConfig } from "@/lib/site-config";
import type { TocItem } from "@/lib/content";

interface LayoutProps {
  children: React.ReactNode;
  toc?: TocItem[];
}

export function Layout({ children, toc }: LayoutProps) {
  return (
    <div className="min-h-screen">
      <Sidebar toc={toc} />
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-sm">
          <div className="flex items-center justify-between px-6 py-3 lg:px-8">
            <div className="lg:hidden ml-10" />
            <div className="hidden lg:block" />
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
            >
              GitHub
            </a>
          </div>
        </header>
        <main className="px-6 py-8 lg:px-8 max-w-4xl">{children}</main>
        <footer className="px-6 py-8 lg:px-8 border-t border-[var(--color-border)] text-sm text-[var(--color-text-muted)]">
          <p>
            MIT License ·{" "}
            <Link href="/playbook" className="text-[var(--color-accent)] hover:underline">
              Playbook v1.0.0
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
}
