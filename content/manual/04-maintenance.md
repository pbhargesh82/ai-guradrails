---
title: Maintenance
description: Keep guardrails sharp — 3-strike rule, monthly prune, and phase gates.
order: 4
---

# Maintenance

Guardrails decay if you don't maintain them. AI finds new ways to bloat code. Your project evolves. Rules go stale.

## 3-strike rule

Same correction **3 times in one week** → add one concrete line to AGENTS.md **Project Learnings**.

```markdown
## Project Learnings

- Always use plain functions in collectors/ — no BaseCollector ABC
- Do not create separate config files — use env vars
- Tests go in tests/ mirroring src/ structure — not inline
```

**Good learning:** Specific, actionable, names the file or pattern.
**Bad learning:** "Be careful about over-abstraction" (too vague — AI ignores it).

## Monthly prune

Once a month, read through AGENTS.md and each rule file. For each line ask:

> "Would removing this cause a mistake?"

If no → delete it.

Rules accumulate. AI agents have limited context. Bloated rules get ignored — the opposite of what you want.

## Size ceilings

| Artifact | Max size | Why |
|----------|----------|-----|
| AGENTS.md | 300 lines | Agents truncate long files |
| Always-on `.mdc` rule | 50 lines | Cursor prioritizes short rules |
| Stack-specific `.mdc` | 80 lines | Same reason |
| This playbook | Update in place | Don't copy into every repo |

## Phase gates

Before starting a new roadmap phase, re-read the **forbidden / out of scope** list in AGENTS.md.

AI routinely builds Phase N+2 during Phase 1. If you're building auth, AI will start adding payment processing, admin dashboards, and analytics.

**Fix:** Update forbidden scope when phases change:

```markdown
## Forbidden (out of scope)
- Payment processing (Phase 4)
- Admin dashboard (Phase 3)
- Analytics/tracking (not planned)
- Mobile app (not planned)
```

## When to update rules

| Trigger | Action |
|---------|--------|
| Same mistake 3x in a week | Add to Project Learnings |
| New agent tool adopted | Add integration guide, update symlinks |
| Stack change (e.g. added frontend) | Add stack-specific `.mdc` rule |
| Phase completed | Update forbidden scope for next phase |
| Rule file > size ceiling | Split or prune |
| Monthly calendar reminder | Run prune pass |

## When NOT to update

- Don't add rules preemptively ("might need this someday")
- Don't copy the entire playbook into AGENTS.md
- Don't create rules for problems that haven't happened yet
- Don't add rules longer than the code they protect

## Keeping the playbook current

This site and playbook are versioned. When you learn something new:

1. Add to your project's AGENTS.md Project Learnings (immediately)
2. If it's universal, propose an update to the global playbook (via PR)
3. Check the [roadmap](/roadmap) for planned improvements

## Quick maintenance checklist

Run this monthly:

- [ ] Read AGENTS.md — prune stale lines
- [ ] Read `.cursor/rules/` — prune or split oversized files
- [ ] Update forbidden scope for current phase
- [ ] Check Project Learnings — any patterns to promote to rules?
- [ ] Run CodeDiet — any new bloat smells?
- [ ] Verify pre-commit hooks still pass

## You're done with the manual

You now know:
1. [Why AI bloats code](/manual/01-the-problem)
2. [The three-layer system](/manual/02-three-layers)
3. [What patterns to ban](/manual/03-banned-patterns)
4. How to maintain it (this page)

**Next:** Pick your agent and follow the [integration guide](/guides/cursor). Or read the [full playbook](/playbook) for the complete reference.
