import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UserManagementComponent } from './user-management/user-management.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, UserManagementComponent],
  template: `
    <nav>
      <a routerLink="/users" routerLinkActive="active">User Management</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [`
    nav {
      padding: 1rem;
      background: #3f51b5;
    }
    a {
      color: white;
      text-decoration: none;
      margin-right: 1rem;
    }
    .active {
      font-weight: bold;
      text-decoration: underline;
    }
  `]
})
export class AppComponent {
  title = 'user-management-app';
}