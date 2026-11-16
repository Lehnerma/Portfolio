/** One legal page: a title, an optional intro and a list of headed sections. */
export interface LegalPageTexts {
  title: string;
  intro?: string;
  sections: LegalSection[];
}

export interface LegalSection {
  heading: string;
  /** Each entry is rendered as its own paragraph. */
  paragraphs?: string[];
  /** Rendered as a bullet list below the paragraphs. */
  items?: string[];
}

/** Texts shared by all legal pages; part of the main translations. */
export interface LegalPageCommonTexts {
  backToHome: string;
}
