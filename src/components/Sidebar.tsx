"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { siteConfig } from "@/lib/site-config";

interface NavItem {
  href: string;
  label: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navigation: NavSection[] = [
  {
    title: "Start",
    items: [
      { href: "/", label: "Home" },
      { href: "/playbook", label: "Playbook" },
    ],
  },
  {
    title: "Manual",
    items: [
      { href: "/manual/01-the-problem", label: "The Problem" },
      { href: "/manual/02-three-layers", label: "Three Layers" },
      { href: "/manual/03-banned-patterns", label: "Banned Patterns" },
      { href: "/manual/04-maintenance", label: "Maintenance" },
    ],
  },
  {
    title: "Project",
    items: [{ href: "/roadmap", label: "Roadmap" }],
  },
  {
    title: "Integration Guides",
    items: [
      { href: "/guides/cursor", label: "Cursor" },
      { href: "/guides/claude", label: "Claude" },
      { href: "/guides/codex", label: "Codex" },
      { href: "/guides/gemini", label: "Gemini" },
      { href: "/guides/github-copilot", label: "GitHub Copilot" },
    ],
  },
];

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface SidebarProps {
  toc?: TocItem[];
}

export function Sidebar({ toc }: SidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const nav = (
    <nav className="space-y-6">
      {navigation.map((section) => (
        <div key={section.title}>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
            {section.title}
          </h3>
          <ul className="space-y-1">
            {section.items.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-3 py-1.5 rounded-md text-sm transition-colors ${
                      active
                        ? "bg-[var(--color-surface-hover)] text-[var(--color-accent)] font-medium"
                        : "text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      {toc && toc.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
            On this page
          </h3>
          <ul className="space-y-1">
            {toc.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`block py-1 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors ${
                    item.level === 3 ? "pl-3" : ""
                  }`}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)]"
        aria-label="Toggle navigation"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          {mobileOpen ? (
            <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
          ) : (
            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          )}
        </svg>
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-[var(--color-surface)] border-r border-[var(--color-border)] overflow-y-auto transition-transform lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          <Link href="/" className="block mb-8" onClick={() => setMobileOpen(false)}>
            <span className="text-lg font-bold text-[var(--color-text)]">
              {siteConfig.name}
            </span>
            <span className="block text-xs text-[var(--color-text-muted)] mt-0.5">
              Code with AI, without the bloat
            </span>
          </Link>
          {nav}
        </div>
      </aside>
    </>
  );
}
