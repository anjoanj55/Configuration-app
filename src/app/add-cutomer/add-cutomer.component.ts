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
      licenseType: ['', Validators.required],
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
      contactFPerson: ['', Validators.required],
      contactFEmail: ['', [Validators.required, Validators.email]],
      contactSPerson: ['', Validators.required],
      contactSEmail: ['', [Validators.required, Validators.email]],
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
 

  goBackToCustomers() {
    this.router.navigate(['/Customer']);
  }
  access() {
    this.router.navigate(['/access-denied']);
  }


  ngOnInit(): void {
    console.log("ngOnInit triggered");
    console.log("Customer data at ngOnInit:", this.customer); // Debugging log
 
    if (this.customer && this.customer.CustID) {  
      console.log("Customer data received, entering Update mode:", this.customer);
      this.customerForm.patchValue(this.customer);
      this.isUpdateMode = true;
    } else {
      console.log("No valid customer data available, entering Insert mode");
      this.isUpdateMode = false;
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
   
        const apiUrl = 'http://103.199.163.162/ConfigApi/api/Service/GENERICSQLEXEC';
   
        this.http.post(apiUrl, requestData, { responseType: 'text' }).subscribe(
            response => {
                console.log("API Response:", response);
   
                // Check if response is "success"
                if (response.trim().toLowerCase() === "success") {
                    alert("Customer added successfully!");
                    this.customerForm.reset(); // Clear the form
                } else {
                    // alert("Unexpected response: " + response);
                    alert("Unexpected response: " );
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
    if (this.customerForm.valid) {
      this.customer = { ...this.customer, ...this.customerForm.value };
      const requestData = {
        jsonFileparams: JSON.stringify([this.customer]),
        spname: "[dbo].[sp_Update_Customer]"
      };
 
      this.http.post('http://103.199.163.162/ConfigApi/api/Service/GENERICSQLEXEC', requestData, { responseType: 'text' }).subscribe(
        response => {
          if (response.trim().toLowerCase() === "success") {
            this.snackBar.open("Customer updated successfully!", "Close", { duration: 3000 });
            this.router.navigate(['/customer']);
          } else {
            this.snackBar.open("Operation failed.", "Close", { duration: 3000 });
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
    // Prevent default form validation
    if (this.customerForm) {
      // Temporarily disable validation
      Object.keys(this.customerForm.controls).forEach(key => {
        const control = this.customerForm.get(key);
        control?.clearValidators();
        control?.updateValueAndValidity({ onlySelf: true, emitEvent: false });
      });
 
      // Reset the form without validation
      this.customerForm.reset({
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
      }, {
        emitEvent: false,  // Prevent additional event triggers
        onlySelf: true     // Only affect this control
      });
 
     
      this.customerForm.markAsPristine();
      this.customerForm.markAsUntouched();
 
      // Show reset confirmation
      this.snackBar.open('Form cleared', 'Close', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
 
      // Reset customer object
      this.customer = {};
    }
  }
 
 
 
}