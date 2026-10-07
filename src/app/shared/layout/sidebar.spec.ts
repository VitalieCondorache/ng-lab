import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { texts } from '../../testing/dom';
import { Sidebar } from './sidebar';

describe('Sidebar', () => {
  let fixture: ComponentFixture<Sidebar>;
  let host: HTMLElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    fixture = TestBed.createComponent(Sidebar);
    await fixture.whenStable();
    host = fixture.nativeElement as HTMLElement;
  });

  async function filter(term: string): Promise<void> {
    const input = host.querySelector('#recipe-filter') as HTMLInputElement;
    input.value = term;
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();
  }

  it('lists every recipe grouped by section', () => {
    expect(texts(host.querySelectorAll('.side__group-title'))).toEqual([
      'Signals & Reactivity',
      'Modern Patterns',
      'Performance Lab',
    ]);
    expect(host.querySelectorAll('.side__link').length).toBeGreaterThanOrEqual(10);
  });

  it('narrows the list down as you type', async () => {
    await filter('defer');

    const titles = texts(host.querySelectorAll('.side__link-title'));
    expect(titles).toHaveLength(1);
    expect(titles[0]).toContain('Deferrable');
  });

  it('shows an empty message when nothing matches', async () => {
    await filter('zzzzzz');

    expect(host.querySelector('.side__empty')).toBeTruthy();
    expect(host.querySelectorAll('.side__link').length).toBe(0);
  });
});
