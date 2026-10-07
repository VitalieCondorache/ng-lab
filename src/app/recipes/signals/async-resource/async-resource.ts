import { ChangeDetectionStrategy, Component, computed, resource, signal } from '@angular/core';
import { CodeBlock } from '../../../shared/ui/code-block';
import { DemoCard } from '../../../shared/ui/demo-card';
import { RecipeShell } from '../../../shared/ui/recipe-shell';

type Channel = 'stable' | 'next';

interface Release {
  version: string;
  detail: string;
}

const RELEASES: Record<Channel, Release[]> = {
  stable: [
    { version: 'v22.2', detail: 'Current stable line' },
    { version: 'v22.1', detail: 'Previous minor' },
    { version: 'v21.2', detail: 'Long-term support' },
  ],
  next: [
    { version: 'v23.0-next.1', detail: 'Latest prerelease' },
    { version: 'v23.0-next.0', detail: 'First prerelease' },
  ],
};

@Component({
  selector: 'app-async-resource',
  imports: [RecipeShell, DemoCard, CodeBlock],
  template: `
    <app-recipe-shell
      title="resource"
      blurb="Async reads used to mean a hand-written loading/error/data triplet. resource models it as one signal you can ask for status, value and errors."
      [apis]="apis"
    >
      <app-demo-card
        title="Loading, error and data in one place"
        about="Change the channel to refetch automatically, or flip the failure toggle to see the error state."
      >
        <div stage class="stack">
          <div class="row">
            <div class="field grow">
              <label for="channel">Channel</label>
              <select id="channel" class="input" [value]="channel()" (change)="setChannel($event)">
                <option value="stable">stable</option>
                <option value="next">next</option>
              </select>
            </div>
            <div class="field">
              <label for="fail">Simulate failure</label>
              <input
                id="fail"
                class="switch"
                type="checkbox"
                [checked]="fail()"
                (change)="setFail($event)"
              />
            </div>
            <button type="button" class="btn" (click)="releases.reload()">Reload</button>
          </div>

          <div class="row">
            <div class="metric">
              <span class="metric__value">{{ releases.isLoading() ? '…' : list().length }}</span>
              <span class="metric__label">results</span>
            </div>
            <div class="metric">
              <span class="metric__value">{{ phase() }}</span>
              <span class="metric__label">status</span>
            </div>
          </div>

          @if (releases.isLoading()) {
            <p class="muted">Loading {{ channel() }} releases…</p>
          }

          @if (errorText(); as message) {
            <p class="alert">⚠ {{ message }}</p>
          }

          @if (list().length) {
            <ul class="list">
              @for (release of list(); track release.version) {
                <li>
                  <strong class="mono">{{ release.version }}</strong>
                  <span class="muted"> — {{ release.detail }}</span>
                </li>
              }
            </ul>
          }
        </div>

        <app-code-block [code]="snippet" />
      </app-demo-card>
    </app-recipe-shell>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsyncResource {
  protected readonly apis = ['resource', 'signal'];

  protected readonly channel = signal<Channel>('stable');
  protected readonly fail = signal(false);

  protected readonly releases = resource({
    params: () => ({ channel: this.channel(), fail: this.fail() }),
    loader: async ({ params, abortSignal }) => {
      await delay(700, abortSignal);
      if (params.fail) {
        throw new Error(`Could not load the ${params.channel} channel`);
      }
      return RELEASES[params.channel];
    },
  });

  protected readonly list = computed(() => this.releases.value() ?? []);

  protected readonly phase = computed(() => {
    if (this.releases.isLoading()) return 'loading';
    return this.releases.error() ? 'error' : 'ready';
  });

  protected readonly errorText = computed(() => {
    const error = this.releases.error();
    return error instanceof Error ? error.message : null;
  });

  protected setChannel(event: Event): void {
    this.channel.set((event.target as HTMLSelectElement).value as Channel);
  }

  protected setFail(event: Event): void {
    this.fail.set((event.target as HTMLInputElement).checked);
  }

  protected readonly snippet = `
readonly channel = signal<'stable' | 'next'>('stable');

readonly releases = resource({
  params: () => ({ channel: this.channel() }),
  loader: async ({ params, abortSignal }) => {
    await delay(700, abortSignal);
    return RELEASES[params.channel];
  },
});

// in the template
releases.isLoading();  releases.value();  releases.error();
`.trim();
}

function delay(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve) => {
    const id = setTimeout(resolve, ms);
    // Cancel the wait when the params change so stale loads finish early.
    signal?.addEventListener('abort', () => {
      clearTimeout(id);
      resolve();
    });
  });
}
