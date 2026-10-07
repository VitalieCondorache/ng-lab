import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { CodeBlock } from '../../../shared/ui/code-block';
import { DemoCard } from '../../../shared/ui/demo-card';
import { RecipeShell } from '../../../shared/ui/recipe-shell';

type Plan = 'free' | 'pro';

@Component({
  selector: 'app-typed-forms',
  imports: [RecipeShell, DemoCard, CodeBlock, ReactiveFormsModule, JsonPipe],
  template: `
    <app-recipe-shell
      title="Typed reactive forms"
      blurb="Since Angular 14 a form is fully typed: value, errors and setValue all know your model. TypeScript now catches a typo in a control name before the app runs."
      [apis]="apis"
    >
      <app-demo-card
        title="Validation you can trust"
        about="This form is a plain FormGroup. Its value signal stays in sync and the submit button only enables once the model is valid."
      >
        <div stage class="stack">
          <form class="stack" [formGroup]="form" (ngSubmit)="submit()">
            <div class="field">
              <label for="name">Name</label>
              <input id="name" class="input" formControlName="name" autocomplete="name" />
              @if (form.controls.name.touched && form.controls.name.hasError('required')) {
                <span class="alert">Name is required.</span>
              }
              @if (form.controls.name.touched && form.controls.name.hasError('minlength')) {
                <span class="alert">Use at least 2 characters.</span>
              }
            </div>

            <div class="field">
              <label for="email">Email</label>
              <input id="email" class="input" formControlName="email" autocomplete="email" />
              @if (form.controls.email.touched && form.controls.email.invalid) {
                <span class="alert">Enter a valid email address.</span>
              }
            </div>

            <div class="field">
              <label for="plan">Plan</label>
              <select id="plan" class="input" formControlName="plan">
                <option value="free">Free</option>
                <option value="pro">Pro</option>
              </select>
            </div>

            <div class="row">
              <button type="submit" class="btn btn--primary" [disabled]="form.invalid">
                Submit
              </button>
              @if (submitted()) {
                <span class="badge">Submitted</span>
              }
            </div>
          </form>

          <div class="field">
            <span class="field-label">Typed value</span>
            <pre class="log">{{ value() | json }}</pre>
          </div>
        </div>

        <app-code-block [code]="snippet" />
      </app-demo-card>
    </app-recipe-shell>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypedForms {
  protected readonly apis = ['FormGroup', 'FormControl', 'Validators'];

  protected readonly form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    plan: new FormControl<Plan>('free', { nonNullable: true }),
  });

  // Bridging valueChanges into a signal keeps the preview reactive without extra plumbing.
  protected readonly value = toSignal(this.form.valueChanges, {
    initialValue: this.form.getRawValue(),
  });

  protected readonly submitted = signal(false);

  protected submit(): void {
    if (this.form.invalid) {
      return;
    }
    this.submitted.set(true);
  }

  protected readonly snippet = `
readonly form = new FormGroup({
  name: new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(2)],
  }),
  email: new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email],
  }),
  plan: new FormControl<'free' | 'pro'>('free', { nonNullable: true }),
});

// <input formControlName="name" />  — a typo here fails to compile
`.trim();
}
