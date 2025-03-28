import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MsalModule } from '@azure/msal-angular'; // Ensure MSAL Module is imported correctly
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DataShareService } from './data-share.service';

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
    provideAnimations(),
    importProvidersFrom(
      MatIconModule,
      HttpClientModule,
      DataShareService,
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
    ),
  ],
};
