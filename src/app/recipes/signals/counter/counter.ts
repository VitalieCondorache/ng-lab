import { ChangeDetectionStrategy, Component, computed, effect, signal } from '@angular/core';
import { CodeBlock } from '../../../shared/ui/code-block';
import { DemoCard } from '../../../shared/ui/demo-card';
import { RecipeShell } from '../../../shared/ui/recipe-shell';

@Component({
  selector: 'app-counter',
  imports: [RecipeShell, DemoCard, CodeBlock],
  template: `
    <app-recipe-shell
      title="signal · computed · effect"
      blurb="Keep the source of truth in one place and derive everything else. The effect below runs again only when the values it actually reads change."
      [apis]="apis"
    >
      <app-demo-card
        title="Derive, don't duplicate"
        about="Move the sliders — subtotal, tax and total stay in sync without any manual bookkeeping."
      >
        <div stage class="stack">
          <div class="row">
            <div class="field grow">
              <label for="price">Unit price: {{ price() }}</label>
              <input
                id="price"
                type="range"
                min="1"
                max="50"
                [value]="price()"
                (input)="setPrice($event)"
              />
            </div>
            <div class="field grow">
              <label for="quantity">Quantity: {{ quantity() }}</label>
              <input
                id="quantity"
                type="range"
                min="0"
                max="10"
                [value]="quantity()"
                (input)="setQuantity($event)"
              />
            </div>
          </div>

          <div class="row">
            <div class="metric">
              <span class="metric__value">{{ subtotal() }}</span>
              <span class="metric__label">subtotal</span>
            </div>
            <div class="metric">
              <span class="metric__value">{{ tax() }}</span>
              <span class="metric__label">tax (20%)</span>
            </div>
            <div class="metric">
              <span class="metric__value">{{ total() }}</span>
              <span class="metric__label">total</span>
            </div>
          </div>

          <div class="field">
            <span class="field-label">effect output</span>
            <pre class="log">{{ trace() }}</pre>
          </div>
        </div>

        <app-code-block [code]="snippet" />
      </app-demo-card>
    </app-recipe-shell>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Counter {
  protected readonly apis = ['signal', 'computed', 'effect'];

  protected readonly price = signal(12);
  protected readonly quantity = signal(3);

  protected readonly subtotal = computed(() => this.price() * this.quantity());
  protected readonly tax = computed(() => Math.round(this.subtotal() * 0.2 * 100) / 100);
  protected readonly total = computed(() => Math.round((this.subtotal() + this.tax()) * 100) / 100);

  private readonly lines = signal<string[]>([]);
  protected readonly trace = computed(() => this.lines().join('\n'));

  constructor() {
    // Effects track whatever they read, so this logs the derived values, not every slider tick.
    effect(() => {
      const line = `subtotal ${this.subtotal()} → total ${this.total()}`;
      this.lines.update((lines) => [line, ...lines].slice(0, 6));
    });
  }

  protected setPrice(event: Event): void {
    this.price.set(Number((event.target as HTMLInputElement).value));
  }

  protected setQuantity(event: Event): void {
    this.quantity.set(Number((event.target as HTMLInputElement).value));
  }

  protected readonly snippet = `
readonly price = signal(12);
readonly quantity = signal(3);

readonly subtotal = computed(() => this.price() * this.quantity());
readonly tax = computed(() => this.subtotal() * 0.2);
readonly total = computed(() => this.subtotal() + this.tax());

effect(() => {
  // re-runs only when subtotal or total change
  console.log(this.total());
});
`.trim();
}
