import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule] // Añade CommonModule aquí
})
export class LoginComponent {
  mostrarError: boolean = false;
  errorUsuario: string = '';
  errorContrasena: string = '';
  errorCredenciales: string = '';

  onSubmit(form: any) {
    this.mostrarError = false;
    this.errorUsuario = '';
    this.errorContrasena = '';
    this.errorCredenciales = '';

    const usuario = form.value.usuario;
    const contrasena = form.value.contrasena;

    if (!usuario) {
      this.errorUsuario = 'Por favor ingrese su usuario';
      this.mostrarError = true;
      return;
    }

    if (!contrasena) {
      this.errorContrasena = 'Por favor ingrese su contraseña';
      this.mostrarError = true;
      return;
    }

    if (usuario === 'D1992428' && contrasena === 'Moreno21') {
      console.log('Inicio de sesión exitoso');
    } else {
      this.errorCredenciales = 'Usuario o contraseña incorrectos';
      this.mostrarError = true;
    }
  }
}
