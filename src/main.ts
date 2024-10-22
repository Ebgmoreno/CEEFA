import { provideRouter, Routes } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/home/home.component';
import { FormularioEquipoComponent } from './app/formulario-equipo/formulario-equipo.component';
import { LoginComponent } from './app/usuarios/login/login.component';
import { VisualizacionComponent } from './app/visualizacion/visualizacion.component';
import { DetallesComponent } from './app/detalles/detalles.component'; // Asegúrate de importar el componente
import { MantenimientoComponent } from './app/mantenimiento/mantenimiento.component'; // Importa el componente MantenimientoComponent



const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'formulario', component: FormularioEquipoComponent },
  { path: '', component: LoginComponent },
  { path: 'visualizacion', component: VisualizacionComponent },
  { path: 'detalles/:serie', component: DetallesComponent }, // Agrega la ruta para DetallesComponent
  { path: 'mantenimiento/:serie', component: MantenimientoComponent } // Agrega la ruta para MantenimientoComponent
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)], 

})
.catch(err => console.error(err));