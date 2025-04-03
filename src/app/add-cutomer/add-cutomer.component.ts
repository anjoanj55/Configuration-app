import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
 
@Component({
  selector: 'app-add-customer',
  standalone: true,
  templateUrl: './add-cutomer.component.html',
  styleUrls: ['./add-cutomer.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSnackBarModule // ✅ Add this
  ],
})
export class AddCustomerComponent {
  customerForm: FormGroup;
  customer: any = {};
  isUpdateMode = true; // NEW: Flag to determine mode
 
  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, private snackBar: MatSnackBar) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { customerData?: any };
 
    this.customer = state?.customerData || {};
    this.isUpdateMode = !!state?.customerData;  // Set update mode if data is present
 
    this.customerForm = this.fb.group({
      licenseType: [''],
      custName: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      customerType: ['', Validators.required],
      cAbbreviation: [''],
      contactFPerson: [''],
      contactFEmail: [''],
      contactSPerson: [''],
      contactSEmail: [''],
      notes: [''],
      document1: [''],
      document2: [''],
      document3: [''],
      document4: [''],
      document5: [''],
      // createdDate: ['', Validators.required],
      createdBy: [''],
      // updatedDate: ['', Validators.required],
      updatedBy: [''],
      // status: ['']
    });
  }
 
  ngOnInit(): void {
    console.log("ngOnInit triggered");
 
    if (this.customer && this.customer.CustID) {
      console.log("Customer data received:", this.customer);
 
      this.customerForm.patchValue({
        licenseType: this.customer.LicenseType || '',
        custName: this.customer.CustName || '',
        address: this.customer.Address || '',
        phone: this.customer.Phone || '',
        email: this.customer.Email || '',
        city: this.customer.City || '',
        state: this.customer.State || '',
        country: this.customer.Country || '',
        zip: this.customer.Zip || '',
        customerType: this.customer.CustomerType || '',
        contactFPerson: this.customer.ContactFPerson || '',
        contactFEmail: this.customer.ContactFEmail || '',
        contactSPerson: this.customer.ContactSPerson || '',
        contactSEmail: this.customer.ContactSEmail || '',
        notes: this.customer.Notes || ''
      });
 
      this.isUpdateMode = true;
    } else {
      console.log("No valid customer data available, entering Insert mode");
      this.isUpdateMode = false;
    }
  }
 
  saveOrUpdateCustomer() {
    if (this.isUpdateMode) {
      this.updateCustomer();
    } else {
      this.onSubmit();
    }
  }
 
 
  onSubmit() {
    console.log("onSubmit() triggered!"); // Debugging
   
    if (this.customerForm.valid) {
        this.customer = this.customerForm.value;
        const requestData = {
            jsonFileparams: JSON.stringify([this.customer]),
            spname: "[dbo].[sp_Insert_Customer]"
        };
   
        console.log("Sending Data to API:", requestData); // Debugging
   
        const apiUrl = 'https://semarsconfigapi.azurewebsites.net/api/Service/GENERICSQLEXEC';
   
        this.http.post(apiUrl, requestData, { responseType: 'text' }).subscribe(
            response => {
                console.log("API Response:", response);
   
                // Check if response is "success"
                if (response.trim().toLowerCase() === "success") {
                    alert("Customer added successfully!");
                    this.customerForm.reset(); // Clear the form
                } else {
                    // alert("Unexpected response: " + response);
                    // alert("Unexpected response: " );
                }
            },
            error => {
                console.error("API Error:", error);
                alert("Error adding customer.");
            }
        );
    } else {
      console.log("Form is invalid:", this.customerForm.value);
     
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.customerForm.controls).forEach(key => {
        const control = this.customerForm.get(key);
        control?.markAsTouched();
      });
   
      this.snackBar.open("Please fill in all required fields correctly.", "Close", {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
  }
 
  updateCustomer() {
    if (!this.customer.CustID) {
        alert("Error: Customer ID is missing.");
        return;
    }
 
    if (this.customerForm.valid) {
        this.customer = { ...this.customer, ...this.customerForm.value };
 
        const requestData = {
            JSONFileparams: JSON.stringify([
                {
                    LicenseType: this.customer.licenseType || '',
                    CustName: this.customer.custName || '',
                    Address: this.customer.address || '',
                    Phone: this.customer.phone || '',
                    Email: this.customer.email || '',
                    City: this.customer.city || '',
                    State: this.customer.state || '',
                    Country: this.customer.country || '',
                    Zip: this.customer.zip || '',
                    CustomerType: this.customer.customerType || '',
                    CAbbreviation: this.customer.cAbbreviation || '',
                    ContactFPerson: this.customer.contactFPerson || '',
                    ContactFEmail: this.customer.contactFEmail || '',
                    ContactSPerson: this.customer.contactSPerson || '',
                    ContactSEmail: this.customer.contactSEmail || '',
                    Notes: this.customer.notes || '',
                    Document1: this.customer.document1 || '',
                    Document2: this.customer.document2 || '',
                    Document3: this.customer.document3 || '',
                    Document4: this.customer.document4 || '',
                    Document5: this.customer.document5 || '',
                    UpdatedBy: this.customer.updatedBy || '',
                    CustID: this.customer.CustID.toString()
                }
            ]),
            spname: "[dbo].[sp_Update_Customer]"
        };
 
        console.log("Request Payload:", JSON.stringify(requestData, null, 2));
 
        const apiUrl = 'https://semarsconfigapi.azurewebsites.net/api/Service/GENERICSQLEXEC';
 
        this.http.post(apiUrl, requestData, { responseType: 'text' })
            .subscribe(
                response => {
                    console.log("Update Response:", response);
                    this.customerForm.reset();
                    if (response.trim().toLowerCase() === "success") {
                        this.snackBar.open("Customer updated successfully!", "Close", { duration: 3000 });
                        this.customerForm.reset();
                        this.router.navigate(['/customers']);
                    } else {
                        this.snackBar.open("Failed to update customer.", "Close", { duration: 3000 });
                    }
                },
                error => {
                    console.error("API Error:", error);
                    this.snackBar.open("Error updating customer.", "Close", { duration: 3000 });
                }
            );
    } else {
        this.customerForm.markAllAsTouched();
        this.snackBar.open("Please fill in all required fields correctly.", "Close", { duration: 3000 });
    }
}
 
onReset() { 
  this.customerForm.patchValue({
    licenseType: '',
    custName: '',
    address: '',
    phone: '',
    email: '',
    city: '',
    state: '',
    country: '',
    zip: '',
    customerType: '',
    cAbbreviation: '',
    contactFPerson: '',
    contactFEmail: '',
    contactSPerson: '',
    contactSEmail: '',
    notes: '',
    document1: '',
    document2: '',
    document3: '',
    document4: '',
    document5: '',
    createdBy: '',
    updatedBy: ''
  });

  
}

 
    goBackToCustomers() {
      this.router.navigate(['/Customer']);
    }
   
    access() {
      this.router.navigate(['/page-access']);
    }
    // access() {
    //   this.router.navigate(['/access-denied']);
    // }
 
}