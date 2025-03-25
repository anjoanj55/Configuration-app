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
import { provideNativeDateAdapter } from '@angular/material/core';
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
    MatSelectModule
  ],
})
export class AddCustomerComponent {
  customerForm: FormGroup;

  constructor(private fb: FormBuilder,private router: Router) {
    this.customerForm = this.fb.group({
      companyName: ['', [Validators.required, Validators.minLength(2)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      phone: ['', [
        Validators.required, 
        Validators.pattern(/^[0-9]{10}$/)
      ]],
      email: ['', [Validators.required, Validators.email]],
      location: ['', [Validators.required]],
      product: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      pincode: ['', [
        Validators.required, 
        Validators.pattern(/^[0-9]{6}$/)
      ]],
      ccc: ['', [Validators.required]]
    }, { validators: this.dateRangeValidator });
  }

  // Custom validator to ensure end date is after start date
  dateRangeValidator(group: FormGroup) {
    const startDate = group.get('startDate')?.value;
    const endDate = group.get('endDate')?.value;
    
    return startDate && endDate && new Date(startDate) < new Date(endDate) 
      ? null 
      : { dateRange: true };
  }
  goBackToCustomers() {
    this.router.navigate(['/customers']); // Redirects to CustomerComponent
  }

  onSubmit() {
    if (this.customerForm.valid) {
      console.log(this.customerForm.value);
      // Add your submission logic here
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.customerForm.controls).forEach(key => {
        const control = this.customerForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  onReset() {
    this.customerForm.reset();
  }
}
