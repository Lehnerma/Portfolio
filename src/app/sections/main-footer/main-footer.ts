import { Component } from '@angular/core';
import { UnderlineTitle } from '../../shared/underline-title/underline-title';
import { ContactForm } from '../../shared/contact-form/contact-form';
import { NAV_FOOTER_DATA } from '../../data/nav';
import { NavElements } from '../../shared/nav-elements/nav-elements';

@Component({
  imports: [UnderlineTitle, ContactForm, NavElements],
  selector: 'app-main-footer',
  styleUrl: './main-footer.scss',
  templateUrl: './main-footer.html',
})
export class MainFooter {
  readonly navElements = NAV_FOOTER_DATA;

  readonly contactMsg = `Feel free to reach out and tell me which role you have in mind. I’m confident that my
        expertise and drive to keep improving my skills will make a meaningful contribution to your
        team. My passion is CSS: I give every project its own distinct finish, so it feels unique
        rather than like one of many template sites. As a career changer, I put in extra effort and
        show determination and willpower in every new challenge. Helping shape a new project excites
        me.`;
}
