import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectWindow } from './project-window';

describe('ProjectWindow', () => {
  let component: ProjectWindow;
  let fixture: ComponentFixture<ProjectWindow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectWindow],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectWindow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
