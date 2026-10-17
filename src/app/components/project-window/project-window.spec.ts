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
});
