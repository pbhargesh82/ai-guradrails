---
title: Cursor Integration
description: Set up anti-AI-bloat guardrails in Cursor with rules, skills, and AGENTS.md.
order: 1
---

# Cursor Integration Guide

Cursor is the most feature-rich agent IDE. It reads instructions from **AGENTS.md**, **`.cursor/rules/*.mdc`**, and optional **skills**.

## What Cursor reads

| File | When it loads | Purpose |
|------|---------------|---------|
| `AGENTS.md` | Every agent session | Project-wide behavioral rules |
| `.cursor/rules/*.mdc` | Based on `alwaysApply` or file globs | Focused, scoped rules |
| `.cursor/skills/*/SKILL.md` | When you invoke `@skill-name` | On-demand review workflows |

## Quick setup (5 minutes)

```bash
# 1. Create AGENTS.md at repo root
# 2. Create Cursor rules directory
mkdir -p .cursor/rules .cursor/skills/simplicity-review

# 3. Symlink for other tools (optional)
ln -s AGENTS.md CLAUDE.md
ln -s AGENTS.md GEMINI.md
```

## Step 1: Create AGENTS.md

Copy the structure from [FerroxLabs/agents-md](https://github.com/FerroxLabs/agents-md). Keep it under **300 lines**.

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

## Step 2: Core simplicity rule

Create `.cursor/rules/00-core-simplicity.mdc`:

```yaml
---
description: Core simplicity rules for all work
alwaysApply: true
---
```

```markdown
# Simplicity rules (always on)

## Karpathy 4
1. Think before coding — state assumptions, ask when ambiguous
2. Simplicity first — minimum code, nothing speculative
3. Surgical changes — touch only what the request requires
4. Goal-driven — verifiable success criteria, run checks before done

## Banned in code/comments
robust, comprehensive, leverage, utilize, ensure seamless, orchestrate, harness

## Banned patterns
- ABC/base class/factory with only 1 implementation
- helpers/utils.py with unrelated functions
- Features not in the request

## Naming
Use plain names: `save_user` not `UserPersistenceOrchestrationService`
```

## Step 3: Stack-specific rule

Create `.cursor/rules/10-python.mdc` (adapt for your stack):

```yaml
---
description: Python conventions
globs: ["**/*.py"]
alwaysApply: false
---
```

```markdown
- Use plain functions over classes unless state is required
- Max function complexity: 10 (McCabe)
- Max function length: 50 statements
- Run `ruff check` and `pytest` before claiming done
```

## Step 4: PR review gate (manual)

Create `.cursor/rules/90-pr-review-gate.mdc`:

```yaml
---
description: Pre-PR checklist — invoke manually before opening PRs
alwaysApply: false
---
```

```markdown
Before opening a PR, verify:
- [ ] Every changed line maps to the stated task
- [ ] No new abstractions without 2+ concrete use cases today
- [ ] No unrequested features
- [ ] Tests run and pass locally
- [ ] AGENTS.md Project Learnings updated if repeatable mistake
```

## Step 5: Simplicity review skill

Create `.cursor/skills/simplicity-review/SKILL.md`:

```markdown
---
name: simplicity-review
description: Review code for AI bloat before PRs. Invoke with @simplicity-review.
disable-model-invocation: true
---

# Simplicity Review

Review the current changes for AI bloat smells.

## Check for
- Abstraction bloat (ABC/factory with 1 impl)
- Utils sprawl (unrelated helpers grouped together)
- Unrequested features (not in the task)
- Pass-through wrappers
- Duplicate helpers (_v2, _final)

## Output format
1. List each smell found (use AgentPatterns terms)
2. Verdict: SHIP or SIMPLIFY FIRST
3. If SIMPLIFY FIRST: specific deletions/simplifications
```

## Cursor-specific gotchas

- **Rule size**: Keep always-on rules under 50 lines. Cursor ignores bloated rules.
- **One file, one job**: Split rules by concern — don't cram everything into one `.mdc`.
- **Global vs project**: Project rules in `.cursor/rules/` override nothing — they add context. For personal defaults, use Cursor Settings → Rules.
- **Skills vs rules**: Rules apply automatically (or by glob). Skills run only when you call them — good for PR review.
- **Plan mode**: Use Plan mode for big tasks. It forces the agent to think before coding.

## Verify it works

1. Open Cursor in your project
2. Ask the agent: "What rules are you following?"
3. It should mention AGENTS.md and your `.mdc` rules
4. Ask it to add a feature — it should NOT add extra abstractions

## Related

- [Full playbook](/playbook)
- [The Problem](/manual/01-the-problem)
- [Three Layers](/manual/02-three-layers)
