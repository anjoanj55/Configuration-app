import { Routes } from '@angular/router';
import { UserManagementComponent } from './user-management/user-management.component';

export const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', component: UserManagementComponent }
];