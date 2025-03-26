

// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { MatTableModule } from '@angular/material/table';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-licence-list',
//   standalone: true,
//   imports: [MatTableModule, MatButtonModule, MatIconModule, CommonModule],
//   templateUrl: './licence-list.component.html',
//   styleUrls: ['./licence-list.component.css']
// })
// export class LicenceListComponent implements OnInit {
 
//   licenceList = [
//     { 
//       id: 1, 
//       name: 'Licence A', 
//       licenseType: 'Pro Plan', 
//       licenseOptions: 'Full Access', 
//       startDate: '2024-07-01', 
//       expiryDate: '2025-07-01', 
//       email: 'userA@example.com' 
//     }
//   ];

//   loaddataLicence: any[] = [];
//   apiUrl = 'https://localhost:44320/api/Service/SQLLOADEXEC'; 
//   storedProcedureName = '[dbo].[sp_select_License]';
//   displayedColumns: string[] = ['name', 'licenseType', 'licenseOptions', 'startDate', 'expiryDate', 'email', 'delete'];

//   constructor(private router: Router, private http: HttpClient) {}

//   ngOnInit(): void {
//     this.loadLicence();
//   }

//   loadLicence() {
//     const params = new HttpParams().set('spname', this.storedProcedureName);

//     this.http.get<any[]>(this.apiUrl, { params }).subscribe({
//       next: (data) => {
//         console.log('API Response:', data);
//         this.loaddataLicence = data;
//       },
//       error: (error) => {
//         console.error('API Error:', error);
//         this.loaddataLicence = [...this.licenceList];
//         console.warn('Using mock data due to API failure');
//       }
//     });
//   }

//   navigateToAddLicence() {
//     this.router.navigate(['/subscription']);
//   }

//   deleteLicense(id: number): void {
//     this.loaddataLicence = this.loaddataLicence.filter(license => license.id !== id);
//   }
// }
import { Component ,OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ Import this
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-licence-list',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './licence-list.component.html',
  styleUrls: ['./licence-list.component.css']
})
export class LicenceListComponent implements OnInit {

  Licences: any[] = [];
  displayedColumns: string[] = ['LicenseType','LicenseKey', 'Pricing', 'Renewaltype','actions','TrialPeriod_days'];
  apiUrl = 'https://localhost:44320/api/Service/SQLLOADEXEC'; 
  storedProcedureName = '[dbo].[sp_select_License]'; 

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadLicence();
  }

  loadLicence() {
    const params = { spname: this.storedProcedureName }; 
  
    this.http.get<any[]>(this.apiUrl, { params }).subscribe(
      (data) => {
        console.log('Fetched loadLicence:', data); 
        this.Licences = data;
      },
      (error) => {
        console.error('Error fetching loadLicence:', error);
      }
    );
  }

  openAddDialog() {
    this.router.navigate(['/subscription']);
  }

  deleteLicence(id: number | null) {
    if (!id) return;
 
    const requestData = {
        jsonFileparams: JSON.stringify([{ CustLicenseID: id.toString() }]),
        spname: "[dbo].[sp_Delete_License]"
    };
 
    const apiUrl = 'https://localhost:44320/api/Service/GENERICSQLEXEC';
 
    this.http.post(apiUrl, requestData, { responseType: 'text' }).subscribe(
        response => {
            console.log("API Response:", response);
            this.loadLicence();
 
            if (response.trim().toLowerCase() === "success") {
                alert('Customer Deleted Successfully'); // ✅ Alert instead of Snackbar
                this.Licences = this.Licences.filter(c => c.CustID !== id);
            } else {
                alert('Failed to delete customer.'); // ✅ Alert for failure
            }
        },
        error => {
            console.error("API Error:", error);
            alert('Error deleting customer.'); // ✅ Alert for error
        }
    );
  }
  
}
