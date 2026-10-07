import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CodeBlock } from '../../../shared/ui/code-block';
import { DemoCard } from '../../../shared/ui/demo-card';
import { RecipeShell } from '../../../shared/ui/recipe-shell';

type Status = 'todo' | 'doing' | 'done';

interface Task {
  id: number;
  title: string;
  status: Status;
}

const NEXT_STATUS: Record<Status, Status> = {
  todo: 'doing',
  doing: 'done',
  done: 'todo',
};

@Component({
  selector: 'app-control-flow',
  imports: [RecipeShell, DemoCard, CodeBlock],
  template: `
    <app-recipe-shell
      title="Control flow"
      blurb="The built-in blocks are readable, type-checked and compile to the same instructions the old directives produced. The important part is track — it tells Angular how to keep DOM nodes stable."
      [apis]="apis"
    >
      <app-demo-card
        title="A keyed list that keeps its identity"
        about="Shuffle the list and watch the rows move instead of being re-created, because track follows each task id."
      >
        <div stage class="stack">
          <div class="row">
            <button type="button" class="btn btn--primary" (click)="add()">Add task</button>
            <button type="button" class="btn" (click)="shuffle()">Shuffle</button>
            <button type="button" class="btn" (click)="clearDone()">Clear done</button>
          </div>

          @if (doneCount() > 0) {
            <p class="muted">{{ doneCount() }} task(s) done.</p>
          }

          <ul class="list">
            @for (task of tasks(); track task.id) {
              <li class="row row--between">
                <span>{{ task.title }}</span>
                <span class="row">
                  @switch (task.status) {
                    @case ('todo') {
                      <span class="chip">todo</span>
                    }
                    @case ('doing') {
                      <span class="chip">doing</span>
                    }
                    @default {
                      <span class="chip chip--active">done</span>
                    }
                  }
                  <button type="button" class="btn" (click)="advance(task.id)">Advance</button>
                </span>
              </li>
            } @empty {
              <li class="muted">Nothing here yet — add a task.</li>
            }
          </ul>
        </div>

        <app-code-block [code]="snippet" />
      </app-demo-card>
    </app-recipe-shell>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlFlow {
  protected readonly apis = ['@if', '@for', '@switch', 'track'];

  private nextId = 4;

  protected readonly tasks = signal<Task[]>([
    { id: 1, title: 'Sketch the layout', status: 'done' },
    { id: 2, title: 'Wire up routing', status: 'doing' },
    { id: 3, title: 'Write the docs', status: 'todo' },
  ]);

  protected readonly doneCount = computed(
    () => this.tasks().filter((task) => task.status === 'done').length,
  );

  protected add(): void {
    const id = this.nextId++;
    this.tasks.update((tasks) => [...tasks, { id, title: `New task #${id}`, status: 'todo' }]);
  }

  protected shuffle(): void {
    this.tasks.update((tasks) => [...tasks].sort(() => Math.random() - 0.5));
  }

  protected clearDone(): void {
    this.tasks.update((tasks) => tasks.filter((task) => task.status !== 'done'));
  }

  protected advance(id: number): void {
    this.tasks.update((tasks) =>
      tasks.map((task) => (task.id === id ? { ...task, status: NEXT_STATUS[task.status] } : task)),
    );
  }

  protected readonly snippet = `
@if (doneCount() > 0) {
  <p>{{ doneCount() }} task(s) done.</p>
}

@for (task of tasks(); track task.id) {
  {{ task.title }}

  @switch (task.status) {
    @case ('todo')  { <span>todo</span> }
    @case ('doing') { <span>doing</span> }
    @default        { <span>done</span> }
  }
} @empty {
  <li>Nothing here yet.</li>
}
`.trim();
}
