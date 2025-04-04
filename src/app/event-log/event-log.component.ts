import { Component ,OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ Import this
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-event-log',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule],
  templateUrl: './event-log.component.html',
  styleUrl: './event-log.component.css'
})
export class EventLogComponent {
 searchText: string = '';
 eventlogs: any[] = [];
 count:any;
  displayedColumns: string[] = ['EventID','EventType','EventDate','EventDetails',];
  apiUrl = 'https://semarsconfigapi.azurewebsites.net/api/Service/SQLLOADEXEC'; 
  storedProcedureName = '[dbo].[sp_select_EventLogs]'; 

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadeventlog();
  }

  loadeventlog() {
    const params = { spname: this.storedProcedureName }; 
  
    this.http.get<any[]>(this.apiUrl, { params }).subscribe(
      (data) => {
        console.log('Fetched loadeventlog:', data); 
        this.eventlogs = data;
      },
      (error) => {
        console.error('Error fetching loadeventlog:', error);
      }
    );
  }

  filterData(): void {
    if (this.searchText) {
      const searchTextLower = this.searchText.toLowerCase();
      this.eventlogs = this.eventlogs.filter(event =>
        event.EventID.toString().toLowerCase().includes(searchTextLower) ||
        event.EventType.toLowerCase().includes(searchTextLower) ||
        event.EventDate.toLowerCase().includes(searchTextLower) ||
        event.EventDetails.toLowerCase().includes(searchTextLower)
      );
    } else {
      this.loadeventlog(); // Reload original data if search is cleared
    }
  }
  goBack() {
    this.router.navigate(['/mainpage']);
  }

  clearsearch(){
    this.searchText ='';
    this.filterData();
  }
  

  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.eventlogs);
    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    XLSX.writeFile(wb, 'exported_data.xlsx');
  }

}
