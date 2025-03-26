

// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';
// import { MatTableModule } from '@angular/material/table';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';
// import { MatGridListModule } from '@angular/material/grid-list'
// import { Router } from '@angular/router';
// import { validateVerticalPosition } from '@angular/cdk/overlay';

// import { provideAnimations } from '@angular/platform-browser/animations';


// @Component({
//   selector: 'app-subscription',
//   providers: [
//     provideAnimations(),  
   
//   ],
//   standalone: true,
//   imports: [
   
//     CommonModule,
//     ReactiveFormsModule,
//     FormsModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatSelectModule,
//     MatTableModule,
//     MatButtonModule,
//     MatCardModule,
//     MatGridListModule,
    
//   ],
 
//   templateUrl: './subscription.component.html',
//   styleUrls: ['./subscription.component.css']
// })
// export class SubscriptionComponent {
//   subscriptionForm: FormGroup;
//   isExpired = false;
//   isLocked = false;

//   licenseTypes = ['Basic', 'Standard', 'Premium'];
//   renewalTypes: string[] = ['Annual', 'Monthly', 'Quarterly'];
//   paymentTerms: string[] = ['One-time Payment', 'Recurring Payment', 'Free Plan'];

//   displayedColumns: string[] = ['date', 'amount', 'status'];
//   paymentHistory = [
//     { date: '2024-01-10', amount: 100, status: 'Paid' },
//     { date: '2024-06-15', amount: 150, status: 'Pending' }
//   ];

//   constructor(private fb: FormBuilder,private router: Router) {
//     this.subscriptionForm = this.fb.group({
//       licenseName: ['', Validators.required],
//       licenseKey: ['', Validators.required],
//       description: [''],
//       licenseType: ['', Validators.required],
//       startDate: ['', Validators.required],
//       expiryDate: ['', Validators.required],
//       trialPeriod: ['', [Validators.pattern('^[0-9]*$')]],
//       renewalType: ['', Validators.required],
//       price: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
      
//       paymentTerms: ['', Validators.required] 
//     });
//   }

 


//   onClear() {
//     this.subscriptionForm.reset();
//   }
  
//   onBack() {
//     this.router.navigate(['/license-list']);
//   }

//   checkExpiry() {
//     const expiryDate = new Date(this.subscriptionForm.get('expiryDate')?.value);
//     const today = new Date();

//     this.isExpired = expiryDate < today;
//     this.isLocked = this.isExpired;
//   }

//   onSubmit() {
//     if (this.subscriptionForm.valid) {
//       alert('Subscription data saved successfully!');
//     } else {
//       alert('Please fill all required fields.');
//     }
//   }
// }



import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-subscription',
  providers: [provideAnimations()],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent {
  subscriptionForm: FormGroup;
  isExpired = false;
  isLocked = false;

  

  constructor(private fb: FormBuilder, private router: Router,private http: HttpClient) {
    this.subscriptionForm = this.fb.group({
      
      
      License_Type : ['', Validators.required],
      UpdatedBy:[''],
      LicenseKey: ['', Validators.required],
      PaymentTerms: ['', Validators.required],
      TrialPeriod_days: ['', [Validators.pattern('^[0-9]*$')]],
      Price: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
      Renewaltype: ['', Validators.required],
      TermsandConditions: [''] ,
      
    });
  }
  ngOnInit(): void {}

  onClear() {
    this.subscriptionForm.reset();
  }

  checkExpiry() {
    const expiryDate = this.subscriptionForm.get('expiryDate')?.value;
    if (expiryDate) {
      const today = new Date();
      this.isExpired = new Date(expiryDate) < today;
      this.isLocked = this.isExpired;
    }
  }

  onSubmit() {
    console.log("onSubmit() triggered!"); 

    if (this.subscriptionForm.valid) {
      const subscriptionData = this.subscriptionForm.value;
      const requestData = {
        jsonFileparams: JSON.stringify([subscriptionData]),
        spname: "[dbo].[sp_Insert_License]"
      };

      console.log("Sending Data to API:", requestData);

      const apiUrl = 'https://localhost:44320/api/Service/GENERICSQLEXEC';

      this.http.post(apiUrl, requestData, { responseType: 'text' }).subscribe(
        response => {
          console.log("API Response:", response);

          if (response.trim().toLowerCase() === "success") {
            alert("Subscription added successfully!");
            this.onClear();
          } else {
            alert("Unexpected response: " + response);
          }
        },
        error => {
          console.error("API Error:", error);
          alert("Error adding subscription.");
        }
      );
    } else {
      console.log("Form is invalid:", this.subscriptionForm.value);
      Object.keys(this.subscriptionForm.controls).forEach(key => {
        const control = this.subscriptionForm.get(key);
        control?.markAsTouched();
      });
    }
  }

}
