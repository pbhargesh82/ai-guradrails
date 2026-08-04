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
- Inline styles instead of CSS classes
- Landing page UI patterns (cards, hero, marketing CTAs)
- Unstyled HTML overcorrection (missing `.page`/`.prose` wrappers)

## Output format

1. List each smell found
2. Verdict: SHIP or SIMPLIFY FIRST
3. If SIMPLIFY FIRST: specific deletions/simplifications
