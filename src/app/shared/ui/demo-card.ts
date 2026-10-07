import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-demo-card',
  templateUrl: './demo-card.html',
  styleUrl: './demo-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoCard {
  readonly title = input.required<string>();
  readonly about = input('');
}
