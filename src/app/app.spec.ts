import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('mounts the header and sidebar shell', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelector('app-header')).toBeTruthy();
    expect(host.querySelector('app-sidebar')).toBeTruthy();
    expect(host.querySelector('router-outlet')).toBeTruthy();
  });

  it('renders the recipe navigation', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelectorAll('.side__group-title')).toHaveLength(3);
    expect(host.querySelectorAll('.side__link').length).toBeGreaterThanOrEqual(10);
  });
});
