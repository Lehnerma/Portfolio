/** All texts of the legal pages. `legal-de.ts` and `legal-en.ts` must both satisfy it. */
export interface LegalTranslations {
  common: LegalCommonTexts;
  imprint: LegalPageTexts;
  privacy: LegalPageTexts;
  legalNotice: LegalPageTexts;
}

export interface LegalCommonTexts {
  backToHome: string;
}

/** One legal page: a title, an optional intro and a list of headed sections. */
export interface LegalPageTexts {
  title: string;
  intro?: string;
  sections: LegalSection[];
}

export interface LegalSection {
  heading: string;
  /** Each entry is rendered as its own paragraph. */
  paragraphs: string[];
}
