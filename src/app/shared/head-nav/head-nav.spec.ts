import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HeadNav } from './head-nav';

describe('HeadNav', () => {
  let component: HeadNav;
  let fixture: ComponentFixture<HeadNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadNav],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HeadNav);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('toggles the menu', () => {
    component.toggleNavMenu();
    expect(component.navOpen()).toBe(true);
    component.toggleNavMenu();
    expect(component.navOpen()).toBe(false);
  });

  it('closes the menu on a link click', async () => {
    component.toggleNavMenu();
    await fixture.whenStable();

    fixture.nativeElement.querySelector('.nav__element').click();

    expect(component.navOpen()).toBe(false);
  });

  it('closes the menu on Escape', () => {
    component.toggleNavMenu();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(component.navOpen()).toBe(false);
  });
});
