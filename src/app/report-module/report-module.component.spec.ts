import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportModuleComponent } from './report-module.component';

describe('ReportModuleComponent', () => {
  let component: ReportModuleComponent;
  let fixture: ComponentFixture<ReportModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportModuleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
