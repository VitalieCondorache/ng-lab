import { Highlight } from './highlight';
import { waitUntil } from '../testing/dom';

describe('Highlight', () => {
  it('escapes the code while the grammars are still loading', () => {
    const highlight = new Highlight();
    // Construction kicks off a dynamic import; synchronously the api is not ready yet.
    expect(highlight.render('<b>&</b>')).toBe('&lt;b&gt;&amp;&lt;/b&gt;');
  });

  it('flags itself ready and highlights once the grammars are registered', async () => {
    const highlight = new Highlight();
    await waitUntil(() => highlight.ready());

    const markup = highlight.render('const answer: number = 42;', 'typescript');

    expect(markup).toContain('<span');
    expect(markup).toContain('hljs-keyword');
  });
});
