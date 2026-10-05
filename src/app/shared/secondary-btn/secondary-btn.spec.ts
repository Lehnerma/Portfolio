import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SecondaryBtn } from './secondary-btn';

describe('SecondaryBtn', () => {
  let component: SecondaryBtn;
  let fixture: ComponentFixture<SecondaryBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecondaryBtn],
    }).compileComponents();

    fixture = TestBed.createComponent(SecondaryBtn);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
