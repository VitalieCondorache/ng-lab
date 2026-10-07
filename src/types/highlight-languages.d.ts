/*
 * highlight.js ships type definitions for its core API but not for the individual
 * grammars, which we load on demand. Map the wildcard subpath to the shared signature.
 */
declare module 'highlight.js/lib/languages/*' {
  import type { LanguageFn } from 'highlight.js';
  const language: LanguageFn;
  export default language;
}
