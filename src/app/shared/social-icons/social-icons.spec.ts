import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SocialIcons } from './social-icons';

describe('SocialIcons', () => {
  let component: SocialIcons;
  let fixture: ComponentFixture<SocialIcons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialIcons],
    }).compileComponents();

    fixture = TestBed.createComponent(SocialIcons);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
