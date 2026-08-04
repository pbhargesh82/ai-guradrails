---
title: Roadmap
description: Future milestones for the AI Guardrails project.
---

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

## Phase 3: Interactive setup wizard

Web-based tool that generates guardrail files for your project:

1. Pick your agent(s)
2. Pick your stack
3. List forbidden scope
4. Download a zip with AGENTS.md, rules, pre-commit config, CI workflow

## Phase 4: Rule pack library

Pre-built rule packs for Python, TypeScript, Go, Rust, and mobile stacks.

## Phase 5: Community contributions

Submit integration guides, share Project Learnings, vote on playbook changes.

## Phase 6: Analytics (privacy-first)

Optional, opt-in pattern counts from CodeDiet — no code sent. Aggregate data improves default rules.

---

Have an idea? [Open an issue on GitHub](https://github.com/pbhargesh82/ai-guradrails/issues).
