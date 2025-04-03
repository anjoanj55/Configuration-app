
// import { Component ,OnInit} from '@angular/core';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { MatTableModule } from '@angular/material/table';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatDialog } from '@angular/material/dialog';
// import {SubcriptionpageComponent} from '../subcriptionpage/subcriptionpage.component';

// @Component({
//   selector: 'app-subcriptionlist',
//   standalone: true,
//   imports: [
//     CommonModule, 
//     MatTableModule,
//     MatButtonModule,
//     MatIconModule,
//     FormsModule,
//     ReactiveFormsModule,
//     MatDialogModule
//   ],
//   templateUrl: './subcriptionlist.component.html',
//   styleUrl: './subcriptionlist.component.css'
// })
// export class SubcriptionlistComponent {
//   searchText:any;
//   Subscription: any[] = [];
//   displayedColumns: string[] = ['CustomerName','LicenseType', 'StartDate', 'ExpiryDate','Licenseexpiringdays','actions'];
//   apiUrl = 'https://semarsconfigapi.azurewebsites.net/api/Service/SQLLOADEXEC'; 
//   storedProcedureName = '[dbo].[sp_select_Subscriptions]'; 

//   constructor(
//     private snackBar: MatSnackBar,
//     private router: Router,
//     private http: HttpClient,
//     private dialog: MatDialog
//   ) {}

//   ngOnInit(): void {
//     this.loadSubscription();
//   }

//   loadSubscription() {
//     const params = { spname: this.storedProcedureName }; 
  
//     this.http.get<any[]>(this.apiUrl, { params }).subscribe(
//       (data) => {
//         console.log('Fetched Subscription:', data); 
//         this.Subscription = data.map(item => ({ ...item, isNew: false })); 
//       },
//       (error) => {
//         console.error('Error fetching Subscription:', error);
//       }
//     );
//   }
  


//   openAddDialog() {
//     this.dialog.open(SubcriptionpageComponent, {
//       width: 'auto',
//       disableClose: false,
//     });
//   }
//   navigateToSubscription() {
//     this.router.navigate(['/subscriptionpage']);
//   }

//   ExtendSub(){
    
//   }

//   deleteLicence(id: number | null) {
//     if (!id) return;
 
//     const requestData = {
//         jsonFileparams: JSON.stringify([{ SubscriptionID: id.toString() }]),
//         spname: "[dbo].[sp_Delete_Subscriptions]"
//     };
 
//     const apiUrl = 'https://semarsconfigapi.azurewebsites.net/api/Service/GENERICSQLEXEC';
 
//     this.http.post(apiUrl, requestData, { responseType: 'text' }).subscribe(
//         response => {
//             console.log("API Response:", response);
//             this.loadSubscription();
 
//             if (response.trim().toLowerCase() === "success") {
//                 alert('Subscription Deleted Successfully'); 
//                 this.Subscription = this.Subscription.filter(c => c.CustID !== id);
//             } else {
//                 alert('Failed to delete Subscription.'); 
//             }
//         },
//         error => {
//             console.error("API Error:", error);
//             alert('Error deleting Subscription.'); 
//         }
//     );
//   }
// }


import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { SubcriptionpageComponent } from '../subcriptionpage/subcriptionpage.component';


@Component({
  selector: 'app-subcriptionlist',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    
  ],
  templateUrl: './subcriptionlist.component.html',
  styleUrl: './subcriptionlist.component.css'
})
export class SubcriptionlistComponent implements OnInit {
  searchText: any;
  Subscription: any[] = [];
  displayedColumns: string[] = ['CustomerName', 'LicenseType', 'StartDate', 'ExpiryDate', 'Licenseexpiringdays','NoofUsers', 'actions'];
  apiUrl = 'https://semarsconfigapi.azurewebsites.net/api/Service/SQLLOADEXEC';
  storedProcedureName = '[dbo].[sp_select_Subscriptions]';
  subscriptionForm: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private http: HttpClient,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.subscriptionForm = this.fb.group({
      CustomerName: [''],
      LicenseType: [''],
      UpdatedBy:[''],
      
    });
  }

  ngOnInit(): void {
    this.loadSubscription();
  }
  // openAddDialog() {
  //   this.dialog.open(SubcriptionpageComponent, {
  //     width: 'auto',
  //     disableClose: false,
  //   });
  // }
  
  openAddDialog() {
    // const dialogRef = this.dialog.open(SubcriptionpageComponent, {
    //   width: 'auto',
    //   disableClose: false,
    // });
  
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('Dialog closed', result);
    //   // Perform any action after the dialog is closed
    //   this.loadSubscription();
    //   if (result) {
    //     this.loadSubscription();
    //     // Handle data returned from the dialog if needed
    //     console.log('Dialog result:', result);
    //   }
    // });
    this.router.navigate(['/subcriptionpage']);
  }
  goBackToMain(){
    this.router.navigate(['/mainpage']);
  }

  loadSubscription() {
    const params = { spname: this.storedProcedureName };

    this.http.get<any[]>(this.apiUrl, { params }).subscribe(
      (data) => {
        console.log('Fetched Subscription:', data);
        this.Subscription = data.map(item => ({ ...item, isNew: false }));
      },
      (error) => {
        console.error('Error fetching Subscription:', error);
      }
    );
  }

 
 
  

  // navigateToSubscription() {
  //   this.router.navigate(['/subscriptionpage']);
  // }

  ExtendSub(subscription: any) {
    console.log("Extend button clicked for:", subscription);

    
    this.subscriptionForm.patchValue({
      CustomerName: subscription.CustomerName,
      LicenseType: subscription.LicenseType,
      UpdatedBy:[''],
      
    });

    this.onSubmit();
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
            this.loadSubscription(); // Reload subscriptions after extending
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

  // deleteLicence(id: number | null) {
  //   if (!id) return;

  //   const requestData = {
  //     jsonFileparams: JSON.stringify([{ SubscriptionID: id.toString() }]),
  //     spname: "[dbo].[sp_Delete_Subscriptions]"
  //   };

  //   const apiUrl = 'https://semarsconfigapi.azurewebsites.net/api/Service/GENERICSQLEXEC';

  //   this.http.post(apiUrl, requestData, { responseType: 'text' }).subscribe(
  //     response => {
  //       console.log("API Response:", response);
  //       this.loadSubscription();

  //       if (response.trim().toLowerCase() === "success") {
  //         alert('Subscription Deleted Successfully');
  //         this.Subscription = this.Subscription.filter(c => c.SubscriptionID !== id);
  //       } else {
  //         alert('Failed to delete Subscription.');
  //       }
  //     },
  //     error => {
  //       console.error("API Error:", error);
  //       alert('Error deleting Subscription.');
  //     }
  //   );
  // }
}
