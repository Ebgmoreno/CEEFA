import { Component, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface Usuario {
  grado: string;
  nombre: string;
  matricula: string;
  rol: string;
  codigo: string;
  contrasena: string;
  usuario: string; // Matrícula como nombre de usuario
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
    codigo: '',
    contrasena: '',
    usuario: '' // Inicialmente vacío, se asignará la matrícula después
  };
  temaOscuro: boolean = false;
  confirmarContrasena: string = '';

  @ViewChild('contenidoModal') contenidoModal!: TemplateRef<any>; 

  constructor(private router: Router, private renderer: Renderer2, private modalService: NgbModal) { }

  registrarUsuario() {
    if (this.usuario.codigo !== '4R3K') {
      this.modalService.open(this.contenidoModal); 
      return; 
    }

    if (this.usuario.contrasena !== this.confirmarContrasena) {
      alert('Las contraseñas no coinciden.');
      return; 
    }

    // Guardar los datos del usuario en localStorage, incluyendo la matrícula como "usuario"
    const usuarios = this.obtenerUsuariosLocalStorage();
    usuarios.push({ ...this.usuario, usuario: this.usuario.matricula }); 
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Redirigir al usuario a la página de inicio de sesión.
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
