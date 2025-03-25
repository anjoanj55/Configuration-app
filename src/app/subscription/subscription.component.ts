

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list'
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [
   
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    
  ],
 
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent {
  subscriptionForm: FormGroup;
  isExpired = false;
  isLocked = false;

  licenseTypes = ['Basic', 'Standard', 'Premium'];
  renewalTypes = ['Manual', 'Auto-renew'];

  displayedColumns: string[] = ['date', 'amount', 'status'];
  paymentHistory = [
    { date: '2024-01-10', amount: 100, status: 'Paid' },
    { date: '2024-06-15', amount: 150, status: 'Pending' }
  ];

  constructor(private fb: FormBuilder,private router: Router) {
    this.subscriptionForm = this.fb.group({
      licenseName: ['', Validators.required],
      licenseKey: ['', Validators.required],
      description: [''],
      licenseType: ['', Validators.required],
      licenseOptions: [''],
      startDate: ['', Validators.required],
      expiryDate: ['', Validators.required],
      trialPeriod: ['', [Validators.pattern('^[0-9]*$')]],
      renewalType: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
      expiryEmail: ['', [Validators.required, Validators.email]]
    });
  }
  onClear() {
    this.subscriptionForm.reset();
  }
  
  onBack() {
    this.router.navigate(['/license-list']);
  }

  checkExpiry() {
    const expiryDate = new Date(this.subscriptionForm.get('expiryDate')?.value);
    const today = new Date();

    this.isExpired = expiryDate < today;
    this.isLocked = this.isExpired;
  }

  onSubmit() {
    if (this.subscriptionForm.valid) {
      alert('Subscription data saved successfully!');
    } else {
      alert('Please fill all required fields.');
    }
  }
}

