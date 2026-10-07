import { Injectable, signal } from '@angular/core';
import type { HLJSApi } from 'highlight.js';

export type Language = 'typescript' | 'html' | 'scss' | 'bash' | 'json';

/**
 * Loads highlight.js on demand and registers only the grammars this site shows,
 * which keeps syntax highlighting out of the initial bundle.
 */
@Injectable({ providedIn: 'root' })
export class Highlight {
  /** Becomes true once the grammars are registered; templates read it to re-render. */
  readonly ready = signal(false);

  private api: HLJSApi | null = null;

  constructor() {
    void this.loadGrammars();
  }

  render(code: string, language: Language = 'typescript'): string {
    if (!this.api) {
      return escapeHtml(code);
    }
    try {
      return this.api.highlight(code, { language }).value;
    } catch {
      return escapeHtml(code);
    }
  }

  private async loadGrammars(): Promise<void> {
    const [{ default: hljs }, ts, xml, scss, bash, json] = await Promise.all([
      import('highlight.js/lib/core'),
      import('highlight.js/lib/languages/typescript'),
      import('highlight.js/lib/languages/xml'),
      import('highlight.js/lib/languages/scss'),
      import('highlight.js/lib/languages/bash'),
      import('highlight.js/lib/languages/json'),
    ]);

    hljs.registerLanguage('typescript', ts.default);
    hljs.registerLanguage('html', xml.default);
    hljs.registerLanguage('scss', scss.default);
    hljs.registerLanguage('bash', bash.default);
    hljs.registerLanguage('json', json.default);

    this.api = hljs;
    this.ready.set(true);
  }
}

function escapeHtml(code: string): string {
  return code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
