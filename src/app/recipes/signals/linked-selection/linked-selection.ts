import { ChangeDetectionStrategy, Component, computed, linkedSignal, signal } from '@angular/core';
import { CodeBlock } from '../../../shared/ui/code-block';
import { DemoCard } from '../../../shared/ui/demo-card';
import { RecipeShell } from '../../../shared/ui/recipe-shell';

const ITEMS: Record<string, string[]> = {
  Frameworks: ['Angular', 'React', 'Vue'],
  'Signals & APIs': ['signal', 'computed', 'linkedSignal'],
  Tooling: ['vitest', 'eslint', 'prettier'],
};

@Component({
  selector: 'app-linked-selection',
  imports: [RecipeShell, DemoCard, CodeBlock],
  template: `
    <app-recipe-shell
      title="linkedSignal"
      blurb="Some state is writable but should reset when something else changes. linkedSignal gives you exactly that — no reset logic in the template or an effect."
      [apis]="apis"
    >
      <app-demo-card
        title="Selection that follows its source"
        about="Pick an item, then change the group. The selection snaps back to the first item of the new group."
      >
        <div stage class="stack">
          <div class="field">
            <label for="group">Group</label>
            <select id="group" class="input" [value]="group()" (change)="setGroup($event)">
              @for (option of groups; track option) {
                <option [value]="option">{{ option }}</option>
              }
            </select>
          </div>

          <div class="field">
            <span class="field-label">Items</span>
            <div class="row">
              @for (item of items(); track item) {
                <button
                  type="button"
                  class="chip"
                  [class.chip--active]="item === selected()"
                  (click)="selected.set(item)"
                >
                  {{ item }}
                </button>
              }
            </div>
          </div>

          <div class="row">
            <div class="metric">
              <span class="metric__value">{{ selected() }}</span>
              <span class="metric__label">selected</span>
            </div>
          </div>
        </div>

        <app-code-block [code]="snippet" />
      </app-demo-card>
    </app-recipe-shell>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkedSelection {
  protected readonly apis = ['linkedSignal'];

  protected readonly groups = Object.keys(ITEMS);
  protected readonly group = signal(this.groups[0]);

  protected readonly items = computed(() => ITEMS[this.group()]);

  // Writable, yet recomputed to the first item whenever `group` changes.
  protected readonly selected = linkedSignal({
    source: this.group,
    computation: (group) => ITEMS[group][0],
  });

  protected setGroup(event: Event): void {
    this.group.set((event.target as HTMLSelectElement).value);
  }

  protected readonly snippet = `
readonly group = signal('Frameworks');

readonly selected = linkedSignal({
  source: this.group,
  computation: (group) => this.itemsByGroup[group][0],
});

// still writable
this.selected.set('Angular');
`.trim();
}
