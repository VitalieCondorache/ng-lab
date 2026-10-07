# Angular Lab

An interactive reference for modern Angular. Every page is a small, runnable example of the
signals, patterns and performance techniques I reach for most often — with the code sitting right
next to the demo, ready to copy.

> Live demo: https://vitaliecondorache.github.io/ng-lab/

## What is in here

- **Signals & Reactivity** — `signal`/`computed`/`effect`, `linkedSignal`, `resource`, RxJS interop
  via `toSignal`, and signal-based component I/O (`input`/`model`/`output`).
- **Modern Patterns** — the built-in control flow, deferrable views and typed reactive forms.
- **Performance Lab** — OnPush vs Default change detection, and why `track` matters in `@for`.

## Why another Angular demo site?

Most of them stop at a slider and a number. I wanted something I could keep open in a second tab
while working: a reference that shows _why_ an API behaves the way it does, not just that it
exists. So each recipe pairs a live demo with the smallest snippet that reproduces it.

## Running it locally

```bash
npm install
npm start
```

Then open http://localhost:4200.

## Useful scripts

```bash
npm start          # dev server
npm run build      # production build
npm test           # unit tests (Vitest)
npm run lint       # ESLint
npm run format     # Prettier
```

A pre-commit hook formats and lints staged files, so `npm run format` is mostly a convenience.

## Built with

- Angular with standalone components — no NgModules.
- **Zoneless** change detection; the app ships without `zone.js`.
- Signals for state, with RxJS only where a stream is genuinely the right fit.
- SCSS driven by design tokens — no component library, so the styling stays predictable.
- `highlight.js` pulled in on demand for the code blocks (kept out of the initial bundle).

## Project layout

```
src/app/
  core/        theme, syntax highlighting, recipe registry
  shared/      layout (header, sidebar) and small UI pieces
  recipes/     one folder per recipe, lazy-loaded per route
```

Adding a recipe is a folder plus a route — see [CONTRIBUTING.md](./CONTRIBUTING.md).

## Deployment

Pushes to `main` build and publish to GitHub Pages through the workflow in
`.github/workflows/deploy.yml`.

## License

MIT — see [LICENSE](./LICENSE).
