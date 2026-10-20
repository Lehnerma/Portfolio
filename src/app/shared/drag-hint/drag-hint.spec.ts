import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DragHint } from './drag-hint';

type ViewportCallback = (entries: Partial<IntersectionObserverEntry>[]) => void;

describe('DragHint', () => {
  let fixture: ComponentFixture<DragHint>;
  let viewportCallback: ViewportCallback | undefined;

  const mockMatchMedia = (matching: string[]) => {
    window.matchMedia = (query: string) =>
      ({
        matches: matching.includes(query),
        addEventListener: () => {},
        removeEventListener: () => {},
      }) as unknown as MediaQueryList;
  };

  const create = async (matching: string[] = []) => {
    mockMatchMedia(matching);
    await TestBed.configureTestingModule({ imports: [DragHint] }).compileComponents();
    fixture = TestBed.createComponent(DragHint);
    await fixture.whenStable();
  };

  const enterViewport = async () => {
    viewportCallback?.([{ isIntersecting: true }]);
    await fixture.whenStable();
  };

  const word = () => fixture.nativeElement.querySelector('.drag-hint__word')?.textContent.trim();

  beforeEach(() => {
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(callback: ViewportCallback) {
          viewportCallback = callback;
        }
        observe() {}
        disconnect() {}
      },
    );
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    delete (window as Partial<Window>).matchMedia;
    viewportCallback = undefined;
  });

  it('renders nothing animated until it enters the viewport', async () => {
    await create();
    expect(fixture.nativeElement.querySelector('.drag-hint')).toBeNull();

    await enterViewport();
    expect(fixture.nativeElement.querySelector('.drag-hint__text').textContent).toContain('u can');
    expect(word()).toBe('hover');
  });

  it('uses the touch words on devices without hover', async () => {
    await create(['(hover: none)']);
    await enterViewport();
    expect(word()).toBe('touch');
  });

  it('flips to the next word after the interval', async () => {
    vi.useFakeTimers({ toFake: ['setInterval', 'clearInterval'] });
    await create();
    await enterViewport();

    vi.advanceTimersByTime(3000);
    await fixture.whenStable();
    expect(word()).toBe('drag');
  });

  it('shows all words statically with reduced motion', async () => {
    vi.useFakeTimers({ toFake: ['setInterval', 'clearInterval'] });
    await create(['(prefers-reduced-motion: reduce)']);
    await enterViewport();

    vi.advanceTimersByTime(6000);
    await fixture.whenStable();
    expect(word()).toBe('hover/drag');
  });
});
