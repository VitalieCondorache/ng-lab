import { ComponentFixture, TestBed } from '@angular/core/testing';
import { buttonByText, text } from '../../../testing/dom';
import { ControlFlow } from './control-flow';

describe('ControlFlow', () => {
  let fixture: ComponentFixture<ControlFlow>;
  let host: HTMLElement;

  const rows = () => host.querySelectorAll('.list li');
  const summary = () => text(host.querySelector('.demo__stage p.muted'));

  beforeEach(async () => {
    fixture = TestBed.createComponent(ControlFlow);
    await fixture.whenStable();
    host = fixture.nativeElement as HTMLElement;
  });

  it('renders the seeded tasks and the done summary', () => {
    expect(rows()).toHaveLength(3);
    expect(summary()).toContain('1 task(s) done.');
  });

  it('adds a task', async () => {
    buttonByText(host, 'Add task').click();
    await fixture.whenStable();
    expect(rows()).toHaveLength(4);
  });

  it('removes the done tasks', async () => {
    buttonByText(host, 'Clear done').click();
    await fixture.whenStable();
    expect(rows()).toHaveLength(2);
  });

  it('advances a task through its statuses', async () => {
    // The first seeded task starts as done; advancing it takes it back to todo,
    // which clears the "done" summary.
    buttonByText(rows()[0], 'Advance').click();
    await fixture.whenStable();

    expect(host.querySelector('.demo__stage p.muted')).toBeNull();
  });
});
