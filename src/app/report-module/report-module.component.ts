import { Component,Inject } from '@angular/core';
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
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-report-module',
  standalone: true,
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
    MatSnackBarModule ],
  templateUrl: './report-module.component.html',
  styleUrl: './report-module.component.css'
})
export class ReportModuleComponent {
  reportForm: FormGroup;
  
  reportlist: ReportItem[] = []; 
  report: any = {};
  customerNames: string[] = [];
  buttonname =''
  action:any=''
  reportid:any=''
  reportalllist:any=[];
  isEditMode:boolean =false
  isUpdateMode = true; 
 
  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient,
    public dialogRef: MatDialogRef<ReportModuleComponent>,
     private snackBar: MatSnackBar,
     @Inject(MAT_DIALOG_DATA) public data: any ) 
     {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { reportData?: any };
  
    this.report = state?.reportData || {};
    this.isUpdateMode = !!state?.reportData;  
 
    this.reportForm = this.fb.group({
      custName: ['', Validators.required],
      industryname:[''],
      reportid: ['', Validators.required],
      reportname: ['', Validators.required],
      group:[''],
      createdDate: [new Date()],
      createdBy: [''],
      UpdatedBy: [''],
      ID: [''], 
      clientID: [''] 
    });


    
  }
 
  loadcustomerreportlist() {
    const apiUrl = 'https://localhost:44320/api/Service/SQLLOADEXEC'; 
    const storedProcedureName = '[dbo].[sp_select_customer]'; 
  
    const params = { spname: storedProcedureName }; 
  
    this.http.get<any[]>(apiUrl, { params }).subscribe(
      (data) => {
        console.log('Fetched loadcustomerreportlist:', data); 
        this.reportlist = data;
        this.customerNames = this.reportlist.map(item => item.CustName);
        console.log('Fetched loadcustomerreportlistfilter:', this.customerNames); 
      },
      (error) => {
        console.error('Error fetching loadcustomerreportlist:', error);
      }
    );
  }

  loadallreport() {
    const apiUrl = 'https://localhost:44320/api/Service/SQLLOADEXEC'; 
    const storedProcedureName = '[dbo].[sp_select_ReportConfig]'; 
  
    const params = { spname: storedProcedureName }; 
  
    this.http.get<any[]>(apiUrl, { params }).subscribe(
      (data) => {
        console.log('Fetched loadcustomerreportlist:', data); 
      this.reportalllist = data;
      this.reportalllist = data.filter(report => report.reportid ===  this.reportid);
      },
      (error) => {
        console.error('Error fetching loadcustomerreportlist:', error);
      }
    );
  }

  loadallreport1() {
    const apiUrl = 'https://localhost:44320/api/Service/SQLLOADEXEC'; 
    const storedProcedureName = '[dbo].[sp_select_ReportConfig]'; 
  
    const params = { spname: storedProcedureName }; 
  
    this.http.get<any[]>(apiUrl, { params }).subscribe(
      (data) => {
        console.log('Fetched loadcustomerreportlist:', data); 
      this.reportalllist = data;
      //this.reportalllist = data.filter(report => report.reportid ===  this.reportid);
      },
      (error) => {
        console.error('Error fetching loadcustomerreportlist:', error);
      }
    );
  }


  ngOnInit(): void {
    
    this.loadcustomerreportlist();
    this.action = this.data.action; 
    this.report = this.data.report;
    console.log('Received Report Data:', this.report); 
    if(this.action =="edit"){
      this.isEditMode = true;
      this.patchFormValues(this.data.report);
      this.loadallreport();
      if (this.reportForm.controls['reportid']) {
        console.log('Setting Report ID:', this.report.ReportID); 
        this.reportForm.controls['reportid'].setValue(this.report.ReportID); 
      }
    }
    else{
      this.isEditMode = false;
      this.patchFormValues(this.data.report);
      this.loadallreport();
    }
  }
  patchFormValues(reportData: any) {
    console.log('Patching values to form:', reportData); 
    this.reportForm.patchValue({
      ID: reportData.ID,
      custName: reportData.CustomerName,  
      industryname: reportData.Industry,
      reportid: reportData.ReportID,
      reportname: reportData.ReportName,
      group: reportData.GroupID,
      createdDate: new Date(reportData.CreatedDate),
      clientID: String(reportData.CustomerID)
       
    });
  }
 

 
  onSubmit() {
    let requestData;
   if(this.isEditMode == false){
    if (this.reportForm.valid) {
        this.report = this.reportForm.value;
        // const requestData = {
        //     jsonFileparams: JSON.stringify([this.report]),
        //     spname: "[dbo].[sp_Insert_ReportConfig]"
        // };

        requestData = {
          jsonFileparams: JSON.stringify([{
            custName: this.report.custName,
            reportid: this.report.reportid,
            clientID: this.report.clientID,
            group: this.report.group,
            reportname: this.report.reportname,
            industryname: this.report.industryname,
            UpdatedBy: this.report.UpdatedBy,
            createdDate: this.report.createdDate,
          }]),
          spname: "[dbo].[sp_Insert_ReportConfig]"
        };
        console.log("Sending Data:", JSON.stringify([this.report])); 

        console.log("Sending Data to API:", requestData); 
   
        const apiUrl = 'https://localhost:44320/api/Service/GENERICSQLEXEC';
   
        this.http.post(apiUrl, requestData, { responseType: 'text' }).subscribe(
            response => {
                console.log("API Response:", response);
   
                // Check if response is "success"
                if (response.trim().toLowerCase() === "success") {
                    alert("report added successfully!");
                    this.dialogRef.close(); 
                    this.reportForm.reset(); // Clear the form
                } else {
                    // alert("Unexpected response: " + response);
                    alert("Unexpected response: " );
                }
            },
            error => {
                console.error("API Error:", error);
                alert("Error adding report.");
            }
        );
    } else {
      console.log("Form is invalid:", this.reportForm.value);
     
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.reportForm.controls).forEach(key => {
        const control = this.reportForm.get(key);
        control?.markAsTouched();
      });
   
      this.snackBar.open("Please fill in all required fields correctly.", "Close", {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
  }
  else{
    if (this.reportForm.valid) {
      //this.report = { ...this.report, ...this.reportForm.value };
      this.report = this.reportForm.value;
      requestData = {
        jsonFileparams: JSON.stringify([{
          reportid: this.report.reportid,
          clientID: this.report.clientID,
          group: this.report.group,
          reportname: this.report.reportname,
          industryname: this.report.industryname,
          UpdatedBy: this.report.UpdatedBy,
          custName: this.report.custName,
          ID: this.report.ID,  
        }]),
        spname: "[dbo].[sp_Update_ReportConfig]"
      };
      console.log("Sending Data to update:", JSON.stringify([{
        reportid: this.report.reportid,
        clientID: this.report.clientID,
        group: this.report.group,
        reportname: this.report.reportname,
        industryname: this.report.industryname,
        UpdatedBy: this.report.UpdatedBy,
        custName: this.report.custName,
        ID: this.report.ID,  
      }])); 

      console.log("Sending Data to API:", requestData); 
      this.http.post('https://localhost:44320/api/Service/GENERICSQLEXEC', requestData, { responseType: 'text' }).subscribe(
        response => {
          if (response.trim().toLowerCase() === "success") {
            this.snackBar.open("report updated successfully!", "Close", { duration: 3000 });
            this.dialogRef.close();         
            } 
            else {
            this.snackBar.open("Operation failed.", "Close", { duration: 3000 });
          }
        },
        error => {
          console.error("API Error:", error);
          this.snackBar.open("Error updating reportForm.", "Close", { duration: 3000 });
        }
      );
    } else {
      this.reportForm.markAllAsTouched();
      this.snackBar.open("Please fill in all required fields correctly.", "Close", { duration: 3000 });
    }
  }
  }
 
 
  onReset() {
    if (this.reportForm) {
      // Temporarily disable validation
      Object.keys(this.reportForm.controls).forEach(key => {
        const control = this.reportForm.get(key);
        control?.clearValidators();
        //control?.updateValueAndValidity({ onlySelf: true, emitEvent: false });
      });
 
      // Reset the form without validation
      this.reportForm.reset({
        custName:  '',
        industryname: '',
        reportid: '',
        reportname: '',
        group: '',
        createdDate: '',
        createdBy: '',
        
      }, {
        emitEvent: false,  // Prevent additional event triggers
        onlySelf: true     // Only affect this control
      });
 
     
      this.reportForm.markAsPristine();
      this.reportForm.markAsUntouched();
 
      // Show reset confirmation
      this.snackBar.open('Form cleared', 'Close', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
 
      // Reset report object
      this.report = {};
    }
  }



  backtoreportlist() {
    this.router.navigate(['/report-list']);
  }
  closeDialog(): void {
    this.dialogRef.close(); 
  }


 
}


interface ReportItem {
  CustName: string;
  industryname: string;
  reportid: string;
  reportname: string;
  group: string;
  createdDate: string;
  createdBy: string;
}