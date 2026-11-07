import { Component, computed, inject, signal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { UnderlineTitle } from '../../shared/underline-title/underline-title';
import { DragHint } from '../../shared/drag-hint/drag-hint';
import { ProjectWindow } from '../../components/project-window/project-window';
import { PROJECTS } from '../../data/projects.data';
import { mediaQuery } from '../../shared/utils/media-query';
import { LanguageService } from '../../services/language-service';
import { ProjectId } from '../../interfaces/translations';

@Component({
  imports: [UnderlineTitle, DragHint, ProjectWindow, TitleCasePipe],
  selector: 'app-projects',
  styleUrl: './projects.scss',
  templateUrl: './projects.html',
})
export class Projects {
  /** Windows are only draggable from `md` (768px) on, so the drag hint is only shown there. */
  private readonly isMdUp = mediaQuery('(min-width: 768px)');

  /** Set once any project window has been dragged; hides the drag hint. */
  protected readonly hasDragged = signal(false);
  protected readonly windowStack = signal(PROJECTS.map((project) => project.id));
  protected readonly activeId = signal<ProjectId>('sharkie');

  protected readonly zIndexes = computed(
    () => new Map(this.windowStack().map((id, index) => [id, index + 1])),
  );
  protected readonly showDragHint = computed(() => this.isMdUp() && !this.hasDragged());

  private readonly texts = inject(LanguageService).texts;

  protected readonly projects = computed(() =>
    PROJECTS.map((project) => ({
      ...project,
      ...this.texts().projects.items[project.id],
    })),
  );

  /**
   * Brings the specified project window to the front and sets it as active.
   * Updates the window order unless the window is already at the front.
   * @param id ID of the project window to bring to the front, like ProjectId interface.
   */
  protected bringToFront(id: ProjectId): void {
    this.activeId.set(id);
    this.windowStack.update((stack) =>
      stack.at(-1) === id ? stack : [...stack.filter((entry) => entry !== id), id],
    );
  }
}
