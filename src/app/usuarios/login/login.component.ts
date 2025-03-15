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
  usuario: string = '';
  contrasena: string = '';
  temaOscuro: boolean = true;
  recordarme: boolean = false; // Variable para la casilla "Recuérdame"

  constructor(private router: Router, private renderer: Renderer2) { }

  navegarARegistro(event: Event) {
    event.preventDefault();
    this.router.navigate(['/registro']);
  }

  ngOnInit() {
    // Cargar usuario y contraseña si están guardados en localStorage
    this.usuario = localStorage.getItem('usuario') || '';
    this.contrasena = localStorage.getItem('contrasena') || '';
  }

  onSubmit(form: any) {
    console.log(form.value);
    console.log("se ha enviado el formulario");
    this.mostrarError = false;
    this.errorUsuario = '';
    this.errorContrasena = '';
    this.errorCredenciales = '';

    const usuario = form.value.usuario; // Matrícula ingresada
    const contrasena = form.value.contrasena;

    const usuarios = this.obtenerUsuariosLocalStorage();
    const usuarioEncontrado = usuarios.find(u => u.usuario === usuario && u.contrasena === contrasena);

    if (usuarioEncontrado) {
      console.log('Inicio de sesión exitoso');

      // Guardar la información del usuario actual en localStorage
      const usuarioActual = {
        nombre: usuarioEncontrado.nombre,
        fecha: new Date()
      };
      localStorage.setItem('ultimoUsuario', JSON.stringify(usuarioActual));

      // Guardar usuario y contraseña si "recordarme" está marcado
      if (this.recordarme) {
        localStorage.setItem('usuario', this.usuario);
        localStorage.setItem('contrasena', this.contrasena);
      }

      this.router.navigate(['/formulario']);
    } else {
      this.errorCredenciales = 'Usuario o contraseña incorrectos';
      this.mostrarError = true;
    }
  }

  private obtenerUsuariosLocalStorage(): any[] {
    const usuariosGuardados = localStorage.getItem('usuarios');
    if (usuariosGuardados) {
      return JSON.parse(usuariosGuardados);
    } else {
      return [];
    }
  }
}
