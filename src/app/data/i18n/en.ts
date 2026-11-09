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
    items: {
      join: {
        description:
          'A minimalist project management tool for collaborative work. The front end is built using pure HTML, CSS, and JavaScript, while Firebase serves as the cloud backend, ensuring seamless real-time task management. Try out the features right away using the built-in guest access.',
        imgAlt: 'Screenshot of the project Join',
        duration: '6 weeks',
        implementationText: '',
      },
      pollApp: {
        description:
          'A modern dynamic survey web application built with Angular, SCSS, and Supabase as Backend-as-a-Service. The app enables the creation of adaptive questionnaires that dynamically adjust their flow in real time based on user responses. Featuring single- and multiple-choice question formats, it includes instant database synchronization, configurable expiry dates, and flexible rule management. Ready to fill out and test with zero friction.',
        imgAlt: 'Screenshot of the project Poll-app',
        duration: '4 weeks',
        implementationText: '',
      },
      sharkie: {
        description:
          'In this object-oriented browser game, players guide a small shark on his epic quest to become the King of the Seas. Built with pure HTML5, CSS3, and Vanilla JavaScript following clean OOP architecture, the game features animated enemies, an in-game upgrade shop, and a challenging final boss fight. The fully playable first level runs instantly in any web browser without installation.',
        imgAlt: 'Screenshot of the project Sharkie',
        duration: '5 weeks',
        implementationText: '',
      },
    },
  },
  projectWindow: {
    closeWindow: 'Close window',
    minimizeWindow: 'Minimize window',
    restoreWindow: 'Restore window',
    openDetails: 'Open project details',
    showDescription: 'Show project description',
    detailsButton: 'Details',
  },
  projectDetail: {
    durationLabel: 'Duration',
    stackLabel: '',
    descriptionTitle: 'Description:',
    implementationTitle: 'Implementation Details',
    githubBtn: 'Github',
    liveBtn: 'Live Test',
    opensInNewTab: '',
    btnNextProject: 'Next project',
    btnPrevProject: 'Previous project',
    backToProjects: 'Go Back',
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
    items: {
      radek: {
        comment:
          'Max works in a very team-oriented way and is always available for questions. He completes tasks reliably and carefully, and even small details don’t escape him. As a result, the quality of the results was consistently high.',
      },
      monika: {
        comment:
          'The collaboration worked great despite different working hours and availability. Max took the initiative to keep the project moving and kept both the big picture and the details in view. Max always offered teammates help. The structure was clear and the code clean, so it was easy to find your way around.',
      },
      guenter: {
        comment:
          'Working with Max in a team was really enjoyable. He listens, contributes his own ideas, and pitches in when something gets stuck. He also notices little things others overlook and brings them up in time.',
      },
    },
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
