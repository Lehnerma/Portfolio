import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnimateTitle } from './animate-title';

describe('AnimateTitle', () => {
  let component: AnimateTitle;
  let fixture: ComponentFixture<AnimateTitle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimateTitle],
    }).compileComponents();

    fixture = TestBed.createComponent(AnimateTitle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
