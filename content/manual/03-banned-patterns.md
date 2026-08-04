---
title: Banned Patterns
description: AI bloat smells with real before/after code examples.
order: 3
---

# Banned Patterns

These are the most common ways AI bloats your code. Each has a rule and a before/after example.

## 1. Abstraction bloat

AI loves abstract base classes, factories, and interfaces — even when there's only one implementation.

**Rule:** No ABC/base class/factory unless **2+ implementations exist today**.

```python
# BAD — one implementation, unnecessary abstraction
from abc import ABC, abstractmethod

class BaseHandler(ABC):
    @abstractmethod
    def handle(self, data): ...

class EmailHandler(BaseHandler):
    def handle(self, data):
        send_email(data)

# GOOD — just write the function
def send_email(to: str, body: str) -> None:
    ...
```

## 2. Utils sprawl

AI creates `utils/` or `helpers/` modules and dumps unrelated functions in them.

**Rule:** Put helpers next to their only caller. No shared utils file unless 3+ callers.

```python
# BAD — helpers/utils.py with 40 unrelated functions
# format_date, parse_json, send_email, hash_password, ...

# GOOD — helper lives where it's used
# In notifications/email.py:
def _format_email_body(user, template):
    return template.replace("{{name}}", user.name)

def send_welcome_email(user):
    body = _format_email_body(user, WELCOME_TEMPLATE)
    ...
```

## 3. Unrequested features

You ask for one thing. AI adds five.

**Rule:** If it's not in the request or spec, don't build it.

```
Request: "Add email notification when user signs up"

AI adds:
  ✗ Rate limiter
  ✗ Analytics tracking
  ✗ Webhook system
  ✗ Retry policy with exponential backoff
  ✗ Notification provider abstraction

You wanted: send an email when someone signs up.
```

**Fix:** List forbidden scope in AGENTS.md:

```markdown
## Forbidden (out of scope)
- Rate limiting
- Analytics/tracking
- Webhook integrations
- Retry policies (use simple try/except for now)
```

## 4. Pass-through wrappers

AI creates functions that just call another function with the same args.

```python
# BAD — adds nothing
def get_user_data(user_id):
    return fetch_user(user_id)

# GOOD — just call fetch_user directly
user = fetch_user(user_id)
```

CodeDiet catches these automatically.

## 5. Duplicate helpers

AI rewrites a helper instead of reusing it, creating `_v2`, `_final`, `_new` versions.

```python
# BAD
def parse_config(path): ...
def parse_config_v2(path): ...  # slightly different, both exist
def parse_config_final(path): ...  # AI gave up and made a third

# GOOD — one function, fix it in place
def parse_config(path): ...
```

## 6. AI jargon

AI uses corporate-sounding words in code and comments.

**Banned in code/comments:**
`robust`, `comprehensive`, `leverage`, `utilize`, `ensure seamless`, `orchestrate`, `harness`

**Banned in agent chat:**
Flattery openers, "As an AI...", ceremonial closings

```python
# BAD
class UserPersistenceOrchestrationService:
    """Ensures seamless and robust user data persistence."""

# GOOD
def save_user(user):
    """Save user to database."""
```

## 7. Drive-by refactors

You ask to fix a bug in `auth.py`. AI also refactors `utils.py`, renames variables in `models.py`, and "improves" error handling in 4 other files.

**Rule:** Surgical changes only. Every changed line must trace to the request.

Add to AGENTS.md:

```markdown
## Surgical changes
- Touch only files required by the task
- Do not refactor unrelated code
- Do not rename variables outside the changed function
```

## How to enforce

| Pattern | Layer 1 (rules) | Layer 2 (local) | Layer 3 (CI) |
|---------|-------------------|-----------------|--------------|
| Abstraction bloat | AGENTS.md rule | CodeDiet | CodeDiet in CI |
| Utils sprawl | AGENTS.md rule | CodeDiet | CodeDiet in CI |
| Unrequested features | Forbidden scope list | PR template | PR template |
| Pass-through wrappers | AGENTS.md rule | CodeDiet | CodeDiet in CI |
| Duplicate helpers | AGENTS.md rule | CodeDiet | CodeDiet in CI |
| AI jargon | Cursor rule / AGENTS.md | Linter (custom) | Manual review |
| Drive-by refactors | AGENTS.md rule | Diff size check | CI diff warning |

## Next step

Learn how to [maintain](/manual/04-maintenance) these rules over time.
