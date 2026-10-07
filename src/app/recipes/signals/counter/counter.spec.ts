import { ComponentFixture, TestBed } from '@angular/core/testing';
import { texts } from '../../../testing/dom';
import { Counter } from './counter';

describe('Counter', () => {
  let fixture: ComponentFixture<Counter>;
  let host: HTMLElement;

  const metrics = () => texts(host.querySelectorAll('.metric__value'));

  beforeEach(async () => {
    fixture = TestBed.createComponent(Counter);
    await fixture.whenStable();
    host = fixture.nativeElement as HTMLElement;
  });

  it('derives subtotal, tax and total from the two signals', () => {
    expect(metrics()).toEqual(['36', '7.2', '43.2']);
  });

  it('recomputes everything when an input changes', async () => {
    const price = host.querySelector('#price') as HTMLInputElement;
    price.value = '10';
    price.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    expect(metrics()).toEqual(['30', '6', '36']);
  });

  it('reports the derived values through the effect log', () => {
    expect(host.querySelector('.log')?.textContent).toContain('subtotal 36');
  });
});
