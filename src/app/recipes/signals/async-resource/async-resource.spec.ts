import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsyncResource } from './async-resource';

const LOAD_MS = 900;

describe('AsyncResource', () => {
  let fixture: ComponentFixture<AsyncResource>;
  let host: HTMLElement;

  beforeEach(async () => {
    fixture = TestBed.createComponent(AsyncResource);
    await fixture.whenStable();
    host = fixture.nativeElement as HTMLElement;
  });

  // The loader waits ~700ms before settling, so let the timer elapse.
  async function settle(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, LOAD_MS));
    await fixture.whenStable();
  }

  it('resolves the resource and renders the rows', async () => {
    await settle();

    expect(host.querySelectorAll('.list li').length).toBeGreaterThan(0);
    expect(host.querySelector('.alert')).toBeNull();
  });

  it('surfaces an error when the loader throws', async () => {
    const fail = host.querySelector('#fail') as HTMLInputElement;
    fail.checked = true;
    fail.dispatchEvent(new Event('change'));

    await settle();

    expect(host.querySelector('.alert')).toBeTruthy();
    expect(host.querySelectorAll('.list li')).toHaveLength(0);
  });
});
