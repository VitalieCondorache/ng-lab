import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Theme } from '../../core/theme';
import { text } from '../../testing/dom';
import { Header } from './header';

describe('Header', () => {
  let fixture: ComponentFixture<Header>;
  let host: HTMLElement;

  beforeEach(async () => {
    localStorage.clear();
    delete document.documentElement.dataset['theme'];
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    fixture = TestBed.createComponent(Header);
    await fixture.whenStable();
    host = fixture.nativeElement as HTMLElement;
  });

  it('shows the product brand', () => {
    expect(text(host.querySelector('.topbar__brand'))).toContain('Angular Lab');
  });

  it('toggles the theme and reflects it on the button and <html>', async () => {
    const theme = TestBed.inject(Theme);
    const button = host.querySelector('.topbar__theme') as HTMLButtonElement;
    const before = button.getAttribute('aria-pressed');

    button.click();
    await fixture.whenStable();

    expect(button.getAttribute('aria-pressed')).not.toBe(before);
    expect(theme.current()).toBe(document.documentElement.dataset['theme']);
  });
});
