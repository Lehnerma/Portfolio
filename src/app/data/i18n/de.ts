import { Translations } from '../../interfaces/translations';

export const DE_TRANSLATIONS: Translations = {
  meta: {
    title: 'Portfolio',
  },
  nav: {
    about: 'Über mich',
    skills: 'Skills',
    projects: 'Projekte',
    contact: 'Kontakt',
    openMenu: 'Menü öffnen',
    closeMenu: 'Menü schließen',
    language: 'Sprache',
  },
  hero: {
    greeting: 'Hello World',
    greetingHover: 'Ich bin Maximilian Lehner',
    titleTop: 'Frontend',
    titleBottom: 'DEVELOPER',
    cta: 'Kontakt aufnehmen',
    photoCaption: 'Max',
  },
  about: {
    subtitle: 'WER IST MAX',
    title: 'Über mich',
    text: 'Mit meinem Quereinstieg in die Entwicklung habe ich meine Leidenschaft fürs Frontend entdeckt: Ich löse Alltagsprobleme gern selbst und baue Dinge genau so, wie ich sie brauche, zum Beispiel meine Smart-Home-Automatisierungen. Mein Stack: Angular und Webentwicklung (HTML, JS, SCSS). Inspiration finde ich in Blogs, Podcasts und Community-Foren, und auf Codewars fordere ich mich selbst heraus. Sauberer Code ist mir wichtig: lesbar und wiederverwendbar.',
    cta: 'Lass uns reden',
    preferences: {
      location: 'Wohnhaft in Grafenegg',
      commute: 'Flexibel bei längerem Arbeitsweg',
      remote: 'Offen für Remote-Arbeit',
    },
  },
  skills: {
    subtitle: 'MEIN STACK',
    title: 'Skill-Set',
    text: 'Ich arbeite mit HTML, CSS/SASS, JavaScript, TypeScript und Angular sowie mit Supabase und Firebase für Backend-Services. Durch meinen Quereinstieg lerne ich schnell und bleibe offen für neue Technologien.',
  },
  sticker: {
    currentlyLearning: 'Lerne gerade:',
    peelMeFirstLine: 'Bitte',
    peelMeSecondLine: 'abziehen',
    peelAriaLabel: 'Sticker abziehen',
    peeledValue: (percent) => `${percent} Prozent abgezogen`,
  },
  projects: {
    subtitle: 'MEIN HANDWERK',
    title: 'Projekte',
  },
  projectWindow: {
    closeWindow: 'Fenster schließen',
    minimizeWindow: 'Fenster minimieren',
    restoreWindow: 'Fenster wiederherstellen',
    openDetails: 'Projektdetails öffnen',
    showDescription: 'Projektbeschreibung anzeigen',
    detailsButton: 'Details',
  },
  dragHint: {
    prefix: 'Du kannst uns',
    suffix: '',
    pointerWords: ['anstupsen', 'ziehen'],
    touchWords: ['antippen', 'ziehen'],
    label: 'Du kannst die Projektfenster verschieben',
  },
  comments: {
    subtitle: 'IN IHREN WORTEN',
    title: 'Stimmen aus dem Team',
    linkedinLogoAlt: 'LinkedIn-Logo',
  },
  contact: {
    subtitle: 'KONTAKT',
    title: 'Bereit für die Zusammenarbeit?',
    message:
      'Melde dich gern bei mir und erzähl mir, welche Rolle du im Kopf hast. Ich bin überzeugt, dass meine Expertise und mein Antrieb, mich ständig weiterzuentwickeln, einen echten Beitrag zu deinem Team leisten. Meine Leidenschaft ist CSS: Ich gebe jedem Projekt seinen eigenen, unverwechselbaren Look, damit es einzigartig wirkt und nicht wie eine von vielen Template-Seiten. Durch meinen Quereinstieg gebe ich extra Gas und zeige bei jeder neuen Herausforderung Entschlossenheit und Willenskraft. Ein neues Projekt mitzugestalten begeistert mich.',
    logoAlt: 'Logo',
  },
  form: {
    name: {
      label: 'Wie heißt du?',
      placeholder: 'Hier steht dein Name',
      required: 'Verrate mir bitte deinen Namen.',
    },
    email: {
      label: 'Wie lautet deine E-Mail-Adresse?',
      placeholder: 'deine@email.com',
      required: 'Ich brauche deine E-Mail-Adresse, um mich bei dir zu melden.',
      invalid: 'Das sieht nicht nach einer gültigen E-Mail-Adresse aus.',
    },
    message: {
      label: 'Wie kann ich dir helfen?',
      placeholder: 'Raus mit der Sprache: ein Projekt, eine wilde Idee oder einfach ein High Five?',
      required: 'Nur Mut, schreib mir ein paar Worte.',
      tooShort: 'Bitte schreib mindestens 10 Zeichen.',
    },
    privacy: {
      before: 'Ich akzeptiere die',
      linkText: 'Datenschutzerklärung',
      required: 'Bitte akzeptiere die Datenschutzerklärung, um deine Nachricht zu senden.',
    },
    submit: 'Senden',
  },
  social: {
    github: 'GitHub-Profil',
    linkedin: 'LinkedIn-Profil',
    email: 'E-Mail senden',
  },
  footer: {
    legalNotice: 'Impressum',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    email: 'E-Mail',
  },
};
