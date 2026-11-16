import { TestBed } from '@angular/core/testing';
import { TOAST_DURATION_MS, TOAST_LEAVE_MS, ToastService } from './toast-service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    vi.useFakeTimers();
    service = TestBed.inject(ToastService);
  });

  afterEach(() => vi.useRealTimers());

  it('shows a toast, slides it out after the duration and then removes it', () => {
    service.show('success', 'Hello');
    expect(service.toast()).toEqual({ type: 'success', text: 'Hello', leaving: false });

    vi.advanceTimersByTime(TOAST_DURATION_MS);
    expect(service.toast()?.leaving).toBe(true);

    vi.advanceTimersByTime(TOAST_LEAVE_MS);
    expect(service.toast()).toBeNull();
  });

  it('replaces the current toast and restarts the timer', () => {
    service.show('success', 'First');
    vi.advanceTimersByTime(TOAST_DURATION_MS - 100);
    service.show('error', 'Second');
    vi.advanceTimersByTime(200);

    expect(service.toast()).toEqual({ type: 'error', text: 'Second', leaving: false });
  });
});
