import { useEffect, type RefObject } from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

/**
 * Traps keyboard focus inside a container element while active.
 * On activation: saves current focus, moves focus into the container.
 * On deactivation: restores focus to the previously focused element.
 * Tab / Shift+Tab cycle within the container.
 */
export function useFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  active: boolean,
) {
  useEffect(() => {
    if (!active) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    const container = containerRef.current;
    if (!container) return;

    const focusFirst = () => {
      const els = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (els.length > 0) {
        els[0].focus();
      } else {
        container.focus();
      }
    };

    // Delay to allow DOM to paint
    const timer = requestAnimationFrame(focusFirst);

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const els = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    if (els.length === 0) return;
      const first = els[0];
    const last = els[els.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first || !container.contains(document.activeElement)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last || !container.contains(document.activeElement)) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeydown);

    return () => {
      cancelAnimationFrame(timer);
      document.removeEventListener('keydown', handleKeydown);
      previouslyFocused?.focus();
    };
  }, [active, containerRef]);
}
