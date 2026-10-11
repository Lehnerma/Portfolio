import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkillsIcons } from './skills-icons';

describe('SkillsIcons', () => {
  let component: SkillsIcons;
  let fixture: ComponentFixture<SkillsIcons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsIcons],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillsIcons);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
