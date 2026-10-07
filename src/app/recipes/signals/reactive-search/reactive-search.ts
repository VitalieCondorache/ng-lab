import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { delay, distinctUntilChanged, of, Subject, debounceTime, switchMap } from 'rxjs';
import { CodeBlock } from '../../../shared/ui/code-block';
import { DemoCard } from '../../../shared/ui/demo-card';
import { RecipeShell } from '../../../shared/ui/recipe-shell';

const CATALOG = [
  'signal',
  'computed',
  'effect',
  'resource',
  'linkedSignal',
  'input',
  'model',
  'output',
  'defer',
  'track',
];

@Component({
  selector: 'app-reactive-search',
  imports: [RecipeShell, DemoCard, CodeBlock],
  template: `
    <app-recipe-shell
      title="RxJS interop"
      blurb="RxJS is still the right tool for event streams. Bridge it into the signal world with toSignal and keep the rest of the component synchronous."
      [apis]="apis"
    >
      <app-demo-card
        title="Debounced search"
        about="Type quickly: the request only fires 300ms after you stop, and switchMap cancels the previous one."
      >
        <div stage class="stack">
          <div class="field">
            <label for="search">Search Angular APIs</label>
            <input
              id="search"
              class="input"
              type="search"
              placeholder="signal, defer, track…"
              [value]="query()"
              (input)="onInput($event)"
            />
          </div>

          <p class="muted">
            last query: <span class="mono">{{ query() || '—' }}</span>
          </p>

          @if (results().length) {
            <ul class="list">
              @for (hit of results(); track hit) {
                <li>{{ hit }}</li>
              }
            </ul>
          } @else {
            <p class="muted">No matches yet.</p>
          }
        </div>

        <app-code-block [code]="snippet" />
      </app-demo-card>
    </app-recipe-shell>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactiveSearch {
  protected readonly apis = ['toSignal', 'debounceTime', 'switchMap'];

  private readonly terms = new Subject<string>();

  protected readonly query = signal('');

  protected readonly results = toSignal(
    this.terms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term) => this.search(term)),
    ),
    { initialValue: [] as string[] },
  );

  protected onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.query.set(value);
    this.terms.next(value);
  }

  private search(term: string) {
    const needle = term.trim().toLowerCase();
    const hits = needle ? CATALOG.filter((item) => item.includes(needle)) : [];
    // Stand-in for a remote call so the debounce window is actually visible.
    return of(hits).pipe(delay(250));
  }

  protected readonly snippet = `
private readonly terms = new Subject<string>();

readonly results = toSignal(
  this.terms.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap((term) => this.search(term)),
  ),
  { initialValue: [] as string[] },
);
`.trim();
}
