import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzquestionsComponent } from './quizzquestions.component';

describe('QuizzquestionsComponent', () => {
  let component: QuizzquestionsComponent;
  let fixture: ComponentFixture<QuizzquestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizzquestionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizzquestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
