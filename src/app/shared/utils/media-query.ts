import { DOCUMENT } from '@angular/common';
import { DestroyRef, inject, Signal, signal } from '@angular/core';

/**
 * Exposes a CSS media query as a signal that follows its `change` events.
 * Must be called in an injection context; without `matchMedia` (e.g. SSR) it stays `false`.
 * @param query The media query to watch, e.g. `(min-width: 768px)`.
 * @returns A read-only signal holding whether the query currently matches.
 */
export function mediaQuery(query: string): Signal<boolean> {
  const list = inject(DOCUMENT).defaultView?.matchMedia?.(query);
  const matches = signal(list?.matches ?? false);
  if (!list) return matches.asReadonly();

  const onChange = (event: MediaQueryListEvent): void => matches.set(event.matches);
  list.addEventListener('change', onChange);
  inject(DestroyRef).onDestroy(() => list.removeEventListener('change', onChange));
  return matches.asReadonly();
}
