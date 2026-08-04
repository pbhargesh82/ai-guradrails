import Link from "next/link";
import { NavLink } from "./NavLink";
import { siteConfig } from "@/lib/site-config";

interface LayoutProps {
  children: React.ReactNode;
}

const nav = [
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
    title: "Guides",
    items: [
      { href: "/guides/cursor", label: "Cursor" },
      { href: "/guides/claude", label: "Claude" },
      { href: "/guides/codex", label: "Codex" },
      { href: "/guides/gemini", label: "Gemini" },
      { href: "/guides/github-copilot", label: "GitHub Copilot" },
    ],
  },
  {
    title: "Project",
    items: [{ href: "/roadmap", label: "Roadmap" }],
  },
];

export function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <aside className="sidebar">
        <Link href="/" className="site-title">
          {siteConfig.name}
        </Link>
        <span className="site-tagline">{siteConfig.description}</span>

        {nav.map((section) => (
          <div key={section.title} className="nav-section">
            <p className="nav-section-title">{section.title}</p>
            <ul className="nav-list">
              {section.items.map((item) => (
                <li key={item.href}>
                  <NavLink href={item.href}>{item.label}</NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </aside>

      <div className="main">
        <div className="content">{children}</div>
        <footer className="footer">
          MIT ·{" "}
          <a href={siteConfig.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </footer>
      </div>
    </div>
  );
}
