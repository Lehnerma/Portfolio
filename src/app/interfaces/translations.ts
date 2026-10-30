/** Every UI text of the portfolio, grouped by section. `en.ts` and `de.ts` must both satisfy it. */
export interface Translations {
  meta: MetaTexts;
  nav: NavTexts;
  hero: HeroTexts;
  about: AboutTexts;
  skills: SkillsTexts;
  sticker: StickerTexts;
  projects: ProjectsTexts;
  projectWindow: ProjectWindowTexts;
  dragHint: DragHintTexts;
  comments: CommentsTexts;
  contact: ContactTexts;
  form: FormTexts;
  social: SocialTexts;
  footer: FooterTexts;
}

export interface MetaTexts {
  title: string;
}

export interface NavTexts {
  about: string;
  skills: string;
  projects: string;
  contact: string;
  openMenu: string;
  closeMenu: string;
  /** Accessible name of the language switcher group. */
  language: string;
}

export interface HeroTexts {
  greeting: string;
  greetingHover: string;
  titleTop: string;
  titleBottom: string;
  cta: string;
  photoCaption: string;
}

export interface AboutTexts {
  subtitle: string;
  title: string;
  text: string;
  cta: string;
  preferences: AboutPreferencesTexts;
}

export interface AboutPreferencesTexts {
  location: string;
  commute: string;
  remote: string;
}

export interface SkillsTexts {
  subtitle: string;
  title: string;
  text: string;
}

export interface StickerTexts {
  currentlyLearning: string;
  peelMeFirstLine: string;
  peelMeSecondLine: string;
  peelAriaLabel: string;
  /** Spoken value of the peel slider, e.g. "50 percent peeled". */
  peeledValue: (percent: number) => string;
}

export interface ProjectsTexts {
  subtitle: string;
  title: string;
}

export interface ProjectWindowTexts {
  closeWindow: string;
  minimizeWindow: string;
  restoreWindow: string;
  openDetails: string;
  showDescription: string;
  detailsButton: string;
}

export interface DragHintTexts {
  prefix: string;
  suffix: string;
  pointerWords: readonly string[];
  touchWords: readonly string[];
  /** Static text for screen readers; the animated part is hidden from them. */
  label: string;
}

export interface CommentsTexts {
  subtitle: string;
  title: string;
  linkedinLogoAlt: string;
}

export interface ContactTexts {
  subtitle: string;
  title: string;
  message: string;
  logoAlt: string;
}

export interface FormTexts {
  name: FormFieldTexts;
  email: FormEmailTexts;
  message: FormMessageTexts;
  privacy: FormPrivacyTexts;
  submit: string;
}

export interface FormFieldTexts {
  label: string;
  placeholder: string;
  required: string;
}

export interface FormEmailTexts extends FormFieldTexts {
  invalid: string;
}

export interface FormMessageTexts extends FormFieldTexts {
  tooShort: string;
}

export interface FormPrivacyTexts {
  /** Text before the privacy policy link. */
  before: string;
  linkText: string;
  required: string;
}

/** Accessible names of the icon-only social links. */
export interface SocialTexts {
  github: string;
  linkedin: string;
  email: string;
}

export interface FooterTexts {
  legalNotice: string;
  github: string;
  linkedin: string;
  email: string;
}
