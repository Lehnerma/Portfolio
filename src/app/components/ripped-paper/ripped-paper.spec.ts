import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RippedPaper } from './ripped-paper';

describe('RippedPaper', () => {
  let component: RippedPaper;
  let fixture: ComponentFixture<RippedPaper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RippedPaper],
    }).compileComponents();

    fixture = TestBed.createComponent(RippedPaper);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
