---
title: Gemini Integration
description: Set up anti-AI-bloat guardrails for Gemini CLI and GEMINI.md.
order: 4
---

# Gemini Integration Guide

Gemini CLI reads **`GEMINI.md`** at your repo root. Same pattern as Claude: one source of truth in `AGENTS.md`, symlink for Gemini.

## What Gemini reads

| File | When it loads | Purpose |
|------|---------------|---------|
| `GEMINI.md` | Every session in that directory | Project-wide rules and context |
| `AGENTS.md` | If symlinked to GEMINI.md | Same content, cross-tool portable |
| `.gemini/settings.json` | Project settings | Tool configuration (not rules) |

## Quick setup (3 minutes)

```bash
# Create AGENTS.md (source of truth)
ln -s AGENTS.md GEMINI.md
```

## Step 1: Create AGENTS.md

```markdown
# AGENTS.md

## Non-negotiables
- No flattery. Disagree when I'm wrong.
- Read files before editing. State your plan first.
- Every changed line must trace to my request.
- Run tests/lint before claiming done.

## Simplicity first
- Minimum code that solves the task.
- No abstract base classes unless 2+ implementations exist today.
- No utils/ sprawl — put helpers next to their only caller.

## Project context
- Stack: [YOUR STACK]
- Source dirs: [src/, app/, etc.]
- Forbidden (out of scope): [LIST WHAT NOT TO BUILD]
- Commands: install / test / lint / run

## Project Learnings
- (Add corrections here when the same mistake happens 3x in a week)
```

## Step 2: Symlink GEMINI.md

```bash
ln -s AGENTS.md GEMINI.md
```

Gemini CLI automatically loads `GEMINI.md` when you run `gemini` in the project directory.

## Step 3: Cross-tool symlinks

If you use multiple agents, symlink everything to AGENTS.md:

```bash
ln -s AGENTS.md CLAUDE.md
ln -s AGENTS.md GEMINI.md
```

One file to maintain. All tools read the same rules.

## Step 4: Add mechanical gates

Add to AGENTS.md:

```markdown
## Before committing
- Run linter: `[your lint command]`
- Run tests: `[your test command]`
- Pre-commit hooks are installed — do not bypass with --no-verify
```

Install hooks:

```bash
pip install pre-commit ruff pytest
pre-commit install
```

## Gemini-specific gotchas

- **GEMINI.md location**: Must be at repo root. Gemini doesn't support nested instruction files like Cursor's glob rules.
- **File size**: Keep under 300 lines. Longer files may be truncated.
- **No skills system**: Unlike Cursor, Gemini doesn't have an on-demand skill invocation. Put review checklists directly in AGENTS.md under a `## Before PR` section.
- **IDE vs CLI**: If using Gemini in an IDE extension, check whether it reads GEMINI.md or uses its own settings panel.

## Prompt to bootstrap a new project

```
Set up guardrails for this project. Create AGENTS.md following the
anti-AI-bloat playbook (https://github.com/pbhargesh82/ai-guradrails).
Stack: [YOUR STACK]. Forbidden: [LIST]. Symlink GEMINI.md to AGENTS.md.
Do not write application code — just guardrail files.
```

## Verify it works

1. Run `gemini` in your project directory
2. Ask: "What project instructions are loaded?"
3. Request a small feature — verify no over-engineering

## Related

- [Full playbook](/playbook)
- [Claude guide](/guides/claude) (same symlink pattern)
- [Maintenance](/manual/04-maintenance)
