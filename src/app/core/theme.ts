import { Injectable, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'ng-lab-theme';

/**
 * Holds the active colour theme and mirrors it onto `<html data-theme>`.
 * The starting value matches what index.html painted, so toggling never causes a flash.
 */
@Injectable({ providedIn: 'root' })
export class Theme {
  readonly current = signal<ThemeMode>(initialTheme());

  toggle(): void {
    this.apply(this.current() === 'dark' ? 'light' : 'dark');
  }

  private apply(theme: ThemeMode): void {
    this.current.set(theme);
    document.documentElement.dataset['theme'] = theme;
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* storage can be blocked — the theme still applies for this session */
    }
  }
}

function initialTheme(): ThemeMode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
  } catch {
    /* ignore and fall through to the system preference */
  }
  return prefersDark() ? 'dark' : 'light';
}

function prefersDark(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
}
