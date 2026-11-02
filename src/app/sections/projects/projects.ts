import { Component, computed, inject, signal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { UnderlineTitle } from '../../shared/underline-title/underline-title';
import { DragHint } from '../../shared/drag-hint/drag-hint';
import { ProjectWindow } from '../../components/project-window/project-window';
import { PROJECTS } from '../../data/projects.data';
import { mediaQuery } from '../../shared/utils/media-query';
import { LanguageService } from '../../services/language-service';

@Component({
  imports: [UnderlineTitle, DragHint, ProjectWindow, TitleCasePipe],
  selector: 'app-projects',
  styleUrl: './projects.scss',
  templateUrl: './projects.html',
})
export class Projects {
  /** Windows are only draggable from `md` (768px) on, so the drag hint is only shown there. */
  private readonly isMdUp = mediaQuery('(min-width: 768px)');
  /** Set once any project window has been dragged; hides the drag hint for good. */
  protected readonly hasDragged = signal(false);
  protected readonly showDragHint = computed(() => this.isMdUp() && !this.hasDragged());

  private readonly texts = inject(LanguageService).texts;
  // protected readonly projects = PROJECTS;

  protected readonly projects = computed(() =>
    PROJECTS.map((project) => ({
      ...project,
      ...this.texts().projects.items[project.id],
    })),
  );
}
