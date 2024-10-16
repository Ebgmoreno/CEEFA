import { bootstrapApplication } from '@angular/platform-browser';
import { LoginComponent } from './app/usuarios/login/login.component';

bootstrapApplication(LoginComponent, {
  providers: [],
}).catch(err => console.error(err));
