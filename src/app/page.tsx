import Link from "next/link";
import { Layout } from "@/components/Layout";

export default function HomePage() {
  return (
    <Layout>
      <div className="page">
        <h1>AI Guardrails</h1>
        <p>
          AI coding agents default to comprehensive, not minimal. Without guardrails,
          repos fill with abstract base classes, utils/ sprawl, and features you
          never asked for. This is a system to stop that.
        </p>

        <section>
          <h2>Read</h2>
          <ul>
            <li>
              <Link href="/manual/01-the-problem">The Problem</Link>
            </li>
            <li>
              <Link href="/manual/02-three-layers">Three Layers</Link>
            </li>
            <li>
              <Link href="/manual/03-banned-patterns">Banned Patterns</Link>
            </li>
            <li>
              <Link href="/manual/04-maintenance">Maintenance</Link>
            </li>
          </ul>
        </section>

        <section>
          <h2>Setup guides</h2>
          <ul>
            <li>
              <Link href="/guides/cursor">Cursor</Link>
            </li>
            <li>
              <Link href="/guides/claude">Claude</Link>
            </li>
            <li>
              <Link href="/guides/codex">Codex</Link>
            </li>
            <li>
              <Link href="/guides/gemini">Gemini</Link>
            </li>
            <li>
              <Link href="/guides/github-copilot">GitHub Copilot</Link>
            </li>
          </ul>
        </section>

        <p>
          <Link href="/playbook">Full playbook</Link>
        </p>
      </div>
    </Layout>
  );
}
