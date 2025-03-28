import { Component } from '@angular/core';
import { Router } from '@angular/router';
 
import { MsalService } from '@azure/msal-angular';
import { MatIconModule } from '@angular/material/icon';
import { DataShareService } from '../data-share.service'; 


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
  ipforapi:any=''
 constructor(private router: Router,private authService: MsalService,private Datashare: DataShareService)  {
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
   
   EventLognavigation(){
    this.router.navigate(['/EventLog']);
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
    this.ipforapi  = this.Datashare.getipdetails();
    console.log('ipcheck:', this.ipforapi);
    this.authService.instance.initialize().then(() => {
 
      // MSAL is initialized

      console.log('MSAL initialized');

    }).catch(error => {

      console.error('MSAL initialization failed', error);

    });

  }
}
