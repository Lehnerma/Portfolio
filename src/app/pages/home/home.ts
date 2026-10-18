import { Component, model } from '@angular/core';
import { UnderlineTitle } from '../../shared/underline-title/underline-title';
import { SocialIcons } from '../../shared/social-icons/social-icons';
import { AnimateTitle } from '../../shared/animate-title/animate-title';
import { PrimaryBtn } from '../../shared/primary-btn/primary-btn';
import { SecondaryBtn } from '../../shared/secondary-btn/secondary-btn';
import { RippedPaper } from '../../components/ripped-paper/ripped-paper';
import { SkillIcon } from '../../interfaces/skills-icons';
import { TitleCasePipe } from '@angular/common';
import { Sticker } from '../../components/sticker/sticker';
import { ProjectWindow } from '../../components/project-window/project-window';
import { ProjectInfos } from '../../interfaces/project-infos';

@Component({
  imports: [
    UnderlineTitle,
    SocialIcons,
    AnimateTitle,
    PrimaryBtn,
    SecondaryBtn,
    RippedPaper,
    TitleCasePipe,
    Sticker,
    ProjectWindow,
  ],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home {
  navOpen = model<boolean>(false);
  burgerMenu = model<boolean>(true);

  skillsIcons: SkillIcon[] = [
    { name: 'angular', path: 'assets/icons/skills/angular.svg' },
    { name: 'TypeScript', path: 'assets/icons/skills/typescript.svg' },
    { name: 'HTML', path: 'assets/icons/skills/html5.svg' },
    { name: 'CSS', path: 'assets/icons/skills/css.svg' },
    { name: 'SASS', path: 'assets/icons/skills/sass.svg' },
    { name: 'Firebase', path: 'assets/icons/skills/firebase.svg' },
    { name: 'Supabase', path: 'assets/icons/skills/supabase.svg' },
    { name: 'Git', path: 'assets/icons/skills/git.svg' },
    { name: 'scrum', path: 'assets/icons/skills/scrum.svg' },
    { name: 'claude', path: 'assets/icons/skills/claude.svg' },
    { name: 'linux', path: 'assets/icons/skills/linux.svg' },
  ];

  projects: ProjectInfos[] = [
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
  /**
   * Toggles the nav menu on the mobile version
   */
  toggleNavMenu(): void {
    this.navOpen.update((value) => !value);
  }

  // todo the funciton is not used maybe can be deleted
  /**
   * Handles clicks on the navigation backdrop.
   * @param event The mouse event from the backdrop click.
   */
  backdropClick(event: MouseEvent): void {
    if (this.navOpen()) return;
    console.log(event);
  }
}
