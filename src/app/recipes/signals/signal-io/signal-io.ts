import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { CodeBlock } from '../../../shared/ui/code-block';
import { DemoCard } from '../../../shared/ui/demo-card';
import { RecipeShell } from '../../../shared/ui/recipe-shell';

@Component({
  selector: 'app-star-rating',
  template: `
    <div class="row" role="group" [attr.aria-label]="'Rating ' + value() + ' of ' + max()">
      @for (star of stars(); track star) {
        <button
          type="button"
          class="star"
          [class.star--on]="star <= value()"
          [attr.aria-label]="'Set rating to ' + star"
          (click)="pick(star)"
        >
          ★
        </button>
      }
    </div>
  `,
  styles: `
    .star {
      border: none;
      background: none;
      padding: 0 0.1rem;
      font-size: 1.6rem;
      line-height: 1;
      color: var(--border);
      cursor: pointer;
    }

    .star:hover,
    .star--on {
      color: var(--accent);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarRating {
  readonly max = input(5);
  readonly value = model(0);
  readonly changed = output<number>();

  protected readonly stars = computed(() => Array.from({ length: this.max() }, (_, i) => i + 1));

  protected pick(star: number): void {
    this.value.set(star);
    this.changed.emit(star);
  }
}

@Component({
  selector: 'app-signal-io',
  imports: [RecipeShell, DemoCard, CodeBlock, StarRating],
  template: `
    <app-recipe-shell
      title="input · model · output"
      blurb="Component inputs and outputs are signals now. model() gives you a two-way binding, while output() replaces the old EventEmitter."
      [apis]="apis"
    >
      <app-demo-card
        title="Two-way binding without ceremony"
        about="The child writes straight back into the parent's signal through [(value)] and reports each change through output()."
      >
        <div stage class="stack">
          <app-star-rating [(value)]="rating" (changed)="onChanged($event)" />

          <div class="row">
            <div class="metric">
              <span class="metric__value">{{ rating() }}</span>
              <span class="metric__label">parent rating</span>
            </div>
          </div>

          <pre class="log">{{ log() }}</pre>
        </div>

        <app-code-block [code]="snippet" />
      </app-demo-card>
    </app-recipe-shell>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalIo {
  protected readonly apis = ['input', 'model', 'output'];

  protected readonly rating = signal(0);

  private readonly events = signal<string[]>([]);
  protected readonly log = computed(() => this.events().join('\n') || 'no output yet');

  protected onChanged(value: number): void {
    this.events.update((events) => [`changed → ${value}`, ...events].slice(0, 5));
  }

  protected readonly snippet = `
// child
readonly max = input(5);
readonly value = model(0);
readonly changed = output<number>();

// parent — two-way binding to a signal
<app-star-rating [(value)]="rating" (changed)="onChanged($event)" />
`.trim();
}
