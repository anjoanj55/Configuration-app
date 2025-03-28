import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router'; 
import { CommonModule } from '@angular/common'; // ✅ Import this
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-customer',
  standalone: true,
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  imports: [
    CommonModule, // ✅ Add this line
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class CustomerComponent {
  searchText: string = '';
  customers: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'phone', 'address', 'email', 'actions'];
  apiUrl = 'http://103.199.163.162/ConfigApi/api/Service/SQLLOADEXEC';
  storedProcedureName = '[dbo].[sp_select_customer]';
  isLoggedIn :boolean  =true;
  loggedInUser:any =''
  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private http: HttpClient,private authService: MsalService
  ) {}

  ngOnInit(): void {
    this.loadCustomers();

    this.authService.instance.initialize().then(() => {
 
      // MSAL is initialized

      console.log('MSAL initialized');

    }).catch(error => {

      console.error('MSAL initialization failed', error);

    });
  }

  loadCustomers() {
    const params = { spname: this.storedProcedureName };
  
    this.http.get<any[]>(this.apiUrl, { params }).subscribe(
      (data) => {
        console.log('Fetched Customers:', data);
        this.customers = data.map(customer => ({ ...customer, isEditing: false })); // Add isEditing flag
      },
      (error) => {
        console.error('Error fetching customers:', error);
      }
    );
  }

  openAddDialog() {
    this.router.navigate(['/add-cutomer']);
  }

  deleteCustomer(id: number | null) {
    if (!id) return;

    const requestData = {
        jsonFileparams: JSON.stringify([{ CustID: id.toString() }]),
        spname: "[dbo].[sp_Delete_Customer]"
    };

    const apiUrl = 'http://103.199.163.162/ConfigApi/api/Service/GENERICSQLEXEC';

    this.http.post(apiUrl, requestData, { responseType: 'text' }).subscribe(
        response => {
            console.log("API Response:", response);
            this.loadCustomers();

            if (response.trim().toLowerCase() === "success") {
                alert('Customer Deleted Successfully'); 
                this.customers = this.customers.filter(c => c.CustID !== id);
            } else {
                alert('Failed to delete customer.'); 
            }
        },
        error => {
            console.error("API Error:", error);
            alert('Error deleting customer.'); 
        }
    );
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
back(){
  this.router.navigate(['mainpage']);
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

onSearch(event: Event): void {
  const inputElement = event.target as HTMLInputElement;
  if (inputElement) {
    this.searchText = inputElement.value;
    console.log("Search input:", this.searchText);
  }
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
                    LicenseType: customer.LicenseType || null,
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

        const apiUrl = 'http://103.199.163.162/ConfigApi/api/Service/GENERICSQLEXEC';

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
// editCustomer(customer: any) {
//   this.router.navigate(['/add-cutomer'], { state: { customerData: customer } });
// }





}