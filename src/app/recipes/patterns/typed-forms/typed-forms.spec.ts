import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TypedForms } from './typed-forms';

describe('TypedForms', () => {
  let fixture: ComponentFixture<TypedForms>;
  let host: HTMLElement;

  const submitButton = () => host.querySelector('button[type="submit"]') as HTMLButtonElement;

  function type(selector: string, value: string): void {
    const input = host.querySelector(selector) as HTMLInputElement;
    input.value = value;
    input.dispatchEvent(new Event('input'));
  }

  beforeEach(async () => {
    fixture = TestBed.createComponent(TypedForms);
    await fixture.whenStable();
    host = fixture.nativeElement as HTMLElement;
  });

  it('keeps submit disabled while the form is invalid', () => {
    expect(submitButton().disabled).toBe(true);
  });

  it('enables submit once the required fields are valid', async () => {
    type('#name', 'Vlad');
    type('#email', 'vlad@example.com');
    await fixture.whenStable();

    expect(submitButton().disabled).toBe(false);
  });

  it('rejects an invalid email address', async () => {
    type('#name', 'Vlad');
    type('#email', 'not-an-email');
    await fixture.whenStable();

    expect(submitButton().disabled).toBe(true);
  });

  it('flags a submitted form', async () => {
    type('#name', 'Vlad');
    type('#email', 'vlad@example.com');
    await fixture.whenStable();

    submitButton().click();
    await fixture.whenStable();

    expect(host.textContent).toContain('Submitted');
  });
});
