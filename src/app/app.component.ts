import { Component } from '@angular/core';
import { LoginComponent } from './usuarios/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: '<app-login></app-login>', // <-- Añade esta línea
  styleUrls: ['./app.component.css'],
  imports: [LoginComponent]
})
export class AppComponent {
  title = 'registro-mantenimiento';
}
