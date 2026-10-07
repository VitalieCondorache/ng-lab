import { ComponentFixture, TestBed } from '@angular/core/testing';
import { buttonByText } from '../../../testing/dom';
import { DeferRecipe } from './defer';

describe('DeferRecipe', () => {
  let fixture: ComponentFixture<DeferRecipe>;
  let host: HTMLElement;

  beforeEach(async () => {
    fixture = TestBed.createComponent(DeferRecipe);
    await fixture.whenStable();
    host = fixture.nativeElement as HTMLElement;
  });

  it('shows the placeholder instead of the heavy panel up front', () => {
    expect(host.querySelector('app-heavy-panel')).toBeNull();
    expect(host.textContent).toContain('Click to load');
  });

  it('loads the deferred component after the placeholder is activated', async () => {
    buttonByText(host, 'Click to load').click();

    let loaded = false;
    for (let attempt = 0; attempt < 80 && !loaded; attempt++) {
      await new Promise((resolve) => setTimeout(resolve, 25));
      await fixture.whenStable();
      loaded = !!host.querySelector('app-heavy-panel');
    }

    expect(loaded).toBe(true);
  });
});
