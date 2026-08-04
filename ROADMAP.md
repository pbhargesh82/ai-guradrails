# Roadmap

Future milestones for the AI Guardrails project. Phase 1 (static site) is complete.

## Phase 2: Autonomous update pipeline

Keep the playbook current as new AI agent tools, rules formats, and research emerge — without manual monitoring.

### How it would work

```
Daily cron (GitHub Action)
  → Search RSS / HN / GitHub releases for new agent tools
  → Feed diffs to an LLM analyzer
  → If significance score > threshold:
      → Open draft branch + PR with suggested content changes
  → Maintainer reviews → merges → Netlify redeploys
```

### Components

| Component | Purpose |
|-----------|---------|
| **Source watchers** | Monitor GitHub releases (Cursor, Claude Code, Codex, Copilot), HN AI threads, arxiv papers on AI code quality |
| **LLM analyzer** | Score each finding: "Does this change our recommendations?" (0-10) |
| **PR generator** | Draft markdown updates to guides, playbook sections, or new guide pages |
| **Human review gate** | No auto-merge — maintainer approves every change |

### Significance thresholds

| Score | Action |
|-------|--------|
| 0-3 | Log only, no PR |
| 4-6 | Open draft PR with "consider" label |
| 7-10 | Open draft PR with "recommended" label + notify maintainer |

### Example triggers

- New agent tool launches (e.g. "Antigravity IDE") → draft integration guide
- Agent tool changes instruction file format → update existing guide
- New research on AI code smells → add to source library
- CodeDiet or similar tool releases major version → update Layer 2 docs

### What stays manual

- Playbook philosophy and core principles
- Banned patterns list (human-curated)
- Size ceilings and maintenance rules
- Final merge approval

## Phase 3: Interactive setup wizard

Web-based tool that generates guardrail files for your project:

1. Pick your agent(s) → Cursor, Claude, Codex, etc.
2. Pick your stack → Python, TypeScript, Go, etc.
3. List forbidden scope
4. Download a zip with AGENTS.md, rules, pre-commit config, CI workflow

## Phase 4: Rule pack library

Pre-built rule packs for common stacks:

- Python (FastAPI, Django, Flask)
- TypeScript (Next.js, React, Node)
- Go, Rust, mobile (Swift/Kotlin)
- Monorepo templates

Each pack: AGENTS.md sections, `.mdc` rules, linter config, pre-commit hooks.

## Phase 5: Community contributions

- Submit new integration guides via PR
- Share Project Learnings that become universal rules
- Vote on proposed playbook changes
- Monthly "AI bloat report" blog post from aggregated data

## Phase 6: Analytics (privacy-first)

Optional, opt-in telemetry from projects using guardrails:

- Which banned patterns appear most often (via CodeDiet)
- Which rules get added to Project Learnings most
- Aggregate data → improve default rules

No code sent. Only pattern counts and rule metadata.

---

## Contributing to the roadmap

Have an idea? Open an issue or PR on [GitHub](https://github.com/pbhargesh82/ai-guradrails).

When proposing a phase, include:
- Problem it solves
- Who benefits (vibe coders / veterans / both)
- Estimated effort
- Dependencies on earlier phases
