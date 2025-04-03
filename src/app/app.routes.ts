

import { Routes } from '@angular/router';
import { LicenceListComponent } from './licence-list/licence-list.component'; 
import { SubscriptionComponent } from './subscription/subscription.component';


export const routes: Routes = [
  { path: '', redirectTo: '/licence-list', pathMatch: 'full' }, 
  { path: 'licence-list', component: LicenceListComponent },
  { path: 'subscription', component: SubscriptionComponent },
  { path: '', redirectTo: '/license-list', pathMatch: 'full' }
];
