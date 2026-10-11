import { Component } from '@angular/core';
import { SkillIcon } from '../../interfaces/skills-icons';

@Component({
  imports: [],
  selector: 'app-skills-icons',
  styleUrl: './skills-icons.scss',
  templateUrl: './skills-icons.html',
})
export class SkillsIcons {
  skillsIcons: SkillIcon[] = [
    { name: 'Angular', path: 'assets/icons/skills/Angular.svg' },
    { name: 'TypeScript', path: 'assets/icons/skills/TypeScript.svg' },
    { name: 'JavaScript', path: 'assets/icons/skills/JavaScript.svg' },
    { name: 'HTML', path: 'assets/icons/skills/HTML.svg' },
    { name: 'CSS', path: 'assets/icons/skills/CSS.svg' },
    { name: 'Firebase', path: 'assets/icons/skills/Firebase.svg' },
    { name: 'Git', path: 'assets/icons/skills/Git.svg' },
  ];
}
