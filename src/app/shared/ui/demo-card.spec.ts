import { Component, input } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { text } from '../../testing/dom';
import { DemoCard } from './demo-card';

@Component({
  imports: [DemoCard],
  template: `
    <app-demo-card [title]="title()" [about]="about()">
      <span stage>STAGE</span>
      <span class="tail">TAIL</span>
    </app-demo-card>
  `,
})
class Host {
  readonly title = input('Title');
  readonly about = input('');
}

describe('DemoCard', () => {
  async function setup(about = '') {
    const fixture = TestBed.createComponent(Host);
    fixture.componentRef.setInput('about', about);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('renders the title', async () => {
    const host = await setup();
    expect(text(host.querySelector('.demo__title'))).toBe('Title');
  });

  it('shows the description only when one is given', async () => {
    const withAbout = await setup('Some explanation');
    expect(text(withAbout.querySelector('.demo__about'))).toBe('Some explanation');

    const without = await setup();
    expect(without.querySelector('.demo__about')).toBeNull();
  });

  it('projects the stage and the trailing content', async () => {
    const host = await setup();
    expect(text(host.querySelector('.demo__stage'))).toBe('STAGE');
    expect(text(host.querySelector('.tail'))).toBe('TAIL');
  });
});
