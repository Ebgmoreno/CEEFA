import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router';
import { HomeComponent } from './app/home/home.component';
import { FormularioEquipoComponent } from './app/formulario-equipo/formulario-equipo.component';
import { LoginComponent } from './app/usuarios/login/login.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'formulario', component: FormularioEquipoComponent },
  { path: '', component: LoginComponent },

];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)], 
}).catch(err => console.error(err));
