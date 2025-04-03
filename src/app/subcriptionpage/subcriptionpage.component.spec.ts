import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcriptionpageComponent } from './subcriptionpage.component';

describe('SubcriptionpageComponent', () => {
  let component: SubcriptionpageComponent;
  let fixture: ComponentFixture<SubcriptionpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubcriptionpageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubcriptionpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
