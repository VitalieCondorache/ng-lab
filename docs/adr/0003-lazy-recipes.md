# 3. Lazy-load every recipe

## Context

The site is a reference: people arrive on one URL, read one recipe and leave. Loading all of them
up front would waste bandwidth on the ones a visitor never opens.

## Decision

Each recipe is its own lazy route (`loadComponent`), and the recipe list is a flat array of routes.

## Consequences

- The initial bundle stays small; the build emits one chunk per recipe, plus separate chunks for
  the highlight.js grammars.
- Route-level code splitting means a recipe can pull a heavy dependency (the forms module, a
  grammar) without affecting the first load.
- Nested routes would have grouped chunks by section, but flat routes matched the sidebar so
  closely that the extra indirection was not worth it.
