---
title: Three Layers
description: Behavioral rules, local gates, and CI — how the guardrail system works.
order: 2
---

# Three Layers

The guardrail system has three layers. Each catches what the previous one missed.

## Layer 1: Behavioral rules

**What:** Files the AI agent reads every session.
**When:** Every time you open a chat or start an agent.
**Artifacts:** `AGENTS.md`, `.cursor/rules/*.mdc`, optional skills.

This is where you encode:
- Simplicity-first mindset (Karpathy 4)
- Banned patterns (no ABC with 1 impl)
- Project context (stack, forbidden scope)
- Living corrections (Project Learnings)

**Goal:** The agent starts every session knowing the rules.

## Layer 2: Local mechanical gates

**What:** Tools that run on your machine before code gets committed.
**When:** `git commit` (via pre-commit hooks).
**Artifacts:** Linter config, `.pre-commit-config.yaml`, CodeDiet.

This catches:
- Style errors and complexity violations
- Leaked secrets (AI loves example API keys)
- Structural bloat (pass-through wrappers, utils sprawl)

**Goal:** Bad code never enters git history.

## Layer 3: CI mechanical gates

**What:** Automated checks on pull requests.
**When:** Every PR to main.
**Artifacts:** GitHub Actions workflow, PR template checklist.

This catches:
- Anything that slipped past local hooks
- Test failures
- PRs that are too large (>400 lines → suggest split)

**Goal:** Nothing merges without passing checks.

## How they work together

```
You ask AI to code
    ↓
Layer 1: Agent reads AGENTS.md + rules → tries to stay simple
    ↓
You commit
    ↓
Layer 2: pre-commit runs linter + CodeDiet → catches bloat
    ↓
You open PR
    ↓
Layer 3: CI runs tests + lint + diff size check → final gate
    ↓
Merge
```

## Karpathy 4 (encode in Layer 1)

These four principles go in your always-on rules:

1. **Think before coding** — state assumptions, ask when ambiguous
2. **Simplicity first** — minimum code, nothing speculative
3. **Surgical changes** — touch only what the request requires
4. **Goal-driven** — verifiable success criteria, run checks before done

## Quick start per layer

### Layer 1 (5 min)
```bash
# Create AGENTS.md at repo root
# Add Cursor rules if using Cursor (see /guides/cursor)
ln -s AGENTS.md CLAUDE.md   # if using Claude
ln -s AGENTS.md GEMINI.md   # if using Gemini
```

### Layer 2 (10 min)
```bash
pip install ruff pytest pre-commit codediet detect-secrets
pre-commit install
```

### Layer 3 (15 min)
- Add `.github/workflows/quality-gate.yml`
- Add `.github/pull_request_template.md`
- Start with `continue-on-error: true` on greenfield repos

## Pick your agent

Each tool reads instructions differently. See the integration guide for yours:

- [Cursor](/guides/cursor)
- [Claude](/guides/claude)
- [Codex](/guides/codex)
- [Gemini](/guides/gemini)
- [GitHub Copilot](/guides/github-copilot)

## Next step

See the specific [banned patterns](/manual/03-banned-patterns) with before/after code.
