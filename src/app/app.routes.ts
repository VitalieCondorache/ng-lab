import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Angular Lab — signals, patterns & performance',
    loadComponent: () => import('./recipes/home/home').then((m) => m.Home),
  },
  {
    path: 'recipes/signals/counter',
    title: 'signal · computed · effect — Angular Lab',
    loadComponent: () => import('./recipes/signals/counter/counter').then((m) => m.Counter),
  },
  {
    path: 'recipes/signals/reactive-search',
    title: 'RxJS interop — Angular Lab',
    loadComponent: () =>
      import('./recipes/signals/reactive-search/reactive-search').then((m) => m.ReactiveSearch),
  },
  {
    path: 'recipes/signals/linked-selection',
    title: 'linkedSignal — Angular Lab',
    loadComponent: () =>
      import('./recipes/signals/linked-selection/linked-selection').then((m) => m.LinkedSelection),
  },
  {
    path: 'recipes/signals/async-resource',
    title: 'resource — Angular Lab',
    loadComponent: () =>
      import('./recipes/signals/async-resource/async-resource').then((m) => m.AsyncResource),
  },
  {
    path: 'recipes/signals/signal-io',
    title: 'input · model · output — Angular Lab',
    loadComponent: () => import('./recipes/signals/signal-io/signal-io').then((m) => m.SignalIo),
  },
  {
    path: 'recipes/patterns/control-flow',
    title: 'Control flow — Angular Lab',
    loadComponent: () =>
      import('./recipes/patterns/control-flow/control-flow').then((m) => m.ControlFlow),
  },
  {
    path: 'recipes/patterns/defer',
    title: 'Deferrable views — Angular Lab',
    loadComponent: () => import('./recipes/patterns/defer/defer').then((m) => m.DeferRecipe),
  },
  {
    path: 'recipes/patterns/typed-forms',
    title: 'Typed reactive forms — Angular Lab',
    loadComponent: () =>
      import('./recipes/patterns/typed-forms/typed-forms').then((m) => m.TypedForms),
  },
  {
    path: 'recipes/performance/change-detection',
    title: 'OnPush vs Default — Angular Lab',
    loadComponent: () =>
      import('./recipes/performance/change-detection/change-detection').then(
        (m) => m.ChangeDetection,
      ),
  },
  {
    path: 'recipes/performance/dom-reuse',
    title: 'track in @for — Angular Lab',
    loadComponent: () =>
      import('./recipes/performance/dom-reuse/dom-reuse').then((m) => m.DomReuse),
  },
  { path: '**', redirectTo: '' },
];
