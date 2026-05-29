import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// Changed from default to registering HttpClient.
// Allows me to use the .Net backend
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter( 
      routes
    )
  ]

};