
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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { addDays } from 'date-fns';
// import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { MatNativeDateModule } from '@angular/material/core';
@Component({
  selector: 'app-subcriptionpage',
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
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    
      
    ],
    providers: [provideNativeDateAdapter()],
  templateUrl: './subcriptionpage.component.html',
  styleUrl: './subcriptionpage.component.css'
})
export class SubcriptionpageComponent {
  loadCustomerdata: any[] = [];
  LoadLicencedata: any[] = [];
  apiUrl = 'https://semarsconfigapi.azurewebsites.net/api/Service/SQLLOADEXEC';
  storedProcedurCustomer = '[dbo].[sp_select_Customer]';
  storedProcedureLicence = '[dbo].[sp_select_License]';
  subscriptionForm: FormGroup;
  isExpired = false;
  isLocked = false;
  TrialPeriod_days: number = 30;
  customer:any;

  constructor(private fb: FormBuilder, private router: Router,private http: HttpClient) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { customerData?: any };
    this.customer = state?.customerData || {};
 
    this.subscriptionForm = this.fb.group({
      CustomerName : ['', Validators.required],
      LicenseType:['',Validators.required],
      UpdatedBy:[''],
      StartDate:['', Validators.required],
      ExpiryDate:['', Validators.required],
      UserLimit: [''],
      trialDays:['']
   });
   
  }
  // closeDialog() {
  //   this.dialogRef.close(); // This will close the dialog
  // }
  ngOnInit(): void {
    if (this.customer && this.customer.SubscriptionID) {
      console.log("Customer data received:", this.customer);
 
      this.subscriptionForm.patchValue({
        LicenseType: this.customer.LicenseType || '',
        StartDate: this.customer.StartDate || '',
        ExpiryDate: this.customer.ExpiryDate || '',
        CustomerName: this.customer.CustomerName || '',
        UserLimit: this.customer.UserLimit || '',
        
      });

      this.loadCustomer()
      this.LoadLicence()
      this.subscriptionForm.get('LicenseType')?.valueChanges.subscribe(() => this.updateExpiryDate());
       this.subscriptionForm.get('StartDate')?.valueChanges.subscribe(() => this.updateExpiryDate());
       this.subscriptionForm.get('ExpiryDate')?.valueChanges.subscribe(() => this.updateExpiryDate());
      this.subscriptionForm.get('CustomerName');
    } else {
      console.log("No valid customer data available, entering Insert mode");
      this.loadCustomer()
      this.LoadLicence()
      this.subscriptionForm.get('LicenseType')?.valueChanges.subscribe(() => this.updateExpiryDate());
       this.subscriptionForm.get('StartDate')?.valueChanges.subscribe(() => this.updateExpiryDate());
       this.subscriptionForm.get('ExpiryDate')?.valueChanges.subscribe(() => this.updateExpiryDate());
      this.subscriptionForm.get('CustomerName');
    }
    
    

  }
  onClose(): void {
    // Implement your close logic here
    // This might be this.dialogRef.close() if using MatDialog
  }
  onClear() {
    this.subscriptionForm.patchValue({
      CustomerName: '',
      LicenseType: '',
      pickerStart: null,  
      pickerExpiry: null
    });
  }
  
  loadCustomer()
  {
    const params = { spname: this.storedProcedurCustomer }; 
  
    this.http.get<any[]>(this.apiUrl, { params }).subscribe(
      (data) => {
        console.log('Fetched Customerdata:', data); 
        this.loadCustomerdata = data.map(item => ({ ...item, isNew: false })); 
      },
      (error) => {
        console.error('Error fetching Customerdata:', error);
      }
    );


  }
  // LoadLicence(){
  //   const params = { spname: this.storedProcedureLicence }; 
  
  //   this.http.get<any[]>(this.apiUrl, { params }).subscribe(
  //     (data) => {
  //       console.log('Fetched Licencedata:', data); 
  //       this.LoadLicencedata = data.map(item => ({ ...item, isNew: false })); 
  //     },
  //     (error) => {
  //       console.error('Error fetching Licencedata:', error);
  //     }
  //   );

  // }
   LoadLicence() {
    const params = { spname: this.storedProcedureLicence };

    this.http.get<any[]>(this.apiUrl, { params }).subscribe(
      (data) => {
        console.log('Fetched Licence Data:', data);
        this.LoadLicencedata = data.map(item => ({ ...item, isNew: false }));

        // Extract TrialPeriod_days from the first record
        if (data.length > 0 && data[0].TrialPeriod_days) {
          this.TrialPeriod_days = data[0].TrialPeriod_days;

          // Update ExpiryDate if StartDate is already selected
          const startDate = this.subscriptionForm.get('StartDate')?.value;
          if (startDate) {
            const expiryDate = addDays(new Date(startDate), this.TrialPeriod_days);
            this.subscriptionForm.get('ExpiryDate')?.setValue(expiryDate);
          }
        }
      },
      (error) => {
        console.error('Error fetching Licence Data:', error);
      }
    );
  }

  updateExpiryDate() {
    const selectedLicenseType = this.subscriptionForm.get('LicenseType')?.value;
    const startDate = this.subscriptionForm.get('StartDate')?.value;

    if (selectedLicenseType && startDate) {
      const selectedLicense = this.LoadLicencedata.find(lic => lic.LicenseType === selectedLicenseType);
     
      if (selectedLicense) {
        const trialDays = Number(selectedLicense.TrialPeriod_days) || 0;
        const expiryDate = addDays(new Date(startDate), trialDays);
        const userLimit = selectedLicense.UserLimit || 0;
        this.subscriptionForm.patchValue({ ExpiryDate: expiryDate.toISOString().split('T')[0],
        UserLimit: userLimit,
        trialDays:trialDays 
        });
      }
    }
  }
  

  checkExpiry() {
    const expiryDate = this.subscriptionForm.get('expiryDate')?.value;
    if (expiryDate) {
      const today = new Date();
      
    }
  }
  navsublistt(){
    this.router.navigate(['/Subcriptionlist']);
  }
  onSubmit() {
    console.log("onSubmit() triggered!"); 

    if (this.subscriptionForm.valid) {
      const subscriptionData = this.subscriptionForm.value;
      const requestData = {
        jsonFileparams: JSON.stringify([subscriptionData]),
        spname: "[dbo].[sp_Insert_Subscriptions]"
      };

      console.log("Sending Data to API:", requestData);

      const apiUrl = 'https://semarsconfigapi.azurewebsites.net/api/Service/GENERICSQLEXEC';

      this.http.post(apiUrl, requestData, { responseType: 'text' }).subscribe(
        response => {
          console.log("API Response:", response);

          if (response.trim().toLowerCase() === "success") {
            alert("Subscription added successfully!");
            // this.closeDialog()
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
