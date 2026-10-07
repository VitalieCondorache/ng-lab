import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CodeBlock } from '../../../shared/ui/code-block';
import { DemoCard } from '../../../shared/ui/demo-card';
import { RecipeShell } from '../../../shared/ui/recipe-shell';

@Component({
  selector: 'app-heavy-panel',
  template: `
    <div class="card-box stack stack--tight">
      <strong>Heavy panel loaded</strong>
      <p class="muted">
        This component shipped in its own chunk and was fetched only on interaction.
      </p>
      <div class="bars" aria-hidden="true">
        @for (bar of bars; track $index) {
          <span class="bars__bar" [style.height.%]="bar"></span>
        }
      </div>
    </div>
  `,
  styles: `
    .bars {
      display: flex;
      align-items: flex-end;
      gap: 3px;
      height: 72px;
    }

    .bars__bar {
      flex: 1;
      border-radius: 2px 2px 0 0;
      background: var(--accent);
      opacity: 0.75;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeavyPanel {
  protected readonly bars = Array.from({ length: 24 }, () => 15 + Math.round(Math.random() * 85));
}

@Component({
  selector: 'app-defer',
  imports: [RecipeShell, DemoCard, CodeBlock, HeavyPanel],
  template: `
    <app-recipe-shell
      title="Deferrable views"
      blurb="Heavy parts of a page rarely need to load up front. @defer splits them into their own chunk and gives you placeholder, loading and error states for free."
      [apis]="apis"
    >
      <app-demo-card
        title="Load a chunk on demand"
        about="The panel starts out as a lightweight placeholder. Click it and the real component is fetched and rendered."
      >
        <div stage class="stack">
          @defer (on interaction) {
            <app-heavy-panel />
          } @placeholder {
            <button type="button" class="btn btn--primary">Click to load the heavy panel</button>
          } @loading (minimum 400ms) {
            <div class="card-box muted">Fetching the chunk…</div>
          } @error {
            <p class="alert">The panel could not be loaded.</p>
          }
        </div>

        <app-code-block [code]="snippet" />
      </app-demo-card>
    </app-recipe-shell>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeferRecipe {
  protected readonly apis = ['@defer', '@placeholder', '@loading', '@error'];

  protected readonly snippet = `
@defer (on interaction) {
  <app-heavy-panel />
} @placeholder {
  <button>Click to load</button>
} @loading (minimum 400ms) {
  <p>Fetching the chunk…</p>
} @error {
  <p>The panel could not be loaded.</p>
}

// other triggers: on idle, on viewport, on timer(3s), on hover
`.trim();
}
