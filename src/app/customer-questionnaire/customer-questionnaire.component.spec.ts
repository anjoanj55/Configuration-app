import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerQuestionnaireComponent } from './customer-questionnaire.component';

describe('CustomerQuestionnaireComponent', () => {
  let component: CustomerQuestionnaireComponent;
  let fixture: ComponentFixture<CustomerQuestionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerQuestionnaireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerQuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
