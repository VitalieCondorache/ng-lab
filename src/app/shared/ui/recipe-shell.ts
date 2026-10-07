import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Shared chrome for every recipe page: heading, short description and the list of
 * Angular APIs the page demonstrates. The actual demo is projected by the caller.
 */
@Component({
  selector: 'app-recipe-shell',
  template: `
    <article class="recipe">
      <header class="recipe__head">
        <h1 class="recipe__title">{{ title() }}</h1>
        <p class="muted">{{ blurb() }}</p>
        <ul class="recipe__apis">
          @for (api of apis(); track api) {
            <li class="chip">{{ api }}</li>
          }
        </ul>
      </header>

      <ng-content />
    </article>
  `,
  styles: `
    .recipe__head {
      margin-bottom: 1.25rem;
    }

    .recipe__apis {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      margin: 0.75rem 0 0;
      padding: 0;
      list-style: none;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeShell {
  readonly title = input.required<string>();
  readonly blurb = input.required<string>();
  readonly apis = input<readonly string[]>([]);
}
