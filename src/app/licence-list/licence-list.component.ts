// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-licence-list',
//   standalone: true,
//   imports: [],
//   templateUrl: './licence-list.component.html',
//   styleUrl: './licence-list.component.css'
// })
// export class LicenceListComponent {

// }

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-licence-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './licence-list.component.html',
  styleUrls: ['./licence-list.component.css']
})
export class LicenceListComponent {
  licenceList = [
    { 
      id: 1, 
      name: 'Licence A', 
      licenseType: 'Pro Plan', 
      licenseOptions: 'Full Access', 
      startDate: '2024-07-01', 
      expiryDate: '2025-07-01', 
      email: 'userA@example.com' 
    },
    { 
      id: 2, 
      name: 'Licence B', 
      licenseType: 'Enterprise License', 
      licenseOptions: 'Limited Access', 
      startDate: '2024-08-01', 
      expiryDate: '2025-08-01', 
      email: 'userB@example.com' 
    },
    { 
      id: 3, 
      name: 'Licence C', 
      licenseType: 'Basic Plan', 
      licenseOptions: 'Read Only', 
      startDate: '2024-09-01', 
      expiryDate: '2025-09-01', 
      email: 'userC@example.com' 
    }
  ];
  
  displayedColumns: string[] = ['name', 'licenseType', 'licenseOptions', 'startDate', 'expiryDate', 'email', 'delete'];



  constructor(private router: Router) {}

  navigateToAddLicence() {
    this.router.navigate(['/subscription']);
  }

  deleteLicense(id: number): void {
    this.licenceList = this.licenceList.filter(license => license.id !== id);
  }
}
