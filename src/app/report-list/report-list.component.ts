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
  displayedColumns: string[] = ['ReportID','ReportName', 'CustomerName','actions'];
  apiUrl = 'https://localhost:44320/api/Service/SQLLOADEXEC'; 
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
  editreport(reportData:any=[]){
    const dialogRef = this.dialog.open(ReportModuleComponent, {
      width: '500px', 
      data: { action: 'edit', report: reportData } 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loadreportlist();
    });
  }

  openReportDialog(): void {
    const dialogRef = this.dialog.open(ReportModuleComponent, {
      width: '500px', 
      data: {report:  this.reportlist} 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loadreportlist();
    });
  }

  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.reportlist);
    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    XLSX.writeFile(wb, 'exported_data.xlsx');
  }


  filterData():void {
    if (this.searchText) {
      this.reportlist = this.reportlist.filter((report: ReportItem) =>
        report.ReportName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        report.CustomerName.toLowerCase().includes(this.searchText.toLowerCase())||
        report.ReportID.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } 
    
    else {
      this.reportlist = this.reportlistcopy;
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

  openAddDialog() {
    this.router.navigate(['/ReportModule']);
  }


  
  deleteReport(id: number | null) {
    if (!id) return;

    const requestData = {
        jsonFileparams: JSON.stringify([{ ID: id.toString() }]),
        spname: "[dbo].[sp_Delete_ReportConfig]"
    };

    const apiUrl = 'https://localhost:44320/api/Service/GENERICSQLEXEC';

    this.http.post(apiUrl, requestData, { responseType: 'text' }).subscribe(
        response => {
            console.log("API Response:", response);
            this.loadreportlist();

            if (response.trim().toLowerCase() === "success") {
                alert('Report Deleted Successfully'); 
                //this.Report = this.Report.filter(c => c.CustID !== id);
            } else {
                alert('Failed to delete Report.'); 
            }
        },
        error => {
            console.error("API Error:", error);
            alert('Error deleting Report.'); 
        }
    );
}
}


interface ReportItem  {
  ReportID: string;
  ReportName: string;
  CustomerName: string;
}