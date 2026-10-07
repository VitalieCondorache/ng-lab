import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { CodeBlock } from '../../../shared/ui/code-block';
import { DemoCard } from '../../../shared/ui/demo-card';
import { RecipeShell } from '../../../shared/ui/recipe-shell';

interface Item {
  id: number;
  label: string;
}

@Component({
  selector: 'app-track-row',
  template: `
    <div class="card-box row row--between">
      <span>{{ label() }}</span>
      <span class="mono muted">node #{{ uid }}</span>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackRow {
  readonly label = input.required<string>();

  // Assigned once per component instance. A reused instance keeps its id, a recreated one gets a new id.
  protected readonly uid = Math.floor(1000 + Math.random() * 9000);
}

@Component({
  selector: 'app-dom-reuse',
  imports: [RecipeShell, DemoCard, CodeBlock, TrackRow],
  template: `
    <app-recipe-shell
      title="track in @for"
      blurb="track is not just about avoiding an error. It tells Angular which DOM nodes to keep. Get it right and rows are moved and reused; get it wrong and component state jumps between items."
      [apis]="apis"
    >
      <app-demo-card
        title="Follow the node id"
        about="Add an item at the top or shuffle. With track item.id each node stays with its data; with track $index the node stays where it is while the data changes underneath it."
      >
        <div stage class="stack">
          <div class="row">
            <button type="button" class="btn btn--primary" (click)="addTop()">Add at top</button>
            <button type="button" class="btn" (click)="shuffle()">Shuffle</button>
          </div>

          <div class="grid">
            <section class="stack">
              <h3 class="align">track item.id</h3>
              <div class="stack stack--tight">
                @for (item of items(); track item.id) {
                  <app-track-row [label]="item.label" />
                }
              </div>
            </section>

            <section class="stack">
              <h3 class="align">track $index</h3>
              <div class="stack stack--tight">
                @for (item of items(); track $index) {
                  <app-track-row [label]="item.label" />
                }
              </div>
            </section>
          </div>
        </div>

        <app-code-block [code]="snippet" />
      </app-demo-card>
    </app-recipe-shell>
  `,
  styles: `
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
      gap: 1rem;
    }

    .align {
      font-size: 0.82rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DomReuse {
  protected readonly apis = ['@for', 'track'];

  private nextId = 4;

  protected readonly items = signal<Item[]>([
    { id: 1, label: 'Alpha' },
    { id: 2, label: 'Bravo' },
    { id: 3, label: 'Charlie' },
  ]);

  protected addTop(): void {
    const id = this.nextId++;
    this.items.update((items) => [{ id, label: `Item ${id}` }, ...items]);
  }

  protected shuffle(): void {
    this.items.update((items) => [...items].sort(() => Math.random() - 0.5));
  }

  protected readonly snippet = `
@for (item of items(); track item.id) {
  <app-track-row [label]="item.label" />
}

@for (item of items(); track $index) {
  <app-track-row [label]="item.label" />
}
`.trim();
}
