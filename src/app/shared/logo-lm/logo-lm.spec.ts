import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoLm } from './logo-lm';

describe('LogoLm', () => {
  let component: LogoLm;
  let fixture: ComponentFixture<LogoLm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoLm],
    }).compileComponents();

    fixture = TestBed.createComponent(LogoLm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
