# Anti-AI-Bloat Guardrails

Reusable guardrail system for keeping AI-assisted code **simple**, **on-scope**, and **jargon-free**.

Version **1.0.0** · MIT License

## What this is

AI coding agents default to looking comprehensive, not minimal. Without guardrails, repos accumulate abstract base classes, sprawling `utils/` folders, unrequested features, and code that was never run.

This repo holds a three-layer system:

1. **Behavioral** — `AGENTS.md`, Cursor `.mdc` rules, optional review skill
2. **Local mechanical** — pre-commit, linter, CodeDiet
3. **CI mechanical** — GitHub Actions, PR template

## Start here

Read the full playbook: **[anti-ai-bloat-guardrails-playbook.md](anti-ai-bloat-guardrails-playbook.md)**

## Quick use

1. Read the playbook once
2. Run the [implementation checklist](anti-ai-bloat-guardrails-playbook.md#implementation-checklist) in your project
3. Create `docs/ai-guardrails.md` in that repo with project-specific stack, paths, and forbidden scope
4. Fill in `AGENTS.md` with your project context

## Link from your projects

In each repo's `docs/ai-guardrails.md`:

```markdown
Global playbook: https://github.com/pbhargesh82/ai-guradrails/blob/main/anti-ai-bloat-guardrails-playbook.md
```

## Repo name

This repo is `ai-guradrails` (typo preserved). Renaming would break existing links.

## License

MIT — see [LICENSE](LICENSE).
