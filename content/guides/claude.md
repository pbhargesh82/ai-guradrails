---
title: Claude Integration
description: Set up anti-AI-bloat guardrails for Claude Code and Claude.md.
order: 2
---

# Claude Integration Guide

Claude Code (Anthropic's CLI agent) reads **`CLAUDE.md`** at your repo root. Keep one source of truth: symlink it to `AGENTS.md`.

## What Claude reads

| File | When it loads | Purpose |
|------|---------------|---------|
| `CLAUDE.md` | Every session in that directory | Project-wide rules and context |
| `AGENTS.md` | If symlinked to CLAUDE.md | Same content, cross-tool portable |
| Nested `CLAUDE.md` | When working in subdirectories | Override or add context for that folder |

## Quick setup (3 minutes)

```bash
# Create AGENTS.md (source of truth)
# Then symlink for Claude
ln -s AGENTS.md CLAUDE.md
```

That's it for the minimum setup. Claude Code picks up `CLAUDE.md` automatically.

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

## Step 2: Symlink CLAUDE.md

```bash
ln -s AGENTS.md CLAUDE.md
```

Claude Code reads `CLAUDE.md` on startup. The symlink means you maintain one file for all tools.

## Step 3: Add mechanical gates

Claude won't run pre-commit for you unless you tell it to. Add this to AGENTS.md:

```markdown
## Before committing
- Run linter: `[your lint command]`
- Run tests: `[your test command]`
- If either fails, fix before committing
```

For Python projects:

```bash
pip install ruff pytest pre-commit codediet detect-secrets
pre-commit install
```

Add to AGENTS.md:

```markdown
## Pre-commit hooks
This repo uses pre-commit. Hooks run on `git commit`:
- ruff (lint + format)
- detect-secrets
- codediet (bloat detection)
Do not bypass hooks with --no-verify.
```

## Claude-specific gotchas

- **CLAUDE.md size**: Keep under 300 lines. Longer files get truncated or ignored.
- **No glob rules**: Unlike Cursor, Claude doesn't have `.mdc` files with globs. Put stack-specific rules in AGENTS.md under a `## Stack conventions` section, or use nested CLAUDE.md in subdirectories.
- **Memory vs file**: Claude Code can remember things across sessions, but file-based rules (CLAUDE.md) are more reliable. Prefer updating Project Learnings in the file.
- **Permissions**: Claude Code asks before running commands. Tell it in AGENTS.md which commands are safe: `npm test`, `ruff check`, etc.

## Prompt to bootstrap a new project

Paste this into Claude Code when starting a new repo:

```
Read https://github.com/pbhargesh82/ai-guradrails — create AGENTS.md and CLAUDE.md
(symlink) for this project. Stack is [YOUR STACK]. Forbidden scope: [LIST].
Include Karpathy 4 simplicity rules and a Project Learnings section.
Do not add any code yet — just the guardrail files.
```

## Verify it works

1. Run `claude` in your project directory
2. Ask: "What instructions are you following?"
3. It should reference CLAUDE.md / AGENTS.md
4. Ask it to implement something small — check it doesn't over-engineer

## Related

- [Full playbook](/playbook)
- [Cursor guide](/guides/cursor) (if you also use Cursor)
- [Three Layers](/manual/02-three-layers)
