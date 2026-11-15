import { ProjectInfos } from '../interfaces/project-infos';

export const PROJECTS: readonly ProjectInfos[] = [
  {
    id: 'join',
    name: 'Join',
    imgSrc: '/assets/img/join.webp',
    stack: ['HTML', 'CSS', 'Javascript'],
    liveUrl: 'https://join.max-lehner.at',
    githubUrl: 'https://github.com/Lehnerma/join-3135',
    route: 'project/join',
    devStack: [
      {
        name: 'HTML',
        iconPath: '/assets/icons/skills/html5.svg',
      },
      {
        name: 'CSS',
        iconPath: '/assets/icons/skills/css.svg',
      },
      {
        name: 'JavaScript',
        iconPath: '/assets/icons/skills/js.svg',
      },
    ],
  },
  {
    id: 'pollapp',
    name: 'Poll-app',
    imgSrc: '/assets/img/poll-app.webp',
    stack: ['Angular', 'Sass/Scss'],
    liveUrl: 'https://poll-app.max-lehner.at/',
    githubUrl: 'https://github.com/Lehnerma/PollApp',
    route: 'project/pollapp',
    devStack: [
      {
        name: 'Angular',
        iconPath: '/assets/icons/skills/angular.svg',
      },
      {
        name: 'Sass/Scss',
        iconPath: '/assets/icons/skills/sass.svg',
      },
      {
        name: 'Typescript',
        iconPath: '/assets/icons/skills/typescript.svg',
      },
      {
        name: 'Supabase',
        iconPath: '/assets/icons/skills/supabase.svg',
      },
    ],
  },
  {
    id: 'sharkie',
    name: 'Sharkie',
    imgSrc: '/assets/img/sharkie.webp',
    stack: ['HTML', 'CSS', 'Javascript'],
    liveUrl: 'https://sharkie.max-lehner.at',
    githubUrl: 'https://github.com/Lehnerma/sharkie',
    route: 'project/sharkie',
    devStack: [
      {
        name: 'HTML',
        iconPath: '/assets/icons/skills/html5.svg',
      },
      {
        name: 'CSS',
        iconPath: '/assets/icons/skills/css.svg',
      },
      {
        name: 'Javascript',
        iconPath: '/assets/icons/skills/js.svg',
      },
    ],
  },
];
