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
  selector: 'app-customer-alert',
  standalone: true,
  imports: [
     CommonModule, 
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule
  ],
  templateUrl: './customer-alert.component.html',
  styleUrl: './customer-alert.component.css'
})
export class CustomerAlertComponent {
  searchText: string = '';
  Licences: any[] = [];
  displayedColumns: string[] = ['LicenseType','LicenseKey', 'Pricing', 'Renewaltype','actions'];
  apiUrl = 'http://103.199.163.162/ConfigApi/api/Service/SQLLOADEXEC'; 
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
  navigateToSubscription() {
    this.router.navigate(['/subscriptionpage']);
  }

  deleteLicence(id: number | null) {
    if (!id) return;
 
    const requestData = {
        jsonFileparams: JSON.stringify([{ CustLicenseID: id.toString() }]),
        spname: "[dbo].[sp_Delete_License]"
    };
 
    const apiUrl = 'http://103.199.163.162/ConfigApi/api/Service/GENERICSQLEXEC';
 
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


