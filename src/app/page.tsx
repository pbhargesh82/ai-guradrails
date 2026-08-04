import Link from "next/link";
import { Layout } from "@/components/Layout";

const layers = [
  {
    number: "1",
    name: "Behavioral",
    role: "Tell agents how to act",
    artifacts: "AGENTS.md, .cursor/rules, skills",
    when: "Every session",
  },
  {
    number: "2",
    name: "Local mechanical",
    role: "Catch bloat before commit",
    artifacts: "pre-commit, linter, CodeDiet",
    when: "git commit",
  },
  {
    number: "3",
    name: "CI mechanical",
    role: "Catch what slipped through",
    artifacts: "GitHub Actions, PR template",
    when: "Pull request",
  },
];

const guides = [
  { href: "/guides/cursor", name: "Cursor", desc: "Rules, skills, AGENTS.md" },
  { href: "/guides/claude", name: "Claude", desc: "CLAUDE.md symlink" },
  { href: "/guides/codex", name: "Codex", desc: "AGENTS.md + CLI flags" },
  { href: "/guides/gemini", name: "Gemini", desc: "GEMINI.md symlink" },
  { href: "/guides/github-copilot", name: "GitHub Copilot", desc: "copilot-instructions.md" },
];

export default function HomePage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="mb-16">
        <p className="text-sm font-medium text-[var(--color-accent)] mb-3">
          v1.0.0 · MIT License
        </p>
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">
          Code with AI,
          <br />
          <span className="text-[var(--color-accent)]">without the bloat.</span>
        </h1>
        <p className="text-lg text-[var(--color-text-muted)] max-w-2xl mb-8">
          AI agents default to comprehensive, not minimal. Without guardrails,
          your repo fills with abstract base classes, utils/ sprawl, and features
          you never asked for. This system fixes that.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/manual/01-the-problem"
            className="inline-flex items-center px-5 py-2.5 rounded-lg bg-[var(--color-accent)] text-black font-medium text-sm hover:bg-[var(--color-accent-dim)] transition-colors"
          >
            Start reading
          </Link>
          <Link
            href="/playbook"
            className="inline-flex items-center px-5 py-2.5 rounded-lg border border-[var(--color-border)] text-[var(--color-text)] font-medium text-sm hover:bg-[var(--color-surface-hover)] transition-colors"
          >
            Full playbook
          </Link>
        </div>
      </section>

      {/* Three layers */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-2">Three layers</h2>
        <p className="text-[var(--color-text-muted)] mb-6">
          Behavioral rules plus mechanical gates. Prompts are suggestions — guardrails are enforcement.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {layers.map((layer) => (
            <div
              key={layer.number}
              className="p-5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]"
            >
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-accent)] text-black text-sm font-bold mb-3">
                {layer.number}
              </span>
              <h3 className="font-semibold text-[var(--color-text)] mb-1">
                {layer.name}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] mb-3">
                {layer.role}
              </p>
              <dl className="text-xs space-y-1">
                <div>
                  <dt className="text-[var(--color-text-muted)]">Artifacts</dt>
                  <dd className="text-[var(--color-text)]">{layer.artifacts}</dd>
                </div>
                <div>
                  <dt className="text-[var(--color-text-muted)]">Runs</dt>
                  <dd className="text-[var(--color-text)]">{layer.when}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm">
          <Link href="/manual/02-three-layers" className="text-[var(--color-accent)] hover:underline">
            Learn how the layers work together →
          </Link>
        </p>
      </section>

      {/* Quick start */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-2">Quick start</h2>
        <p className="text-[var(--color-text-muted)] mb-4">
          Copy-paste this into a new project. Takes 5 minutes.
        </p>
        <pre className="p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] overflow-x-auto text-sm font-mono text-[var(--color-text-muted)]">
{`# 1. Create AGENTS.md at repo root (see playbook for template)
# 2. Symlink for your agent tool
ln -s AGENTS.md CLAUDE.md    # Claude
ln -s AGENTS.md GEMINI.md    # Gemini

# 3. Install mechanical gates (Python example)
pip install ruff pytest pre-commit codediet detect-secrets
pre-commit install

# 4. Add Cursor rules if using Cursor
mkdir -p .cursor/rules
# Copy 00-core-simplicity.mdc from the Cursor guide`}
        </pre>
      </section>

      {/* Integration guides */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-2">Integration guides</h2>
        <p className="text-[var(--color-text-muted)] mb-6">
          Each AI agent reads instructions differently. Pick yours.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] transition-colors group"
            >
              <h3 className="font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
                {guide.name}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">
                {guide.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Manual */}
      <section>
        <h2 className="text-2xl font-bold mb-2">The manual</h2>
        <p className="text-[var(--color-text-muted)] mb-6">
          Four short sections. Plain English. No jargon.
        </p>
        <ol className="space-y-3">
          {[
            { href: "/manual/01-the-problem", title: "The Problem", desc: "Why AI bloats your code" },
            { href: "/manual/02-three-layers", title: "Three Layers", desc: "Behavioral → local → CI" },
            { href: "/manual/03-banned-patterns", title: "Banned Patterns", desc: "Before/after code examples" },
            { href: "/manual/04-maintenance", title: "Maintenance", desc: "3-strike rule, monthly prune" },
          ].map((item, i) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-start gap-4 p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] transition-colors group"
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-full border border-[var(--color-border)] flex items-center justify-center text-sm font-medium text-[var(--color-text-muted)]">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)]">{item.desc}</p>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </Layout>
  );
}
