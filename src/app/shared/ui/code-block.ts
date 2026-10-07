import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { Highlight, type Language } from '../../core/highlight';

@Component({
  selector: 'app-code-block',
  templateUrl: './code-block.html',
  styleUrl: './code-block.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeBlock {
  readonly code = input.required<string>();
  readonly language = input<Language>('typescript');
  readonly label = input('');

  private readonly highlighter = inject(Highlight);
  protected readonly copied = signal(false);

  protected readonly markup = computed(() => {
    // Reading `ready` keeps the markup in sync with the lazy grammar registration.
    this.highlighter.ready();
    return this.highlighter.render(this.code(), this.language());
  });

  protected async copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.code());
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1600);
    } catch {
      /* the clipboard can be unavailable in some browsers; the code is still selectable */
    }
  }
}
