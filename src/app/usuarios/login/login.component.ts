import { Component, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule]
})
export class LoginComponent {
  mostrarError: boolean = false;
  errorUsuario: string = '';
  errorContrasena: string = '';
  errorCredenciales: string = '';
  usuario: string = ''; // <-- Añade esta línea
  contrasena: string = ''; // <-- Añade esta línea
  temaOscuro: boolean = true; // Para controlar el tema


  constructor(private router: Router, private renderer: Renderer2) { } // Inyecta Renderer2

  onSubmit(form: any) {
    console.log(form.value);
    console.log("se ha enviado el formulario"); // <-- Añade esta línea
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
      this.router.navigate(['/formulario']);
    } else {
      this.errorCredenciales = 'Usuario o contraseña incorrectos';
      this.mostrarError = true;
    }
  }

  cambiarTema() {
    this.temaOscuro = !this.temaOscuro; 

    if (this.temaOscuro) {
      this.renderer.addClass(document.body, 'dark-mode'); 
    } else {
      this.renderer.removeClass(document.body, 'dark-mode');
    }
  }
}
