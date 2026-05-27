import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

// Changed from default to registering HttpClient.
// Allows me to use the .Net backend
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient()
  ]
};