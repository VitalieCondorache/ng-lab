import { ComponentFixture, TestBed } from '@angular/core/testing';
import { buttonByText, text } from '../../../testing/dom';
import { ChangeDetection } from './change-detection';

describe('ChangeDetection', () => {
  let fixture: ComponentFixture<ChangeDetection>;
  let host: HTMLElement;

  const runs = (selector: string) => text(host.querySelector(`${selector} .metric__value`));

  beforeEach(async () => {
    fixture = TestBed.createComponent(ChangeDetection);
    await fixture.whenStable();
    host = fixture.nativeElement as HTMLElement;
  });

  it('re-checks the Default child but leaves the OnPush child untouched', async () => {
    const before = { def: runs('app-default-child'), push: runs('app-onpush-child') };
    expect(before).toEqual({ def: '1', push: '1' });

    buttonByText(host, 'Trigger change detection').click();
    await fixture.whenStable();

    expect(Number(runs('app-default-child'))).toBeGreaterThan(Number(before.def));
    expect(runs('app-onpush-child')).toBe(before.push);
  });
});
