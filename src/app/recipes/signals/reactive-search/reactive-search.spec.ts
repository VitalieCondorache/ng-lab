import { ComponentFixture, TestBed } from '@angular/core/testing';
import { texts } from '../../../testing/dom';
import { ReactiveSearch } from './reactive-search';

const settle = () => new Promise((resolve) => setTimeout(resolve, 700));

describe('ReactiveSearch', () => {
  let fixture: ComponentFixture<ReactiveSearch>;
  let host: HTMLElement;

  beforeEach(async () => {
    fixture = TestBed.createComponent(ReactiveSearch);
    await fixture.whenStable();
    host = fixture.nativeElement as HTMLElement;
  });

  async function search(term: string): Promise<void> {
    const input = host.querySelector('#search') as HTMLInputElement;
    input.value = term;
    input.dispatchEvent(new Event('input'));
    await settle();
    await fixture.whenStable();
  }

  it('returns the catalogue entries that match the debounced query', async () => {
    await search('signal');

    expect(texts(host.querySelectorAll('.list li'))).toContain('signal');
  });

  it('shows an empty state when nothing matches', async () => {
    await search('zzz');

    expect(host.querySelectorAll('.list li')).toHaveLength(0);
    expect(host.textContent).toContain('No matches yet');
  });
});
