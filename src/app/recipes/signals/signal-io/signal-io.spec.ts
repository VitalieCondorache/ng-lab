import { TestBed } from '@angular/core/testing';
import { SignalIo } from './signal-io';

describe('SignalIo', () => {
  it('writes a two-way bound value back into the parent signal', async () => {
    const fixture = TestBed.createComponent(SignalIo);
    await fixture.whenStable();

    const host = fixture.nativeElement as HTMLElement;
    const stars = host.querySelectorAll<HTMLButtonElement>('.star');
    expect(stars.length).toBe(5);

    stars[2].click();
    await fixture.whenStable();

    const shown = host.querySelector('.metric__value')?.textContent?.trim();
    expect(shown).toBe('3');
  });
});
