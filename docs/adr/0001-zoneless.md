# 1. Run the app zoneless

## Context

`zone.js` patches every async API so Angular can find out when something changed. That mechanism
is convenient but coarse: it triggers change detection far more often than needed, and it adds a
non-trivial amount of code to the initial bundle.

Signals give Angular something it never had before — a precise notification of what changed.

## Decision

Bootstrap the app with zoneless change detection and do not depend on `zone.js` at all.

## Consequences

- Change detection is driven by signals and by the events Angular already knows about, so it runs
  far less often.
- No `zone.js` in the bundle.
- We give up the safety net: state that lives outside a signal and outside a template event will
  not be picked up on its own. Every recipe therefore keeps its state in signals, which is a habit
  worth having anyway.
- `OnPush` becomes the natural default rather than an optimisation to remember.
