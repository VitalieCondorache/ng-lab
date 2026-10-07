# 2. No component library

## Context

Angular Material (or any other kit) would have saved time on layout and theming. It would also
have pulled in a large dependency and a visual language that is not ours.

The site only needs a handful of primitives: buttons, inputs, a sidebar, a card. None of them are
complex enough to justify a framework.

## Decision

Build the UI from SCSS driven by CSS custom properties, and keep one small global stylesheet for
the shared primitives. No component library.

## Consequences

- The whole visual layer is a few hundred lines of SCSS we fully control and can explain.
- Dark mode is a single `[data-theme]` attribute that swaps the token values — no theme module to
  configure.
- We own the accessibility and the responsive behaviour, so we have to be deliberate about it.
- Adding a genuinely complex widget later (a data grid, say) would be a real reason to reconsider.
