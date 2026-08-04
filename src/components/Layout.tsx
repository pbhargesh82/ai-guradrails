import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

interface LayoutProps {
  children: React.ReactNode;
}

const navLinks = [
  { href: "/playbook", label: "Playbook" },
  { href: "/manual/01-the-problem", label: "Manual" },
  { href: "/guides/cursor", label: "Guides" },
  { href: "/roadmap", label: "Roadmap" },
  { href: siteConfig.github, label: "GitHub", external: true },
];

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <header
        style={{
          borderBottom: "1px solid #333",
          padding: "0.75rem 1rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem 1.5rem",
          alignItems: "baseline",
          maxWidth: "42rem",
          margin: "0 auto",
        }}
      >
        <Link href="/" style={{ fontWeight: 600, textDecoration: "none" }}>
          {siteConfig.name}
        </Link>
        <nav style={{ display: "flex", flexWrap: "wrap", gap: "1rem", fontSize: "0.875rem" }}>
          {navLinks.map((link) =>
            link.external ? (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            ) : (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            )
          )}
        </nav>
      </header>
      <main>{children}</main>
      <footer
        style={{
          borderTop: "1px solid #333",
          padding: "1rem",
          fontSize: "0.875rem",
          color: "#888",
          maxWidth: "42rem",
          margin: "0 auto",
        }}
      >
        MIT ·{" "}
        <a href={siteConfig.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </footer>
    </>
  );
}
