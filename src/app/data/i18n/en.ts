import { Translations } from '../../interfaces/translations';

export const EN_TRANSLATIONS: Translations = {
  meta: {
    title: 'Portfolio',
  },
  nav: {
    about: 'About me',
    skills: 'Skills',
    projects: 'Projects',
    contact: 'Contact',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    language: 'Language',
  },
  hero: {
    greeting: 'Hello World',
    greetingHover: 'I’m Maximilian Lehner',
    titleTop: 'Frontend',
    titleBottom: 'DEVELOPER',
    cta: 'Get in Touch',
    photoCaption: 'Max',
  },
  about: {
    subtitle: 'WHO’S MAX',
    title: 'About me',
    text: 'Career changer with a passion for frontend: I like solving everyday problems myself and building things exactly the way I need them, like my smart home automations. My stack: Angular and web-development (HTML, JS, SCSS). I find inspiration in blogs, podcasts and community forums, and I challenge myself on Codewars. Clean code matters to me: readable and reusable.',
    cta: 'Let’s talk',
    preferences: {
      location: 'Based in Grafenegg',
      commute: 'Flexible with longer commute',
      remote: 'Open to work remote',
    },
  },
  skills: {
    subtitle: 'MY STACK',
    title: 'Skill set',
    text: 'I work with HTML, CSS/SASS, JavaScript, TypeScript and Angular, plus Supabase and Firebase for backend services. As a career changer, I learn quickly and stay open to new technologies.',
  },
  sticker: {
    currentlyLearning: 'Currently learning:',
    peelMeFirstLine: 'Pls peel',
    peelMeSecondLine: 'me',
    peelAriaLabel: 'Peel off sticker',
    peeledValue: (percent) => `${percent} percent peeled`,
  },
  projects: {
    subtitle: 'MY CRAFT',
    title: 'Projects',
  },
  projectWindow: {
    closeWindow: 'Close window',
    minimizeWindow: 'Minimize window',
    restoreWindow: 'Restore window',
    openDetails: 'Open project details',
    showDescription: 'Show project description',
    detailsButton: 'Details',
  },
  dragHint: {
    prefix: 'U can',
    suffix: 'us',
    pointerWords: ['hover', 'drag'],
    touchWords: ['touch', 'drag'],
    label: 'You can drag the project windows',
  },
  comments: {
    subtitle: 'IN THEIR WORDS',
    title: 'Colleague’s Thoughts',
    linkedinLogoAlt: 'LinkedIn logo',
  },
  contact: {
    subtitle: 'CONTACT ME',
    title: 'Ready to work together?',
    message:
      'Feel free to reach out and tell me which role you have in mind. I’m confident that my expertise and drive to keep improving my skills will make a meaningful contribution to your team. My passion is CSS: I give every project its own distinct finish, so it feels unique rather than like one of many template sites. As a career changer, I put in extra effort and show determination and willpower in every new challenge. Helping shape a new project excites me.',
    logoAlt: 'Logo',
  },
  form: {
    name: {
      label: 'What’s your name?',
      placeholder: 'Your name goes here',
      required: 'Please tell me your name.',
    },
    email: {
      label: 'What’s your email?',
      placeholder: 'youremail@email.com',
      required: 'I need your email to get back to you.',
      invalid: 'That doesn’t look like a valid email address.',
    },
    message: {
      label: 'How can I help you?',
      placeholder: 'Spill the beans: a project, a wild idea or just a high five?',
      required: 'Don’t be shy, write me a few words.',
      tooShort: 'Please write at least 10 characters.',
    },
    privacy: {
      before: 'I accept the',
      linkText: 'Privacy Policy',
      required: 'Please accept the privacy policy to send your message.',
    },
    submit: 'Send',
  },
  social: {
    github: 'GitHub profile',
    linkedin: 'LinkedIn profile',
    email: 'Send an email',
  },
  footer: {
    legalNotice: 'Legal Notice',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    email: 'Email',
  },
};
