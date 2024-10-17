import { Component } from '@angular/core';
import { LoginComponent } from './usuarios/login/login.component';
import { HomeComponent } from './home/home.component';
import { RouterOutlet } from '@angular/router';
import { FormularioEquipoComponent } from './formulario-equipo/formulario-equipo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.css'],
  imports: [LoginComponent, HomeComponent, RouterOutlet, FormularioEquipoComponent]
})
export class AppComponent {
  title = 'registro-mantenimiento';
}
