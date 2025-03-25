import { Component } from '@angular/core';
<<<<<<< HEAD
import { Router, RouterOutlet } from '@angular/router'; // ✅ Import RouterOutlet
=======
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UserManagementComponent } from './user-management/user-management.component';
>>>>>>> e4acf35ade08c95fb0b9cbd8e90915f829111cd8

@Component({
  selector: 'app-root',
  standalone: true,
<<<<<<< HEAD
  imports: [RouterOutlet], // ✅ Add RouterOutlet to imports
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Configuration-app';

  constructor(private router: Router) {
    this.router.navigate(['/subscription']); // Redirect to subscription on load
  }
}
=======
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
>>>>>>> e4acf35ade08c95fb0b9cbd8e90915f829111cd8
