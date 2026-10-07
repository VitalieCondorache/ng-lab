# Architecture

Angular Lab is deliberately small. It is meant to be read in one sitting, so the structure stays
flat and every feature is independent of the others.

## High level

```
main.ts  →  bootstrapApplication(App, appConfig)
                 │
                 ├─ appConfig: router + global error listeners (zoneless by default)
                 │
                 └─ App (shell): <app-header> + <app-sidebar> + <router-outlet>
```

Every recipe is a lazy route. Nothing under `recipes/` is part of the initial bundle — the browser
downloads a recipe's chunk the first time you open it.

## Layers

- **core/** — cross-cutting services with no UI: `Theme` (colour scheme), `Highlight` (lazy
  highlight.js) and the `recipes.ts` registry that both the sidebar and the router read from.
- **shared/** — presentational building blocks: the layout (`header`, `sidebar`) and UI pieces
  (`demo-card`, `code-block`, `recipe-shell`). They have no knowledge of any specific recipe.
- **recipes/** — one folder per recipe, grouped by theme. A recipe is a page; the small demo
  components it needs live in the same file.

## Why a registry?

The sidebar and the routes are driven by the same list in `core/recipes.ts`. Adding a recipe means
touching one array plus one route — the navigation can never drift out of sync with the pages that
exist.

## State

There is no store. State is either local signals inside a component or derived with `computed`.
The only RxJS used is where a real stream exists (debounced search, `valueChanges`), and it is
bridged back into signals with `toSignal`.

See `docs/adr/` for the decisions behind the zoneless setup, the styling approach and the lazy
routing.
