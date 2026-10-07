import { ComponentFixture, TestBed } from '@angular/core/testing';
import { text } from '../../../testing/dom';
import { SignalIo } from './signal-io';

describe('SignalIo', () => {
  let fixture: ComponentFixture<SignalIo>;
  let host: HTMLElement;

  const stars = () => host.querySelectorAll<HTMLButtonElement>('.star');
  const parentRating = () => text(host.querySelector('.metric__value'));

  beforeEach(async () => {
    fixture = TestBed.createComponent(SignalIo);
    await fixture.whenStable();
    host = fixture.nativeElement as HTMLElement;
  });

  it('renders five stars from the default max input', () => {
    expect(stars()).toHaveLength(5);
    expect(parentRating()).toBe('0');
  });

  it('writes a two-way bound value back into the parent signal', async () => {
    stars()[2].click();
    await fixture.whenStable();

    expect(parentRating()).toBe('3');
  });

  it('reports every change through the output', async () => {
    stars()[0].click();
    await fixture.whenStable();

    expect(text(host.querySelector('.log'))).toContain('changed → 1');
  });
});
