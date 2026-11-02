import { Component } from '@angular/core';
import { MainFooter } from '../../sections/main-footer/main-footer';
import { Landing } from '../../sections/landing/landing';
import { AboutMe } from '../../sections/about-me/about-me';
import { Skills } from '../../sections/skills/skills';
import { Projects } from '../../sections/projects/projects';
import { Comments } from '../../sections/comments/comments';

@Component({
  imports: [MainFooter, Landing, AboutMe, Skills, Projects, Comments],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home {}
