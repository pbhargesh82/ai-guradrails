---
title: Codex Integration
description: Set up anti-AI-bloat guardrails for OpenAI Codex CLI.
order: 3
---

# Codex Integration Guide

OpenAI Codex CLI reads **`AGENTS.md`** from your repo root. It also supports custom instructions via CLI flags and config files.

## What Codex reads

| File / Flag | When it loads | Purpose |
|-------------|---------------|---------|
| `AGENTS.md` | Every session in repo | Project-wide behavioral rules |
| `--instructions` flag | Per invocation | Override or add one-off context |
| `~/.codex/config.toml` | Global defaults | Personal preferences across projects |

## Quick setup (3 minutes)

```bash
# Create AGENTS.md at repo root
# Codex picks it up automatically when you run `codex` in the directory
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

## Step 2: Global config (optional)

Create `~/.codex/config.toml` for personal defaults:

```toml
# ~/.codex/config.toml
[instructions]
default = """
Always follow simplicity-first rules:
- Minimum code, no speculative abstractions
- Surgical changes only
- Run tests before claiming done
"""
```

Project-level `AGENTS.md` overrides or extends these defaults.

## Step 3: One-off instructions

For a specific task, pass extra context:

```bash
codex "Add email notification" --instructions "Do not add rate limiting, webhooks, or retry logic. Just send the email."
```

## Step 4: Add mechanical gates

Codex can run commands but won't enforce hooks unless told. Add to AGENTS.md:

```markdown
## Before committing
- Run: `[your lint command]`
- Run: `[your test command]`
- Do not commit if either fails
- Do not use --no-verify on pre-commit hooks
```

Install pre-commit for local enforcement:

```bash
pip install pre-commit ruff pytest
pre-commit install
```

## Codex-specific gotchas

- **No rule files with globs**: Codex doesn't have Cursor-style `.mdc` rules. Put everything in AGENTS.md or use nested AGENTS.md in subdirectories.
- **Sandbox mode**: Codex runs in a sandbox by default. Tell it in AGENTS.md which network commands are allowed.
- **Approval prompts**: Codex asks before destructive actions. List safe commands in AGENTS.md to reduce friction: `npm test`, `ruff check`, `git status`.
- **Context window**: AGENTS.md should stay under 300 lines. Codex loads the whole file every session.

## Prompt to bootstrap a new project

```
Create AGENTS.md for this project following the anti-AI-bloat guardrails
playbook (https://github.com/pbhargesh82/ai-guradrails). Stack: [YOUR STACK].
Forbidden: [LIST]. Include Karpathy 4 rules. Do not write application code yet.
```

## Verify it works

1. Run `codex` in your project
2. Ask: "What project instructions are you following?"
3. Implement a small feature and check for bloat

## Related

- [Full playbook](/playbook)
- [Claude guide](/guides/claude) (similar AGENTS.md approach)
- [Banned Patterns](/manual/03-banned-patterns)
