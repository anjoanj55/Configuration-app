import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router'; // ✅ Import RouterOutlet

@Component({
  selector: 'app-root',
  standalone: true,
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
