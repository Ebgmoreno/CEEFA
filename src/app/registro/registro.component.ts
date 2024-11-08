import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Usuario {
  grado: string;
  nombre: string;
  matricula: string;
  rol: string;
  codigo: string;
}

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  usuario: Usuario = {
    grado: '',
    nombre: '',
    matricula: '',
    rol: 'Administrador',
    codigo: ''
  };
  temaOscuro: boolean = false; 

  constructor(private router: Router, private renderer: Renderer2) {}

  registrarUsuario() {
    if (this.usuario.codigo !== '4R3K') {
      // Mostrar una alerta indicando que el código es incorrecto
      alert('Código incorrecto. Por favor, ingresa el código correcto.'); 
      return; // Detener el proceso de registro
    }
    // 2. Guardar los datos del usuario (puedes usar localStorage o un servicio para enviar los datos a un servidor).
    // Ejemplo de guardar en localStorage:
    const usuarios = this.obtenerUsuariosLocalStorage();
    usuarios.push(this.usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // 3. Redirigir al usuario a la página de inicio de sesión.
    this.router.navigate(['/']); 
  }

  cambiarTema() {
    this.temaOscuro = !this.temaOscuro; 

    if (this.temaOscuro) {
      this.renderer.addClass(document.body, 'dark-mode'); 
    } else {
      this.renderer.removeClass(document.body, 'dark-mode');
    }
  }

  navegarAInicio() {
    this.router.navigate(['/']);
  }

  private obtenerUsuariosLocalStorage(): Usuario[] {
    const usuariosGuardados = localStorage.getItem('usuarios');
    if (usuariosGuardados) {
      return JSON.parse(usuariosGuardados);
    } else {
      return [];
    }
  }
}
