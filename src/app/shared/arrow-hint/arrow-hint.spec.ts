import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArrowHint } from './arrow-hint';

describe('ArrowHint', () => {
  let fixture: ComponentFixture<ArrowHint>;
  let host: HTMLElement;
  let setIntersecting: (isIntersecting: boolean) => void;

  beforeEach(async () => {
    vi.useFakeTimers();
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(callback: (entries: Partial<IntersectionObserverEntry>[]) => void) {
          setIntersecting = (isIntersecting) => callback([{ isIntersecting }]);
        }
        observe(): void {}
        disconnect(): void {}
      },
    );
    await TestBed.configureTestingModule({ imports: [ArrowHint] }).compileComponents();
    fixture = TestBed.createComponent(ArrowHint);
    host = fixture.nativeElement;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('draws nothing until it enters the viewport', () => {
    expect(host.querySelector('path')).toBeNull();

    setIntersecting(true);
    fixture.detectChanges();
    expect(host.querySelector('path')).not.toBeNull();

    setIntersecting(false);
    fixture.detectChanges();
    expect(host.querySelector('path')).toBeNull();
  });

  it('redraws after 5 to 7 seconds while visible', () => {
    setIntersecting(true);
    fixture.detectChanges();
    const first = host.querySelector('path');

    vi.advanceTimersByTime(4900);
    fixture.detectChanges();
    expect(host.querySelector('path')).toBe(first);

    vi.advanceTimersByTime(2200);
    fixture.detectChanges();
    expect(host.querySelector('path')).not.toBe(first);
  });

  it('draws the given path and keeps the aspect ratio of the view box', () => {
    fixture.componentRef.setInput('path', 'M 0 0 L 10 10');
    fixture.componentRef.setInput('viewBox', '0 0 100 20');
    setIntersecting(true);
    fixture.detectChanges();

    expect(host.querySelector('path')?.getAttribute('d')).toBe('M 0 0 L 10 10');
    expect(host.style.aspectRatio).toBe('100 / 20');
  });
});
