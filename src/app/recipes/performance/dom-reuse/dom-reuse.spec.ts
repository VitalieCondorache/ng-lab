import { ComponentFixture, TestBed } from '@angular/core/testing';
import { buttonByText, text } from '../../../testing/dom';
import { DomReuse } from './dom-reuse';

describe('DomReuse', () => {
  let fixture: ComponentFixture<DomReuse>;
  let host: HTMLElement;

  const sections = () => Array.from(host.querySelectorAll('section'));
  const nodeIds = (section: Element) =>
    Array.from(section.querySelectorAll('app-track-row .mono')).map((el) => text(el));

  beforeEach(async () => {
    fixture = TestBed.createComponent(DomReuse);
    await fixture.whenStable();
    host = fixture.nativeElement as HTMLElement;
  });

  it('renders the same three items in both lists', () => {
    expect(nodeIds(sections()[0])).toHaveLength(3);
    expect(nodeIds(sections()[1])).toHaveLength(3);
  });

  it('keeps node identity with track by id but reuses index-tracked nodes', async () => {
    const leftBefore = nodeIds(sections()[0]);
    const rightBefore = nodeIds(sections()[1]);

    buttonByText(host, 'Add at top').click();
    await fixture.whenStable();

    const leftAfter = nodeIds(sections()[0]);
    const rightAfter = nodeIds(sections()[1]);

    // track item.id: a brand new node for the new item, the rest move down untouched.
    expect(leftAfter[0]).not.toBe(leftBefore[0]);
    expect(leftAfter.slice(1)).toEqual(leftBefore);

    // track $index: the node at position 0 is reused, only its content changes.
    expect(rightAfter[0]).toBe(rightBefore[0]);
    expect(rightAfter).toHaveLength(4);
  });
});
