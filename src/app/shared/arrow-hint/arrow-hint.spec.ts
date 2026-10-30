import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArrowHint } from './arrow-hint';

describe('ArrowHint', () => {
  let fixture: ComponentFixture<ArrowHint>;
  let host: HTMLElement;
  let setIntersecting: (isIntersecting: boolean) => void;
  let setWidth: (width: number) => void;

  beforeEach(async () => {
    vi.useFakeTimers();
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(callback: (entries: Partial<IntersectionObserverEntry>[]) => void) {
          setIntersecting = (isIntersecting) => callback([{ isIntersecting }]);
        }
        observe(): void {}
        unobserve(): void {}
        disconnect(): void {}
      },
    );
    vi.stubGlobal(
      'ResizeObserver',
      class {
        constructor(
          callback: (entries: { contentRect: { width: number; height: number } }[]) => void,
        ) {
          setWidth = (width) => callback([{ contentRect: { width, height: 44 } }]);
        }
        observe(): void {
          setWidth(200);
        }
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

  it('adapts the path to the width of the host and adds waves when it gets wider', () => {
    setIntersecting(true);
    fixture.detectChanges();
    const svg = host.querySelector('svg');
    const waves = (): number =>
      (host.querySelector('path')?.getAttribute('d') ?? '').split('Q').length - 1;
    const narrow = waves();

    expect(svg?.getAttribute('viewBox')).toBe('0 0 200 44');

    setWidth(400);
    fixture.detectChanges();
    expect(host.querySelector('svg')?.getAttribute('viewBox')).toBe('0 0 400 44');
    expect(waves()).toBeGreaterThan(narrow);
  });
});
