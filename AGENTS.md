# AGENTS.md

## Non-negotiables

- No flattery. Disagree when I'm wrong.
- Read files before editing. State your plan first.
- Every changed line must trace to my request.
- Run `npm run lint` and `npm run build` before claiming done.

## Before writing code

- Read surrounding files. Match existing conventions.
- State assumptions. Ask when ambiguous.
- Do not refactor unrelated code.

## Simplicity first

- Minimum code that solves the task.
- No abstract base classes unless 2+ implementations exist today.
- No utils/ sprawl — put helpers next to their only caller.

## Surgical changes

- Touch only files required by the task.
- Do not add features not in the request.

## Goal-driven execution

- Verifiable success criteria before coding.
- Run lint and build before claiming done.

## Project context

- **Stack:** Next.js 15, TypeScript, Tailwind v4, static export (`output: 'export'`)
- **Source dirs:** `src/`, `content/`
- **Content:** Markdown in `content/`; playbook source is `anti-ai-bloat-guardrails-playbook.md`
- **Commands:**
  - install: `npm install`
  - dev: `npm run dev`
  - build: `npm run build`
  - lint: `npm run lint`
- **Deploy:** Netlify, publish dir `out/`

## Forbidden (out of scope)

- Backend API routes or server-side data fetching at runtime
- Auth, user accounts, CMS, database
- Setup wizard (roadmap Phase 3 only)
- Card grids, hero sections, marketing landing page UI
- Unstyled HTML / inline `style={}` in components

## UI design target

This is a **documentation site**, not a product landing page.

- Clean docs aesthetic (MDN / Read the Docs style)
- CSS classes in `globals.css`, not inline styles
- All pages wrapped in `.page` or `.prose` for consistent typography
- Server-rendered sidebar nav, no client JS unless one small component is truly needed
- Allowed: typography, spacing, borders, sidebar, active nav state
- Banned: card grids, hero CTAs, accent-color marketing spans, backdrop-blur, animation libraries

## Project Learnings

- De-bloat means remove unrequested features and abstractions, not remove all design. This is a docs site — it needs readable typography, spacing, and navigation. Target: clean docs aesthetic. NOT a SaaS landing page. NOT unstyled HTML.
- Use CSS classes in `globals.css`, never inline `style={}` in React components.
- Homepage content must be inside `.page` or `.prose` — otherwise headings and lists render unstyled.
