---
title: The Problem
description: Why AI coding agents bloat your code — and why prompts alone don't fix it.
order: 1
---

# The Problem

You're vibe coding. AI writes code fast. Everything feels great — until you look at the repo a week later.

## What goes wrong

AI coding agents are trained to look **comprehensive**, not **minimal**. Without guardrails, your repo turns into:

- **Abstract base classes** for one implementation
- **`utils/` folders** that grow forever with unrelated helpers
- **Features you never asked for** — rate limiters, analytics, retry policies
- **Drive-by refactors** in files you didn't mention
- **Code that was never run** — plausible but broken

## Real example

You ask: *"Add email notification when a user signs up."*

AI delivers:
- `BaseNotificationHandler` abstract class
- `EmailNotificationHandler`, `WebhookNotificationHandler`
- `utils/notification_helpers.py` with 12 functions
- Rate limiter, retry policy, analytics tracking
- Config file for notification providers

You wanted: a function that sends an email.

## Why prompts don't fix it

You can say "keep it simple" in every message. It helps for one task. Then:

- A new chat session forgets
- A different agent tool ignores it
- The model defaults back to "comprehensive" on the next task
- You get tired of repeating yourself

**Prompts are suggestions. Guardrails are enforcement.**

## What you actually need

Two things working together:

1. **Behavioral rules** — files the agent reads every session (`AGENTS.md`, rules, skills)
2. **Mechanical gates** — tools that catch bloat before it merges (linters, pre-commit, CI)

Think of it like a speed bump vs a wall. Prompts are asking nicely. Guardrails are infrastructure.

## Who this is for

- **Vibe coders**: you ship fast with AI and don't want to babysit every line
- **Solo devs**: no code review team to catch AI slop
- **Anyone** who's opened a PR and thought "I didn't ask for half of this"

## Next step

Learn the [three-layer system](/manual/02-three-layers) that fixes this.
