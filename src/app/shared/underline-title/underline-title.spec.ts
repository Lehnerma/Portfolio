import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnderlineTitle } from './underline-title';

describe('UnderlineTitle', () => {
  let component: UnderlineTitle;
  let fixture: ComponentFixture<UnderlineTitle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnderlineTitle],
    }).compileComponents();

    fixture = TestBed.createComponent(UnderlineTitle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
