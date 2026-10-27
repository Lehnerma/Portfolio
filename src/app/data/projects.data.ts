import { ProjectInfos } from '../interfaces/project-infos';

export const PROJECTS: readonly ProjectInfos[] = [
  {
    name: 'Join',
    img_scr: '/assets/img/join.webp',
    description_en:
      'A minimalist project management tool for collaborative work. The front end is built using pure HTML, CSS, and JavaScript, while Firebase serves as the cloud backend, ensuring seamless real-time task management. Try out the features right away using the built-in guest access.',
    description_de:
      'Ein minimalistisches Projektmanagement-Tool für die Zusammenarbeit. Das Frontend wurde ausschließlich mit HTML, CSS und JavaScript erstellt, während Firebase als Cloud-Backend dient und so eine nahtlose Aufgabenverwaltung in Echtzeit gewährleistet. Probieren Sie die Funktionen gleich jetzt über den integrierten Gastzugang aus.',
    img_alt: 'Screenshot project Join',
    route: '', // todo add the route!
  },
  {
    name: 'Poll-app',
    img_scr: '/assets/img/poll-app.webp',
    description_en:
      'A modern dynamic survey web application built with Angular, SCSS, and Supabase as Backend-as-a-Service. The app enables the creation of adaptive questionnaires that dynamically adjust their flow in real time based on user responses. Featuring single- and multiple-choice question formats, it includes instant database synchronization, configurable expiry dates, and flexible rule management. Ready to fill out and test with zero friction.',
    description_de:
      'Eine moderne Web-App für interaktive Umfragen, entwickelt mit Angular, SCSS und Supabase als Backend-as-a-Service. Die Anwendung ermöglicht das Erstellen dynamischer Fragebögen, deren Verlauf in Echtzeit auf die Eingaben der Nutzer reagiert. Neben flexiblem Frage-Design mit Single- und Multiple-Choice-Optionen bietet das System eine nahtlose Echtzeit-Datenbanksynchronisation sowie Konfigurationsmöglichkeiten für Ablaufdaten und Zugriffsbeschränkungen. Ohne große Hürden sofort ausfüllen und testen.',
    img_alt: 'Screenshot project Poll-app',
    route: '',
  },
  {
    name: 'Sharkie',
    img_scr: '/assets/img/sharkie.webp',
    description_en:
      'In this object-oriented browser game, players guide a small shark on his epic quest to become the King of the Seas. Built with pure HTML5, CSS3, and Vanilla JavaScript following clean OOP architecture, the game features animated enemies, an in-game upgrade shop, and a challenging final boss fight. The fully playable first level runs instantly in any web browser without installation.',
    description_de:
      'In diesem objektorientierten Browser-Game begleiten Spieler einen kleinen Hai auf seinem Weg zum mächtigen König der Meere. Entwickelt mit reinem HTML5, CSS3 und Vanilla JavaScript auf Basis moderner OOP-Prinzipien, bietet das Spiel animierte Gegner, einen integrierten Ingame-Shop für Upgrades sowie einen anspruchsvollen Endboss. Das fertige erste Level lässt sich ohne Installation direkt im Browser starten.',
    img_alt: 'Screenshot project Sharkie',
    route: '',
  },
];
