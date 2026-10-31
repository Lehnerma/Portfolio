import { Component, computed, inject } from '@angular/core';
import { LanguageService } from '../../services/language-service';
import { PaperElementsInterface } from '../../interfaces/ripped-paper-interface';
import { RIPPED_PAPERS_DATA } from '../../data/ripped-paper.data';

@Component({
  imports: [],
  selector: 'app-ripped-paper',
  styleUrl: './ripped-paper.scss',
  templateUrl: './ripped-paper.html',
})
export class RippedPaper {
  private readonly texts = inject(LanguageService).texts;

  readonly rippedPapers = computed<PaperElementsInterface[]>(() =>
    RIPPED_PAPERS_DATA.map((item) => {
      const label = this.texts().about.preferences[item.labelKey];
      return {
        labelKey: label,
        color: item.color,
        mobile: item.mobile,
        desktop: item.desktop,
        icon: item.icon,
      };
    }),
  );
}
