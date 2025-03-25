import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router'; // Import Router
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

interface Customer {
  id: number | null;
  name: string;
  email: string;
  phone: string;
  address: string;
}

@Component({
  selector: 'app-customer',
  standalone: true,
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CustomerComponent {
  displayedColumns: string[] = ['id', 'name', 'phone', 'address', 'email', 'actions'];
  customers: Customer[] = [
    { id: 1, name: 'Lulu group', phone: '123-456-7890', address: '123 Street', email: 'john@example.com' },
    { id: 1, name: 'Aws Group', phone: '123-456-7890', address: '123 Street', email: 'john@example.com' },
    { id: 1, name: 'Bestpower', phone: '123-456-7890', address: '123 Street', email: 'john@example.com' },
    { id: 1, name: 'Semars', phone: '123-456-7890', address: '123 Street', email: 'john@example.com' },
    { id: 1, name: 'Makpower', phone: '123-456-7890', address: '123 Street', email: 'john@example.com' },
    { id: 1, name: 'Daco', phone: '123-456-7890', address: '123 Street', email: 'john@example.com' },
    { id: 2, name: 'Smartformulator', phone: '987-654-3210', address: '456 Avenue', email: 'jane@example.com' }
  ];

  constructor(private snackBar: MatSnackBar, private router: Router) {} // Inject Router

  // Redirect to new page instead of adding a row
  openAddDialog() {
    this.router.navigate(['/add-cutomer']); // Redirect to 'add-customer' page
  }

  deleteCustomer(id: number | null) {
    this.customers = this.customers.filter(c => c.id !== id);
    this.snackBar.open('Customer Deleted', 'Close', { duration: 2000 });
  }
}
