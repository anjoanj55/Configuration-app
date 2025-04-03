import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAlertComponent } from './customer-alert.component';

describe('CustomerAlertComponent', () => {
  let component: CustomerAlertComponent;
  let fixture: ComponentFixture<CustomerAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerAlertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
