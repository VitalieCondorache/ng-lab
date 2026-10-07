import { ComponentFixture, TestBed } from '@angular/core/testing';
import { text } from '../../../testing/dom';
import { LinkedSelection } from './linked-selection';

describe('LinkedSelection', () => {
  let fixture: ComponentFixture<LinkedSelection>;
  let host: HTMLElement;

  const selected = () => text(host.querySelector('.metric__value'));

  beforeEach(async () => {
    fixture = TestBed.createComponent(LinkedSelection);
    await fixture.whenStable();
    host = fixture.nativeElement as HTMLElement;
  });

  it('starts on the first item of the first group', () => {
    expect(selected()).toBe('Angular');
  });

  it('resets the selection when the source group changes', async () => {
    const select = host.querySelector('#group') as HTMLSelectElement;
    select.value = 'Tooling';
    select.dispatchEvent(new Event('change'));
    await fixture.whenStable();

    expect(selected()).toBe('vitest');
  });

  it('stays writable — a chip click overrides the selection', async () => {
    const chip = Array.from(host.querySelectorAll('button.chip')).find(
      (candidate) => text(candidate) === 'Vue',
    ) as HTMLButtonElement;

    chip.click();
    await fixture.whenStable();

    expect(selected()).toBe('Vue');
  });
});
