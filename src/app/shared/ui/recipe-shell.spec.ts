import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { text, texts } from '../../testing/dom';
import { RecipeShell } from './recipe-shell';

@Component({
  imports: [RecipeShell],
  template: `
    <app-recipe-shell title="A title" blurb="A blurb" [apis]="apis">
      <p class="projected">PROJECTED</p>
    </app-recipe-shell>
  `,
})
class Host {
  readonly apis = ['signal', 'computed'];
}

describe('RecipeShell', () => {
  async function render() {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('renders the heading, the blurb and one chip per api', async () => {
    const host = await render();
    expect(text(host.querySelector('.recipe__title'))).toBe('A title');
    expect(text(host.querySelector('.recipe__head p'))).toBe('A blurb');
    expect(texts(host.querySelectorAll('.recipe__apis .chip'))).toEqual(['signal', 'computed']);
  });

  it('projects the caller content below the header', async () => {
    const host = await render();
    expect(text(host.querySelector('.projected'))).toBe('PROJECTED');
  });
});
