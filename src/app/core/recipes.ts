export type RecipeGroup = 'Signals & Reactivity' | 'Modern Patterns' | 'Performance Lab';

export interface Recipe {
  /** Route under /recipes, also the sidebar key. */
  path: string;
  title: string;
  /** One-liner shown in the sidebar and as the page subtitle. */
  summary: string;
  group: RecipeGroup;
  /** APIs the recipe focuses on, shown as chips on the page. */
  apis: readonly string[];
}

export const RECIPE_GROUPS: readonly RecipeGroup[] = [
  'Signals & Reactivity',
  'Modern Patterns',
  'Performance Lab',
];

export const RECIPES: readonly Recipe[] = [
  {
    path: 'signals/counter',
    title: 'signal · computed · effect',
    summary: 'Keep state minimal and derive the rest.',
    group: 'Signals & Reactivity',
    apis: ['signal', 'computed', 'effect'],
  },
  {
    path: 'signals/reactive-search',
    title: 'RxJS interop',
    summary: 'Turn a debounced stream into a signal.',
    group: 'Signals & Reactivity',
    apis: ['toSignal', 'debounceTime', 'switchMap'],
  },
  {
    path: 'signals/linked-selection',
    title: 'linkedSignal',
    summary: 'Writable state that resets when its source changes.',
    group: 'Signals & Reactivity',
    apis: ['linkedSignal'],
  },
  {
    path: 'signals/async-resource',
    title: 'resource',
    summary: 'Async state with loading and error, built in.',
    group: 'Signals & Reactivity',
    apis: ['resource', 'signal'],
  },
  {
    path: 'signals/signal-io',
    title: 'input · model · output',
    summary: 'Component inputs and outputs as signals.',
    group: 'Signals & Reactivity',
    apis: ['input', 'model', 'output'],
  },
  {
    path: 'patterns/control-flow',
    title: 'Control flow',
    summary: '@if, @for and @switch with a real track function.',
    group: 'Modern Patterns',
    apis: ['@if', '@for', 'track'],
  },
  {
    path: 'patterns/defer',
    title: 'Deferrable views',
    summary: 'Load a heavy block only when it is needed.',
    group: 'Modern Patterns',
    apis: ['@defer', '@placeholder', '@loading', '@error'],
  },
  {
    path: 'patterns/typed-forms',
    title: 'Typed reactive forms',
    summary: 'A small form that stays type-safe end to end.',
    group: 'Modern Patterns',
    apis: ['FormGroup', 'FormControl', 'Validators'],
  },
  {
    path: 'performance/change-detection',
    title: 'OnPush vs Default',
    summary: 'See how often each strategy re-renders.',
    group: 'Performance Lab',
    apis: ['ChangeDetectionStrategy', 'OnPush'],
  },
  {
    path: 'performance/dom-reuse',
    title: 'track in @for',
    summary: 'Watch the DOM get reused instead of rebuilt.',
    group: 'Performance Lab',
    apis: ['@for', 'track'],
  },
];
