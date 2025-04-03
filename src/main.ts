

// import { bootstrapApplication } from '@angular/platform-browser';
// import { provideRouter, Routes } from '@angular/router';
// import { AppComponent } from './app/app.component';
// import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// import { provideHttpClient, withFetch } from '@angular/common/http';
// import { HttpClientModule } from '@angular/common/http';

// import { importProvidersFrom } from '@angular/core';
// import { LicenceListComponent } from './app/licence-list/licence-list.component';
// import { SubscriptionComponent } from './app/subscription/subscription.component';

// const routes: Routes = [
//   { path: '', redirectTo: 'licence-list', pathMatch: 'full' }, 
//   { path: 'licence-list', component: LicenceListComponent },
//   { path: 'subscription', component: SubscriptionComponent }
// ];

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideRouter(routes), 
//     provideAnimationsAsync(), 
//     provideHttpClient(withFetch()),
//     importProvidersFrom(LicenceListComponent, SubscriptionComponent) 
//   ]
// });

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
 
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
 