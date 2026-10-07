import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { RECIPE_GROUPS, RECIPES, type Recipe, type RecipeGroup } from '../../core/recipes';

interface Section {
  group: RecipeGroup;
  items: readonly Recipe[];
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {
  protected readonly query = signal('');

  protected readonly sections = computed<Section[]>(() => {
    const term = this.query().trim().toLowerCase();
    const matches = term ? RECIPES.filter((recipe) => haystack(recipe).includes(term)) : RECIPES;

    return RECIPE_GROUPS.map((group) => ({
      group,
      items: matches.filter((recipe) => recipe.group === group),
    })).filter((section) => section.items.length > 0);
  });

  protected onFilter(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
  }
}

function haystack(recipe: Recipe): string {
  return `${recipe.title} ${recipe.summary} ${recipe.apis.join(' ')}`.toLowerCase();
}
