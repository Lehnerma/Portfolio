import { Component } from '@angular/core';
import { MainNav } from '../../components/main-nav/main-nav';

@Component({
  imports: [MainNav],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home {}
