import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
<<<<<<< HEAD
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync()]
};
=======
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations()
  ]
};
>>>>>>> e4acf35ade08c95fb0b9cbd8e90915f829111cd8
