import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { CodeBlock } from '../../../shared/ui/code-block';
import { DemoCard } from '../../../shared/ui/demo-card';
import { RecipeShell } from '../../../shared/ui/recipe-shell';

// Both children share this template; only their change-detection strategy differs.
const CHILD_TEMPLATE = `
  <div class="card-box stack stack--tight">
    <div class="row row--between">
      <strong>{{ label() }}</strong>
      <span class="badge">{{ mode }}</span>
    </div>
    <div class="metric">
      <span class="metric__value">{{ render() }}</span>
      <span class="metric__label">template runs</span>
    </div>
  </div>
`;

@Component({
  selector: 'app-default-child',
  template: CHILD_TEMPLATE,
  // eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection -- Default is the point of this demo
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DefaultChild {
  readonly label = input('');

  protected readonly mode = 'Default';
  private runs = 0;

  // Counting here is a side effect on purpose — it makes the re-renders visible.
  protected render(): number {
    return ++this.runs;
  }
}

@Component({
  selector: 'app-onpush-child',
  template: CHILD_TEMPLATE,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnPushChild {
  readonly label = input('');

  protected readonly mode = 'OnPush';
  private runs = 0;

  protected render(): number {
    return ++this.runs;
  }
}

@Component({
  selector: 'app-change-detection',
  imports: [RecipeShell, DemoCard, CodeBlock, DefaultChild, OnPushChild],
  template: `
    <app-recipe-shell
      title="OnPush vs Default"
      blurb="Change detection is where most Angular performance stories start. OnPush tells Angular to skip a component unless something it depends on actually changed."
      [apis]="apis"
    >
      <app-demo-card
        title="Count the checks"
        about="Each click nudges an unrelated signal. The Default child re-checks every pass; the OnPush child is skipped because none of its inputs changed."
      >
        <div stage class="stack">
          <div class="row">
            <button type="button" class="btn btn--primary" (click)="bump()">
              Trigger change detection
            </button>
            <span class="chip">unrelated ticks: {{ tick() }}</span>
          </div>

          <div class="grid">
            <app-default-child label="Default strategy" />
            <app-onpush-child label="OnPush strategy" />
          </div>
        </div>

        <app-code-block [code]="snippet" />
      </app-demo-card>
    </app-recipe-shell>
  `,
  styles: `
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
      gap: 1rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeDetection {
  protected readonly apis = ['ChangeDetectionStrategy', 'OnPush'];

  protected readonly tick = signal(0);

  protected bump(): void {
    this.tick.update((value) => value + 1);
  }

  protected readonly snippet = `
// the parent only touches an unrelated value
tick.update((value) => value + 1);

@Component({ changeDetection: ChangeDetectionStrategy.OnPush })
// re-checked when an input changes or an event fires inside it

@Component({ changeDetection: ChangeDetectionStrategy.Default })
// re-checked on every change-detection pass
`.trim();
}
