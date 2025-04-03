import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLockingComponent } from './user-locking.component';

describe('UserLockingComponent', () => {
  let component: UserLockingComponent;
  let fixture: ComponentFixture<UserLockingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserLockingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserLockingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
