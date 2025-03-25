// import { Routes } from '@angular/router';
// import { UserManagementComponent } from './user-management/user-management.component';
// import { SubscriptionComponent } from './subscription/subscription.component';


// export const routes: Routes = [
//   { path: '', redirectTo: '/users', pathMatch: 'full' },
//   { path: 'subscription', component: SubscriptionComponent }
// ];

import { Routes } from '@angular/router';
import { LicenceListComponent } from './licence-list/licence-list.component'; // Import Licence List Component
import { SubscriptionComponent } from './subscription/subscription.component';


export const routes: Routes = [
  { path: '', redirectTo: '/licence-list', pathMatch: 'full' }, // Redirect to Licence List
  { path: 'licence-list', component: LicenceListComponent },
  { path: 'subscription', component: SubscriptionComponent },
  { path: '', redirectTo: '/license-list', pathMatch: 'full' }
];
