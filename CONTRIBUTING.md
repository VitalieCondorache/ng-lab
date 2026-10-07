# Contributing

Small, focused additions are welcome. Here is how the pieces fit together.

## Adding a recipe

1. Create a folder under `src/app/recipes/<group>/<name>/` with a single `<name>.ts` component.
2. Register it in `src/app/core/recipes.ts` so it appears in the sidebar.
3. Add a lazy route for it in `src/app/app.routes.ts`.

Keep each recipe to a single idea. Wrap the page in `<app-recipe-shell>` and put the interactive
part inside `<app-demo-card>`, with the matching snippet below it in an `<app-code-block>`.

## Conventions

- Standalone components only, with `ChangeDetectionStrategy.OnPush` everywhere.
- State lives in signals. Reach for RxJS only when a stream is genuinely the right tool.
- Comments explain _why_, not _what_.
- Code and comments in English.

## Before you push

```bash
npm run lint
npm test
npm run build
```

The pre-commit hook runs Prettier and ESLint on the staged files for you.
