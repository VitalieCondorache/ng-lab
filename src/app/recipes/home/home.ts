import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RECIPE_GROUPS, RECIPES } from '../../core/recipes';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <section class="hero">
      <span class="badge">Angular · standalone · zoneless</span>
      <h1>Play with modern Angular before you ship it.</h1>
      <p class="hero__lead">
        A small, hands-on reference for signals, functional patterns and the performance work that
        keeps an app fast. Every example runs right here and is ready to copy into your own project.
      </p>
      <div class="row">
        <a class="btn btn--primary" routerLink="/recipes/signals/counter">Start with signals</a>
        <a class="btn" routerLink="/recipes/patterns/defer">See deferrable views</a>
      </div>

      <dl class="stats">
        <div class="stats__item">
          <dt>{{ recipes.length }}</dt>
          <dd>interactive recipes</dd>
        </div>
        <div class="stats__item">
          <dt>zoneless</dt>
          <dd>change detection</dd>
        </div>
        <div class="stats__item">
          <dt>OnPush</dt>
          <dd>every component</dd>
        </div>
      </dl>
    </section>

    <section class="groups">
      @for (group of groupCards; track group.name) {
        <div class="groups__col">
          <h2 class="groups__title">{{ group.name }}</h2>
          <ul class="list">
            @for (recipe of group.items; track recipe.path) {
              <li>
                <a [routerLink]="'/recipes/' + recipe.path">{{ recipe.title }}</a>
                <span class="muted"> — {{ recipe.summary }}</span>
              </li>
            }
          </ul>
        </div>
      }
    </section>
  `,
  styles: `
    .hero {
      padding-bottom: 2rem;
      border-bottom: 1px solid var(--border);
    }

    .hero__lead {
      max-width: 46rem;
      margin: 0.85rem 0 1.25rem;
      font-size: 1.02rem;
      color: var(--text-muted);
    }

    .stats {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
      margin: 1.75rem 0 0;
    }

    .stats__item dt {
      font-family: var(--font-mono);
      font-size: 1.2rem;
      font-weight: 600;
    }

    .stats__item dd {
      margin: 0;
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-muted);
    }

    .groups {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
      gap: 1.5rem;
      margin-top: 2rem;
    }

    .groups__title {
      margin-bottom: 0.6rem;
      font-size: 0.95rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected readonly recipes = RECIPES;

  protected readonly groupCards = RECIPE_GROUPS.map((name) => ({
    name,
    items: RECIPES.filter((recipe) => recipe.group === name),
  }));
}
