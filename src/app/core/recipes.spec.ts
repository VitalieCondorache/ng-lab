import { routes } from '../app.routes';
import { RECIPE_GROUPS, RECIPES } from './recipes';

describe('recipe registry', () => {
  it('has a unique path for every recipe', () => {
    const paths = RECIPES.map((recipe) => recipe.path);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it('only uses groups that are declared', () => {
    for (const recipe of RECIPES) {
      expect(RECIPE_GROUPS).toContain(recipe.group);
    }
  });

  it('actually fills every group', () => {
    const used = new Set(RECIPES.map((recipe) => recipe.group));
    expect(used.size).toBe(RECIPE_GROUPS.length);
  });

  it('has a lazy route for every recipe', () => {
    const registered = new Set(routes.map((route) => route.path));
    for (const recipe of RECIPES) {
      expect(registered.has(`recipes/${recipe.path}`)).toBe(true);
    }
  });
});
