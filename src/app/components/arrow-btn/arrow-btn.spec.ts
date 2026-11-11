import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArrowBtn } from './arrow-btn';

describe('ArrowBtn', () => {
  let component: ArrowBtn;
  let fixture: ComponentFixture<ArrowBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrowBtn],
    }).compileComponents();

    fixture = TestBed.createComponent(ArrowBtn);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
