import { Routes } from '@angular/router';
import { FormularioEquipoComponent } from './formulario-equipo/formulario-equipo.component';
import { VisualizacionComponent } from './visualizacion/visualizacion.component';
import { DetallesComponent } from './detalles/detalles.component'; // Importa DetallesComponent

export const routes: Routes = [
  { path: 'formulario', component: FormularioEquipoComponent },
  { path: 'visualizacion', component: VisualizacionComponent },
  { path: 'detalles/:serie', component: DetallesComponent } // Define la ruta para detalles
];
