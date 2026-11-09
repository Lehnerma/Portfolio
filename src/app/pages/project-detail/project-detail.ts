import { Component, computed, inject, input } from '@angular/core';
import { PROJECTS } from '../../data/projects.data';
import { LanguageService } from '../../services/language-service';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

@Component({
  imports: [RouterLink, TitleCasePipe],
  selector: 'app-project-detail',
  styleUrl: './project-detail.scss',
  templateUrl: './project-detail.html',
})
export class ProjectDetail {
  readonly id = input.required<string>();
  private readonly texts = inject(LanguageService).texts;

  protected readonly project = computed(() => {
    const data = PROJECTS.find((pro) => pro.id === this.id());
    if (!data) return;
    const text = this.texts().projects.items[data.id];
    const details = this.texts().projectDetail;
    return { ...data, ...text, ...details };
  });
}
