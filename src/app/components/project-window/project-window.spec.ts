import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ProjectWindow } from './project-window';

type CompactChangeListener = (event: MediaQueryListEvent) => void;

describe('ProjectWindow', () => {
  let fixture: ComponentFixture<ProjectWindow>;
  let compactListener: CompactChangeListener | undefined;

  const mockMatchMedia = (isCompact: boolean) => {
    window.matchMedia = () =>
      ({
        matches: isCompact,
        addEventListener: (_: string, listener: CompactChangeListener) => {
          compactListener = listener;
        },
        removeEventListener: () => {},
      }) as unknown as MediaQueryList;
  };

  const create = async (isCompact: boolean) => {
    mockMatchMedia(isCompact);
    await TestBed.configureTestingModule({
      imports: [ProjectWindow],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(ProjectWindow);
    await fixture.whenStable();
  };

  const query = <T extends Element>(selector: string) =>
    fixture.nativeElement.querySelector(selector) as T | null;

  afterEach(() => {
    delete (window as Partial<Window>).matchMedia;
    compactListener = undefined;
  });

  it('should create', async () => {
    await create(false);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('toggles the flipped state on tap', async () => {
    await create(false);

    query<HTMLElement>('.project-window__flip')?.click();
    await fixture.whenStable();
    expect(query('.project-window--flipped')).not.toBeNull();

    query<HTMLElement>('.project-window__flip')?.click();
    await fixture.whenStable();
    expect(query('.project-window--flipped')).toBeNull();
  });

  it('does not toggle when the details button is clicked', async () => {
    await create(false);

    query<HTMLElement>('.project-window__desc app-secondary-btn button')?.click();
    await fixture.whenStable();
    expect(query('.project-window--flipped')).toBeNull();
  });

  it('renders the caption below the window without flip button when compact', async () => {
    await create(true);

    expect(query('.project-window__below app-secondary-btn')).not.toBeNull();
    expect(query('.project-window__desc')).toBeNull();
    expect(query('.project-window__flip')).toBeNull();
  });

  it('resets the flipped state when switching to compact', async () => {
    await create(false);
    query<HTMLElement>('.project-window__flip')?.click();
    await fixture.whenStable();

    compactListener?.({ matches: true } as MediaQueryListEvent);
    await fixture.whenStable();

    expect(query('.project-window--flipped')).toBeNull();
    expect(query('.project-window__below')).not.toBeNull();
  });

  it('emits dragStarted on the first move after grabbing, not on a plain click', async () => {
    await create(false);
    const dragStarted = vi.fn();
    fixture.componentInstance.dragStarted.subscribe(dragStarted);
    const titlebar = query<HTMLElement>('.project-window__titlebar')!;
    titlebar.setPointerCapture = () => {};

    titlebar.dispatchEvent(new PointerEvent('pointerdown', { clientX: 0, clientY: 0 }));
    titlebar.dispatchEvent(new PointerEvent('pointerup'));
    expect(dragStarted).not.toHaveBeenCalled();

    titlebar.dispatchEvent(new PointerEvent('pointerdown', { clientX: 0, clientY: 0 }));
    titlebar.dispatchEvent(new PointerEvent('pointermove', { clientX: 10, clientY: 10 }));
    titlebar.dispatchEvent(new PointerEvent('pointermove', { clientX: 20, clientY: 20 }));
    expect(dragStarted).toHaveBeenCalledTimes(1);
  });
});
