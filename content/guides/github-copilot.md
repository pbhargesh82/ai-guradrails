---
title: GitHub Copilot Integration
description: Set up anti-AI-bloat guardrails for GitHub Copilot in VS Code.
order: 5
---

# GitHub Copilot Integration Guide

GitHub Copilot reads **`.github/copilot-instructions.md`** for workspace-level instructions. It also respects **`AGENTS.md`** in some contexts.

## What Copilot reads

| File | When it loads | Purpose |
|------|---------------|---------|
| `.github/copilot-instructions.md` | Every Copilot Chat session in workspace | Workspace rules |
| `AGENTS.md` | Copilot Coding Agent (PRs) | Agent behavioral rules |
| `.vscode/settings.json` | Editor config | Copilot enable/disable per language |

## Quick setup (5 minutes)

```bash
mkdir -p .github
# Create copilot-instructions.md (see below)
# Create AGENTS.md for Copilot Coding Agent
```

## Step 1: Create copilot-instructions.md

Create `.github/copilot-instructions.md`:

```markdown
# Copilot Instructions

## Rules
- Write minimum code. No speculative abstractions.
- No abstract base classes unless 2+ implementations exist today.
- Put helpers next to their only caller — no utils/ sprawl.
- Every change must trace to what I asked for.
- Do not add features I didn't request.

## Style
- Plain function names: `save_user` not `UserPersistenceOrchestrationService`
- No jargon in comments: avoid robust, leverage, orchestrate, harness
- Run tests before suggesting code is done

## Project
- Stack: [YOUR STACK]
- Test command: `[your test command]`
- Lint command: `[your lint command]`
- Out of scope: [LIST WHAT NOT TO BUILD]
```

## Step 2: Create AGENTS.md (for Copilot Coding Agent)

If you use Copilot's PR agent, also create `AGENTS.md`:

```markdown
# AGENTS.md

## Non-negotiables
- Read files before editing. State your plan first.
- Surgical changes only — every line traces to the task.
- Run tests/lint before claiming done.

## Simplicity first
- Minimum code. No ABC/factory unless 2+ implementations exist.
- No unrequested features.

## Project context
- Stack: [YOUR STACK]
- Forbidden: [LIST]
- Commands: install / test / lint / run

## Project Learnings
- (3-strike rule: add corrections here)
```

## Step 3: VS Code settings (optional)

Add to `.vscode/settings.json`:

```json
{
  "github.copilot.chat.codeGeneration.instructions": [
    {
      "text": "Follow simplicity-first rules. No abstractions without 2+ use cases. No unrequested features."
    }
  ]
}
```

## Step 4: Add mechanical gates

Copilot won't run pre-commit hooks automatically. Add to your instructions:

```markdown
## Before committing
- Run `[lint command]` and `[test command]`
- Pre-commit hooks are installed — never use --no-verify
```

Install hooks:

```bash
pip install pre-commit ruff pytest
pre-commit install
```

## Copilot-specific gotchas

- **Two instruction files**: `copilot-instructions.md` for Chat/inline. `AGENTS.md` for the Coding Agent that opens PRs. Keep them in sync or symlink content.
- **No glob rules**: Copilot doesn't support file-pattern-scoped rules like Cursor `.mdc`. Put stack-specific rules in the instructions file under a `## Stack` section.
- **Inline vs Chat**: Inline completions ignore instructions more often than Chat. For critical rules, use Chat with explicit references to your instructions file.
- **Copilot Coding Agent**: When it opens PRs, it reads AGENTS.md. Make sure forbidden scope is listed clearly.

## Prompt to bootstrap a new project

In Copilot Chat:

```
Create .github/copilot-instructions.md and AGENTS.md for this project
following anti-AI-bloat guardrails (https://github.com/pbhargesh82/ai-guradrails).
Stack: [YOUR STACK]. Forbidden: [LIST]. Do not write app code yet.
```

## Verify it works

1. Open Copilot Chat in VS Code
2. Ask: "What workspace instructions are you following?"
3. Use inline completion on a new function — check it stays simple
4. If using Coding Agent, verify AGENTS.md is picked up on PRs

## Related

- [Full playbook](/playbook)
- [Cursor guide](/guides/cursor) (more advanced rule system)
- [Banned Patterns](/manual/03-banned-patterns)
