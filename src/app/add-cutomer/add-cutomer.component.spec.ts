import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCutomerComponent } from './add-cutomer.component';

describe('AddCutomerComponent', () => {
  let component: AddCutomerComponent;
  let fixture: ComponentFixture<AddCutomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCutomerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCutomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
