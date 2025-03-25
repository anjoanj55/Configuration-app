import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatCardModule, MatSelectModule, MatButtonModule],
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent {
  subscriptionForm: FormGroup;
  plans = ['Basic', 'Standard', 'Premium'];

  constructor(private fb: FormBuilder) {
    this.subscriptionForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      plan: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.subscriptionForm.valid) {
      console.log('Subscription Data:', this.subscriptionForm.value);
      alert('Subscription Successful!');
    }
  }
}
