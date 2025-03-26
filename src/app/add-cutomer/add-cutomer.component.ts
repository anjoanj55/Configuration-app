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

  constructor(private fb: FormBuilder,private snackBar: MatSnackBar, private router: Router, private http: HttpClient) {
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
      status: ['']
    });
  }

//   onSubmit() {
//     console.log("onSubmit() triggered!"); // Debugging

//     if (this.customerForm.valid) {
//         this.customer = this.customerForm.value;
//         const requestData = {
//             jsonFileparams: JSON.stringify([this.customer]),
//             spname: "[dbo].[sp_Insert_Customer]"
//         };

//         console.log("Sending Data to API:", requestData); // Debugging

//         const apiUrl = 'https://localhost:44320/api/Service/GENERICSQLEXEC';

//         this.http.post(apiUrl, requestData, { responseType: 'text' }).subscribe(
//             response => {
//                 console.log("API Response:", response);

//                 // Check if response is "success"
//                 if (response.trim().toLowerCase() === "success") {
//                     alert("Customer added successfully!");
//                     this.onReset();
//                 } else {
//                     alert("Unexpected response: " + response);
//                 }
//             },
//             error => {
//                 console.error("API Error:", error);
//                 alert("Error adding customer.");
//             }
//         );
//     } else {
//         console.log("Form is invalid:", this.customerForm.value);
//         Object.keys(this.customerForm.controls).forEach(key => {
//             const control = this.customerForm.get(key);
//             control?.markAsTouched();
//         });
//     }
// }
onSubmit() {
  console.log("onSubmit() triggered!"); // Debugging

  if (this.customerForm.valid) {
      this.customer = this.customerForm.value;
      const requestData = {
          jsonFileparams: JSON.stringify([this.customer]),
          spname: "[dbo].[sp_Insert_Customer]"
      };

      console.log("Sending Data to API:", requestData); // Debugging

      const apiUrl = 'https://localhost:44320/api/Service/GENERICSQLEXEC';

      this.http.post(apiUrl, requestData, { responseType: 'text' }).subscribe(
          response => {
              console.log("API Response:", response);

              // Check if response is "success"
              if (response.trim().toLowerCase() === "success") {
                  alert("Customer added successfully!");
                  this.customerForm.reset(); // Clear the form
              } else {
                  alert("Unexpected response: " + response);
              }
          },
          error => {
              console.error("API Error:", error);
              alert("Error adding customer.");
          }
      );
  } else {
      console.log("Form is invalid:", this.customerForm.value);
      Object.keys(this.customerForm.controls).forEach(key => {
          const control = this.customerForm.get(key);
          control?.markAsTouched();
      });

      alert("Please correct the errors in the form.");
  }
}



  onReset() {
    this.customerForm.reset();
    this.customer = {}; // Reset customer object
  }

  goBackToCustomers() {
    this.router.navigate(['/customers']);
  }
}