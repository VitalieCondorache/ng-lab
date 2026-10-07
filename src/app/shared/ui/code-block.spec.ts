import { TestBed } from '@angular/core/testing';
import { text } from '../../testing/dom';
import { CodeBlock } from './code-block';

describe('CodeBlock', () => {
  let written: string[];

  beforeEach(() => {
    written = [];
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: (value: string) => {
          written.push(value);
          return Promise.resolve();
        },
      },
    });
  });

  it('shows the given label and the raw code', async () => {
    const fixture = TestBed.createComponent(CodeBlock);
    fixture.componentRef.setInput('code', 'const a = 1;');
    fixture.componentRef.setInput('label', 'example.ts');
    await fixture.whenStable();

    const host = fixture.nativeElement as HTMLElement;
    expect(text(host.querySelector('.code__label'))).toBe('example.ts');
    expect(text(host.querySelector('pre code'))).toContain('const a = 1;');
  });

  it('falls back to the language for the label when none is provided', async () => {
    const fixture = TestBed.createComponent(CodeBlock);
    fixture.componentRef.setInput('code', 'echo hi');
    fixture.componentRef.setInput('language', 'bash');
    await fixture.whenStable();

    const host = fixture.nativeElement as HTMLElement;
    expect(text(host.querySelector('.code__label'))).toBe('bash');
  });

  it('copies the code to the clipboard and confirms it', async () => {
    const fixture = TestBed.createComponent(CodeBlock);
    fixture.componentRef.setInput('code', 'npm test');
    await fixture.whenStable();

    const host = fixture.nativeElement as HTMLElement;
    const button = host.querySelector('.code__copy') as HTMLButtonElement;
    expect(text(button)).toBe('Copy');

    button.click();
    await fixture.whenStable();

    expect(written).toEqual(['npm test']);
    expect(text(button)).toBe('Copied');
  });
});
