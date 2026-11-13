import { Component, computed, inject, input } from '@angular/core';
import { PROJECTS } from '../../data/projects.data';
import { LanguageService } from '../../services/language-service';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { HeadNav } from '../../shared/head-nav/head-nav';
import { UnderlineTitle } from '../../shared/underline-title/underline-title';
import { SecondaryBtn } from '../../shared/secondary-btn/secondary-btn';
import { ArrowBtn } from '../../components/arrow-btn/arrow-btn';

@Component({
  imports: [RouterLink, TitleCasePipe, HeadNav, UnderlineTitle, SecondaryBtn, ArrowBtn],
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
