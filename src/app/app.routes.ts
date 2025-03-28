import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MsalModule, MsalService, MsalInterceptor, MsalGuard } from '@azure/msal-angular';
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginComponent } from './login/login.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {CustomerQuestionnaireComponent} from './customer-questionnaire/customer-questionnaire.component'
import {CustomerComponent} from './customer/customer.component'
import {AddCustomerComponent} from './add-cutomer/add-cutomer.component'
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import {LicenceListComponent} from './licence-list/licence-list.component'
import {SubscriptionComponent } from './subscription/subscription.component'
import {CustomerAlertComponent} from './customer-alert/customer-alert.component'

const MSAL_INSTANCE_FACTORY = () => {
  return new PublicClientApplication({
    auth: {
      clientId: 'fba0f710-3dda-4af9-a27a-bd16efc94f92',
      authority: 'https://login.microsoftonline.com/a3a5445b-30d1-41ed-9a80-d8ea75a1639f',
      redirectUri: 'https://localhost:49327/signup'
    }
  });
}

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'mainpage', component: MainPageComponent },
  { path: 'customerquestionnarie', component: CustomerQuestionnaireComponent },
  { path: 'Customer', component: CustomerComponent },
   {path:'add-cutomer',component: AddCustomerComponent },
   {path:'LicenceList',component:LicenceListComponent},
   {path:'subscription',component:SubscriptionComponent},
   {path:'CustomerAlert',component:CustomerAlertComponent}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule,
    MatButtonModule,
    MatTableModule,
    MatSnackBarModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MsalModule.forRoot(
      MSAL_INSTANCE_FACTORY(),
      {
        interactionType: InteractionType.Popup,
        authRequest: {
          scopes: ['user.read']
        }
      },
      {
        interactionType: InteractionType.Popup,
        protectedResourceMap: new Map([
          ['https://graph.microsoft.com/v1.0/me', ['user.read']]
        ])
      }
    ),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    MsalGuard
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }
