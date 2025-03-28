import { Component } from '@angular/core';
import { Router } from '@angular/router';
 
import { MsalService } from '@azure/msal-angular';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  isLoggedIn :boolean  =true;
  loggedInUser:any =''
 constructor(private router: Router,private authService: MsalService)  {
  }
  
  customernavigate(){
    this.router.navigate(['/Customer']);
  
   }

   
  licensenavigate(){
    this.router.navigate(['/LicenceList']);
  
   }
   customerquestionnarrienavigate(){
    this.router.navigate(['/customerquestionnarie']);
  
   }
   CustomerAlertnotification(){
    this.router.navigate(['/CustomerAlert']);
   }


   logout() {
 
    this.authService.logout().subscribe({

      next: () => {

        console.log('Logout successful');

        this.isLoggedIn = false;

        this.loggedInUser = '';

        this.router.navigate(['/login']);

      },

      error: (error) => {

        console.error('Logout failed', error);

      }

    });

  }

  ngOnInit(): void {
    this.authService.instance.initialize().then(() => {
 
      // MSAL is initialized

      console.log('MSAL initialized');

    }).catch(error => {

      console.error('MSAL initialization failed', error);

    });

  }
}
