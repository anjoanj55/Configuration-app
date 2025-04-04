import { Component ,OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { ReportModuleComponent } from '../report-module/report-module.component'
import { MatDialog } from '@angular/material/dialog'; 

import { ConfirmSnackbarComponent } from '../confirm-snackbar/confirm-snackbar.component';


@Component({
  selector: 'app-report-list',
  standalone: true,
  imports: [ CommonModule, 
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule],
  templateUrl: './report-list.component.html',
  styleUrl: './report-list.component.css'
})
export class ReportListComponent {
  searchText: string = '';
  reportlist: any[] = [];
  reportlistcopy:any[]=[]


  displayedColumns: string[] = ['ReportName','CustomerName','ReportID','GroupID', 'actions'];
  apiUrl = 'https://semarsconfigapi.azurewebsites.net/api/Service/SQLLOADEXEC'; 

  storedProcedureName = '[dbo].[sp_select_ReportConfig]'; 

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private http: HttpClient,private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadreportlist();
  }

  closePage() {
    this.router.navigate(['mainpage']);


  }

  // editreport(reportData:any=[]){
  //   const dialogRef = this.dialog.open(ReportModuleComponent, {
  //     width: '500px', 
  //     data: { action: 'edit', report: reportData } 
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     this.loadreportlist();
  //   });
  // }
  editreport(reportData: any = []) {
    this.router.navigate(['/report-module'], { queryParams: { data: JSON.stringify(reportData) } });
  }

  openReportPage(): void {
    this.router.navigate(['/report-module'], {
      queryParams: { report: JSON.stringify(this.reportlist) }
    });
  }
  openAddDialog() {
    const userRole = localStorage.getItem('userRole'); // Retrieve role from localStorage
 
    if (userRole === 'admin') {
      this.router.navigate(['/report-module']);
    } else {
      this.router.navigate(['/access-denied']);
    }
  }
  // openAddDialog(): void {
  //   const dialogRef = this.dialog.open(ReportModuleComponent, {
  //     width: '500px', 
  //     data: {report:  this.reportlist} 
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     this.loadreportlist();
  //   });
  // }


  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.reportlist);
    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    XLSX.writeFile(wb, 'exported_data.xlsx');
  }



  filterData(): void {
    if (this.searchText.trim()) {
      const searchTextLower = this.searchText.toLowerCase();
      
      this.reportlist = this.reportlistcopy.filter((report: any) =>
        report.ReportID?.toString().toLowerCase().includes(searchTextLower) ||
        report.ReportName?.toLowerCase().includes(searchTextLower) ||
        report.CustomerName?.toLowerCase().includes(searchTextLower) ||
        report.GroupID?.toString().toLowerCase().includes(searchTextLower) ||  
        report.CreatedBy?.toLowerCase().includes(searchTextLower) ||  
        report.InsertedDate?.toLowerCase().includes(searchTextLower)  
      );
    } else {
      this.reportlist = [...this.reportlistcopy]; 

    }
  }
  goBack() {
    this.router.navigate(['/mainpage']);
  }

  clearsearch(){
    this.searchText ='';
    this.filterData();
  }

  loadreportlist() {
    const params = { spname: this.storedProcedureName }; 
  
    this.http.get<any[]>(this.apiUrl, { params }).subscribe(
      (data) => {
        console.log('Fetched loadreportlist:', data); 
        this.reportlist = data;
        this.reportlistcopy =this.reportlist 
      },
      (error) => {
        console.error('Error fetching loadreportlist:', error);
      }
    );
  }


  // openAddDialog() {
  //   this.router.navigate(['/ReportModule']);
  // }



  
  deleteReport(id: number | null) {
    if (!id) return;

  
    const snackBarRef = this.snackBar.openFromComponent(ConfirmSnackbarComponent, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snackbar-confirm'],
      data: { message: "Are you sure you want to delete this report?" }
    });
  
    snackBarRef.onAction().subscribe(() => {
      // If user clicks "Yes", proceed with deletion
      const requestData = {
        jsonFileparams: JSON.stringify([{ ID: id.toString() }]),
        spname: "[dbo].[sp_Delete_ReportConfig]"
      };
  
      const apiUrl = 'https://semarsconfigapi.azurewebsites.net/api/Service/GENERICSQLEXEC';
  
      this.http.post(apiUrl, requestData, { responseType: 'text' }).subscribe(
        response => {
          console.log("API Response:", response);
          this.loadreportlist();
  
          if (response.trim().toLowerCase() === "success") {
            this.snackBar.open('Report Deleted Successfully', 'OK', {
              duration: 3000,
              panelClass: ['snackbar-success']
            });
          } else {
            this.snackBar.open('Failed to delete report.', 'OK', {
              duration: 3000,
              panelClass: ['snackbar-error']
            });
          }
        },
        error => {
          console.error("API Error:", error);
          this.snackBar.open('Error deleting report.', 'OK', {
            duration: 3000,
            panelClass: ['snackbar-error']
          });
        }
      );
    });
  }
  
}




interface ReportItem  {
  ReportID: string;
  ReportName: string;
  CustomerName: string;
}