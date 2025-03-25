<<<<<<< HEAD
// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { SubscriptionComponent } from './app/subscription/subscription.component';

const routes: Routes = [
  { path: '', redirectTo: 'subscription', pathMatch: 'full' },
  { path: 'subscription', component: SubscriptionComponent }
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)]
});
=======
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { UserManagementComponent } from './app/user-management/user-management.component';

const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UserManagementComponent }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations()
  ]
}).catch(err => console.error(err));
>>>>>>> e4acf35ade08c95fb0b9cbd8e90915f829111cd8
