import { TestBed } from '@angular/core/testing';
import { AsyncResource } from './async-resource';

describe('AsyncResource', () => {
  it('resolves the resource and renders the rows', async () => {
    const fixture = TestBed.createComponent(AsyncResource);
    await fixture.whenStable();

    // The loader waits ~700ms before resolving, so let the timer elapse.
    await new Promise((resolve) => setTimeout(resolve, 900));
    await fixture.whenStable();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelectorAll('.list li').length).toBeGreaterThan(0);
  });
});
