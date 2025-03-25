

// import { bootstrapApplication } from '@angular/platform-browser';
// import { provideRouter, Routes } from '@angular/router';
// import { AppComponent } from './app/app.component';
// import { SubscriptionComponent } from './app/subscription/subscription.component';
// import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


// const routes: Routes = [
//   { path: '', redirectTo: 'subscription', pathMatch: 'full' }, // Redirect root to subscription
//   { path: 'subscription', component: SubscriptionComponent }
// ];

// bootstrapApplication(AppComponent, {
//   providers: [provideRouter(routes), provideAnimationsAsync()]
// });


import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { LicenceListComponent } from './app/licence-list/licence-list.component';
import { SubscriptionComponent } from './app/subscription/subscription.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const routes: Routes = [
  { path: '', redirectTo: 'licence-list', pathMatch: 'full' }, // ✅ Set Licence List as default
  { path: 'licence-list', component: LicenceListComponent },
  { path: 'subscription', component: SubscriptionComponent }
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideAnimationsAsync()]
});
