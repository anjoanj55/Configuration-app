import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddbconfigComponent } from './adddbconfig.component';

describe('AdddbconfigComponent', () => {
  let component: AdddbconfigComponent;
  let fixture: ComponentFixture<AdddbconfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdddbconfigComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdddbconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
