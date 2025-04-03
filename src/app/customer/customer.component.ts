import { Component,OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ConfirmSnackbarComponent } from '../confirm-snackbar/confirm-snackbar.component';
import * as XLSX from 'xlsx';
 
 
@Component({
  selector: 'app-customer',
  standalone: true,
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class CustomerComponent   implements OnInit{
  userRole: string | null = null;
  searchText: string = '';
  customers: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'phone', 'address', 'email', 'actions'];
  apiUrl = 'https://semarsconfigapi.azurewebsites.net/api/Service/SQLLOADEXEC';
  storedProcedureName = '[dbo].[sp_select_customer]';
 
  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private http: HttpClient
  ) {}
 
  ngOnInit(): void {
    this.loadCustomers();
    localStorage.setItem('userRole', 'admin');
  }
  goBack() {
    this.router.navigate(['/mainpage']);
  }
 
  loadCustomers() {
    const params = { spname: this.storedProcedureName };
 
    this.http.get<any[]>(this.apiUrl, { params }).subscribe(
      (data) => {
        console.log('Fetched Customers:', data);
        this.customers = data.map(customer => ({ ...customer, isEditing: false }));
      },
      (error) => {
        console.error('Error fetching customers:', error);
      }
    );
  }
 
  // openAddDialog() {
  //   this.router.navigate(['/add-cutomer']);
  // }
  openAddDialog() {
    const userRole = localStorage.getItem('userRole'); // Retrieve role from localStorage
 
    if (userRole === 'admin') {
      this.router.navigate(['/add-cutomer']);
    } else {
      this.router.navigate(['/access-denied']);
    }
  }
 
//   deleteCustomer(id: number | null) {
//     if (!id) return;
 
//     const requestData = {
//         jsonFileparams: JSON.stringify([{ CustID: id.toString() }]),
//         spname: "[dbo].[sp_Delete_Customer]"
//     };
 
//     const apiUrl = 'https://localhost:44320/api/Service/GENERICSQLEXEC';
 
//     this.http.post(apiUrl, requestData, { responseType: 'text' }).subscribe(
//         response => {
//             console.log("API Response:", response);
//             this.loadCustomers();
 
//             if (response.trim().toLowerCase() === "success") {
//                 alert('Customer Deleted Successfully');
//                 this.customers = this.customers.filter(c => c.CustID !== id);
//             } else {
//                 alert('Failed to delete customer.');
//             }
//         },
//         error => {
//             console.error("API Error:", error);
//             alert('Error deleting customer.');
//         }
//     );
// }
deleteCustomer(id: number | null) {
  if (!id) return;
 
  const snackBarRef = this.snackBar.openFromComponent(ConfirmSnackbarComponent, {
    // duration: 8000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
    panelClass: ['snackbar-confirm'],
    data: { message: "Are you sure you want to delete this customer?" }
  });
 
  snackBarRef.onAction().subscribe(() => {
    // If user clicks "Yes", proceed with deletion
    const requestData = {
      jsonFileparams: JSON.stringify([{ CustID: id.toString() }]),
      spname: "[dbo].[sp_Delete_Customer]"
    };
 
    const apiUrl = 'https://semarsconfigapi.azurewebsites.net/api/Service/GENERICSQLEXEC';
 
    this.http.post(apiUrl, requestData, { responseType: 'text' }).subscribe(
      response => {
        console.log("API Response:", response);
        this.loadCustomers();
 
        if (response.trim().toLowerCase() === "success") {
          this.snackBar.open('Customer Deleted Successfully', 'OK', {
            duration: 3000,
            panelClass: ['snackbar-success']
          });
        } else {
          this.snackBar.open('Failed to delete customer.', 'OK', {
            duration: 3000,
            panelClass: ['snackbar-error']
          });
        }
      },
      error => {
        console.error("API Error:", error);
        this.snackBar.open('Error deleting customer.', 'OK', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    );
  });
}
 
get filteredCustomers() {
  if (!this.searchText.trim()) {
    return this.customers;
  }
  const lowerCaseSearch = this.searchText.toLowerCase();
  return this.customers.filter(customer =>
    customer.CustName.toLowerCase().includes(lowerCaseSearch) ||
    customer.Phone.toLowerCase().includes(lowerCaseSearch) ||
    customer.Email.toLowerCase().includes(lowerCaseSearch)
  );
}
 
onSearch(event: Event): void {
  const inputElement = event.target as HTMLInputElement;
  if (inputElement) {
    this.searchText = inputElement.value;
    console.log("Search input:", this.searchText);
  }
}
exportToExcel(): void {
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.customers)
  const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
  XLSX.writeFile(wb, 'exported_data_Customer.xlsx');
}
 
  toggleEdit(customer: any) {
    if (customer.isEditing) {
        // Validate CustID before sending request
        if (!customer.CustID) {
            alert("Error: Customer ID is missing.");
            return;
        }
 
        // Construct request data with ordered parameters
        const requestData = {
            JSONFileparams: JSON.stringify([
                {
                    LicenseType: customer.LicenseType || '',
                    CustName: customer.CustName || '',
                    Address: customer.Address || '',
                    Phone: customer.Phone || '',
                    Email: customer.Email || '',
                    City: customer.City || '',
                    State: customer.State || '',
                    Country: customer.Country || '',
                    Zip: customer.Zip || '',
                    CustomerType: customer.CustomerType || '',
                    CAbbreviation: customer.CAbbreviation || '',
                    ContactFPerson: customer.ContactFPerson || '',
                    ContactFEmail: customer.ContactFEmail || '',
                    ContactSPerson: customer.ContactSPerson || '',
                    ContactSEmail: customer.ContactSEmail || '',
                    Notes: customer.Notes || '',
                    Document1: customer.Document1 || '',
                    Document2: customer.Document2 || '',
                    Document3: customer.Document3 || '',
                    Document4: customer.Document4 || '',
                    Document5: customer.Document5 || '',
                    UpdatedBy: customer.UpdatedBy || '',
                    // Status: customer.Status || '',
                    CustID: customer.CustID.toString()
                }
            ]),
            spname: "[dbo].[sp_Update_Customer]"
        };
 
        console.log("Request Payload:", JSON.stringify(requestData, null, 2)); // Debugging output
 
        const apiUrl = 'https://semarsconfigapi.azurewebsites.net/api/Service/GENERICSQLEXEC';
 
        this.http.post(apiUrl, requestData, { responseType: 'text' }).subscribe(
            response => {
                console.log("Update Response:", response);
                if (response.trim().toLowerCase() === "success") {
                    alert('Customer updated successfully');
                    customer.isEditing = false;
                } else {
                    alert('Failed to update customer.');
                }
            },
            error => {
                console.error("API Error:", error);
                alert('Error updating customer.');
            }
        );
    } else {
        customer.isEditing = true;
    }
}
editCustomer(customer: any) {
  this.router.navigate(['/add-cutomer'], { state: { customerData: customer } });
}
clearsearch(){
  this.searchText ='';
  this.filterData();
}
filterData(): void {
  if (this.searchText.trim()) {
    const lowerCaseSearch = this.searchText.toLowerCase();
    this.customers = this.customers.filter(customer =>
      customer.CustName.toLowerCase().includes(lowerCaseSearch) ||
      customer.CustomerType.toLowerCase().includes(lowerCaseSearch) ||
      customer.Email.toLowerCase().includes(lowerCaseSearch)
    );
  } else {
    this.loadCustomers(); // Reload original data if search is cleared
  }
}
 
}