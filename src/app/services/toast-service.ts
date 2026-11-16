import { Service, signal } from '@angular/core';

/** How long a toast stays visible before it slides out again. */
export const TOAST_DURATION_MS = 4000;
/** Must match the length of the slide-out animation in `toast.scss`. */
export const TOAST_LEAVE_MS = 300;

export type ToastType = 'success' | 'error';

export interface ToastMessage {
  type: ToastType;
  text: string;
  /** True while the toast slides out. */
  leaving: boolean;
}

/**
 * Shows one short message at a time. A new toast replaces the current one.
 * The `ToastComponent` renders `toast()`.
 */
@Service()
export class ToastService {
  private readonly _toast = signal<ToastMessage | null>(null);
  private leaveTimer: ReturnType<typeof setTimeout> | undefined;
  private removeTimer: ReturnType<typeof setTimeout> | undefined;

  readonly toast = this._toast.asReadonly();

  /**
   * Slides a toast in, keeps it for `TOAST_DURATION_MS` and slides it out again.
   * @param type Decides the look and how screen readers announce it.
   * @param text The message to show.
   */
  show(type: ToastType, text: string): void {
    this.clearTimers();
    this._toast.set({ type, text, leaving: false });
    this.leaveTimer = setTimeout(() => this.hide(), TOAST_DURATION_MS);
  }

  /** Starts the slide-out and removes the toast once it is gone. */
  hide(): void {
    this.clearTimers();
    this._toast.update((toast) => (toast ? { ...toast, leaving: true } : null));
    this.removeTimer = setTimeout(() => this._toast.set(null), TOAST_LEAVE_MS);
  }

  private clearTimers(): void {
    clearTimeout(this.leaveTimer);
    clearTimeout(this.removeTimer);
  }
}
