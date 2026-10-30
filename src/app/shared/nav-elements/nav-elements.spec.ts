import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavElemnts } from './nav-elements';

describe('NavElemnts', () => {
  let component: NavElemnts;
  let fixture: ComponentFixture<NavElemnts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavElemnts],
    }).compileComponents();

    fixture = TestBed.createComponent(NavElemnts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
