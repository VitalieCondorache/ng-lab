import { Theme } from './theme';

const originalMatchMedia = window.matchMedia;

function stubMatchMedia(matches: boolean): void {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: (query: string) =>
      ({
        matches,
        media: query,
        onchange: null,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
        addListener: () => undefined,
        removeListener: () => undefined,
        dispatchEvent: () => false,
      }) as unknown as MediaQueryList,
  });
}

describe('Theme', () => {
  beforeEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset['theme'];
  });

  afterEach(() => {
    if (originalMatchMedia) {
      window.matchMedia = originalMatchMedia;
    } else {
      delete (window as unknown as { matchMedia?: unknown }).matchMedia;
    }
  });

  it('defaults to light when nothing is stored and the system is not dark', () => {
    expect(new Theme().current()).toBe('light');
  });

  it('restores the stored theme on construction', () => {
    localStorage.setItem('ng-lab-theme', 'dark');
    expect(new Theme().current()).toBe('dark');
  });

  it('ignores a stored value that is not a known theme', () => {
    localStorage.setItem('ng-lab-theme', 'sepia');
    expect(new Theme().current()).toBe('light');
  });

  it('uses the system preference when there is nothing stored', () => {
    stubMatchMedia(true);
    expect(new Theme().current()).toBe('dark');
  });

  it('toggles, persists and mirrors the theme onto <html>', () => {
    const theme = new Theme();

    theme.toggle();
    expect(theme.current()).toBe('dark');
    expect(localStorage.getItem('ng-lab-theme')).toBe('dark');
    expect(document.documentElement.dataset['theme']).toBe('dark');

    theme.toggle();
    expect(theme.current()).toBe('light');
    expect(localStorage.getItem('ng-lab-theme')).toBe('light');
    expect(document.documentElement.dataset['theme']).toBe('light');
  });
});
