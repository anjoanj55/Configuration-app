import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
<<<<<<< HEAD
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MsalModule } from '@azure/msal-angular'; // Ensure MSAL Module is imported correctly
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DataShareService } from './data-share.service';
import { MatDatepickerModule } from '@angular/material/datepicker';  // For Datepicker
import { MatNativeDateModule } from '@angular/material/core';  // Native Date Adapter
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';  // Date Formatting
import { MatCardModule } from '@angular/material/card';  // For Material Card (Optional, if used)
import { MatDialogModule } from '@angular/material/dialog';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';  
=======
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // ✅ Import this module
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';


import { routes } from './app.routes';
>>>>>>> origin/Adarsh

// MSAL instance factory
const MSAL_INSTANCE_FACTORY = () => {
  return new PublicClientApplication({
    auth: {
      clientId: 'fba0f710-3dda-4af9-a27a-bd16efc94f92',
      authority: 'https://login.microsoftonline.com/a3a5445b-30d1-41ed-9a80-d8ea75a1639f',
      redirectUri: 'http://localhost:4200/login'
    }
  });
}

// Application config (for standalone approach)
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
<<<<<<< HEAD
    provideAnimations(),
    importProvidersFrom(
      MatIconModule,
      HttpClientModule,
      DataShareService,
      MatIconModule, 
      MatDialogModule,          
      MatDatepickerModule,     
      MatNativeDateModule,     
      MatCardModule,   
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
      )
    ), provideAnimationsAsync(),
  ],
=======
    importProvidersFrom(
      HttpClientModule, // ✅ Critical for HttpClient to work
      MatButtonModule,
      MatTableModule,
      MatSnackBarModule,
      MatDialogModule,
      MatIconModule,
      MatInputModule,
      MatFormFieldModule,
      FormsModule,
      ReactiveFormsModule,
      MatSelectModule,
      BrowserAnimationsModule
    )
  ]
>>>>>>> origin/Adarsh
};

