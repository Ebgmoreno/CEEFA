import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './app/home/home.component';
import { FormularioEquipoComponent } from './app/formulario-equipo/formulario-equipo.component';
import { LoginComponent } from './app/usuarios/login/login.component'; // Asegúrate de importar LoginComponent

const routes = [
  { path: 'home', component: HomeComponent },
  { path: 'formulario', component: FormularioEquipoComponent },
  { path: '', component: LoginComponent } // Ruta para el login
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
}).catch(err => console.error(err));