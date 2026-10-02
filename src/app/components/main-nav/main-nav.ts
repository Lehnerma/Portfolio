import { Component, DOCUMENT, ElementRef, Renderer2, effect, inject, signal } from '@angular/core';
import { UnderlineTitle } from '../../shared/underline-title/underline-title';

@Component({
  imports: [UnderlineTitle],
  selector: 'app-main-nav',
  styleUrl: './main-nav.scss',
  templateUrl: './main-nav.html',
  host: {
    '(document:click)': 'onDocumentClick($event)',
    '(document:keydown.escape)': 'closeNavMenu()',
  },
})
export class MainNav {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly document = inject(DOCUMENT);

  navOpen = signal<boolean>(false);

  constructor() {
    // Locks page scrolling while the menu is open; cleanup also runs on destroy
    effect((onCleanup) => {
      if (!this.navOpen()) return;
      this.renderer.setStyle(this.document.body, 'overflow', 'hidden');
      onCleanup(() => this.renderer.removeStyle(this.document.body, 'overflow'));
    });
  }

  /**
   * Toggles the nav menu on the mobile version
   */
  toggleNavMenu(): void {
    this.navOpen.update((value) => !value);
    console.log(this.navOpen());
  }

  /**
   * Closes the nav menu
   */
  closeNavMenu(): void {
    this.navOpen.set(false);
  }

  /**
   * Closes the nav menu when a click happens outside of this component
   */
  onDocumentClick(event: MouseEvent): void {
    if (!this.navOpen()) return;
    if (event.target instanceof Node && this.host.nativeElement.contains(event.target)) return;
    this.closeNavMenu();
  }

  backdropClick(event: MouseEvent): void {
    if (this.navOpen()) return;
    console.log(event);
  }
}
