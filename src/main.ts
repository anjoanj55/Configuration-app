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
