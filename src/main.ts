import { bootstrapApplication } from '@angular/platform-browser';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { appConfig } from './app/app.config';
import { App } from './app/app';


GoogleAuth.initialize({
  clientId: '394870904623-c2alhq89rj8r10r5402t5ksk72n440oi.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
  grantOfflineAccess: true,
});


bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
