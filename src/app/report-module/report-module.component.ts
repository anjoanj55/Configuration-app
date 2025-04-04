



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
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
 import { MatSnackBarModule } from '@angular/material/snack-bar';

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
    MatSnackBarModule
  ],
  templateUrl: './report-module.component.html',
  styleUrl: './report-module.component.css'
})
export class ReportModuleComponent {
  reportForm: FormGroup;
  reportlist: ReportItem[] = [];
  report: any = {};
  customerNames: string[] = [];
  reportalllist: any[] = [];
  isEditMode: boolean = false;
  
  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private route: ActivatedRoute, 
    private http: HttpClient, 
    private snackBar: MatSnackBar
  ) {
    this.reportForm = this.fb.group({
      custName: ['', Validators.required],
      industryname: [''],
      reportid: ['', Validators.required],
      reportname: ['', Validators.required],
      group: [''],
      createdDate: [new Date()],
      createdBy: [''],
      UpdatedBy: [''],
      ID: [''], 
      clientID: [''] 
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {

      console.log("Query Params Received:", params); // Log the entire query params
      if (params['data']) {
        this.report = JSON.parse(params['data']);
        this.isEditMode = true;
        this.patchFormValues(this.report);
        this.loadallreport();
      }
    });

    this.loadcustomerreportlist();
  }

  loadcustomerreportlist() {
    const apiUrl = 'https://semarsconfigapi.azurewebsites.net/api/Service/SQLLOADEXEC'; 
    const params = { spname: '[dbo].[sp_select_customer]' };

    this.http.get<any[]>(apiUrl, { params }).subscribe(
      (data) => {
        this.reportlist = data;
        this.customerNames = this.reportlist.map(item => item.CustName);
      },
      (error) => console.error('Error fetching customer report list:', error)
    );
  }

  loadallreport() {
    const apiUrl = 'https://semarsconfigapi.azurewebsites.net/api/Service/SQLLOADEXEC'; 
    const params = { spname: '[dbo].[sp_select_ReportConfig]' };

    this.http.get<any[]>(apiUrl, { params }).subscribe(
      (data) => {
        this.reportalllist = data.filter(report => report.reportid === this.report.reportid);
      },
      (error) => console.error('Error fetching report list:', error)
    );
  }

  patchFormValues(reportData: any) {
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
   
        const apiUrl = 'https://semarsconfigapi.azurewebsites.net/api/Service/GENERICSQLEXEC';
   
        this.http.post(apiUrl, requestData, { responseType: 'text' }).subscribe(
            response => {
                console.log("API Response:", response);
   
                // Check if response is "success"
                if (response.trim().toLowerCase() === "success") {
                    alert("report added successfully!");
                    
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
      const apiUrl = 'https://semarsconfigapi.azurewebsites.net/api/Service/GENERICSQLEXEC';

      this.http.post(apiUrl, requestData, { responseType: 'text' }).subscribe(
        response => {
          console.log("API Response:", response);
      
          // Check if response is "success"
          if (response.trim().toLowerCase() === "success") {
            this.snackBar.open("Report updated successfully!", "Close", { duration: 3000 });
      
            this.reportForm.reset(); // Clear the form
          } else {
            this.snackBar.open("Operation failed.", "Close", { duration: 3000 });
          }
        },
        error => {
          console.error("API Error:", error);
          this.snackBar.open("Error updating report.", "Close", { duration: 3000 });
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
      }}
  }
  onReset() {
    this.reportForm.reset({
      custName: '',
      industryname: '',
      reportid: '',
      reportname: '',
      group: '',
      createdDate: '',
      createdBy: '',
    });

    this.snackBar.open('Form cleared', 'Close', { duration: 2000 });
  }

  goBack() {
    this.router.navigate(['/report-list']);
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
