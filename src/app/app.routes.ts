import { Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { AddCustomerComponent } from './add-cutomer/add-cutomer.component';

export const routes: Routes = [
    { path: '', redirectTo: 'customers', pathMatch: 'full' }, 
    { path: 'customers', component: CustomerComponent },
    { path: 'add-cutomer', component: AddCustomerComponent }
  ];
