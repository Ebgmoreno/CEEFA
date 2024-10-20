import { Router } from '@angular/router';
import { Component, ChangeDetectorRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Equipo } from '../models/equipo.model';

@Component({
  selector: 'app-formulario-equipo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario-equipo.component.html',
  styleUrls: ['./formulario-equipo.component.css']
})
export class FormularioEquipoComponent {

  nombreEntrega: string = '';
  unidadEntrega: string = '';
  serie: string = '';
  descripcion: string = '';
  fechaMinistracion: string = '';
  nombreRecibe: string = '';
  fechaRecepcion: string = '';
  prioridad: string = 'Ordinario'; 
  temaOscuro: boolean = false; 

  constructor(
    private cdRef: ChangeDetectorRef, 
    private router: Router, 
    private renderer: Renderer2
  ) {}

  navegarAVisualizacion() {
    this.router.navigate(['/visualizacion']);
  }

  onSubmit() {
    const datosFormulario = {
      nombreEntrega: this.nombreEntrega,
      unidadEntrega: this.unidadEntrega,
      serie: this.serie,
      descripcion: this.descripcion,
      fechaMinistracion: this.fechaMinistracion,
      nombreRecibe: this.nombreRecibe,
      fechaRecepcion: this.fechaRecepcion,
      prioridad: this.prioridad 
    };
  
    // 1. Obtener los datos existentes del localStorage
    let equipos: Equipo[] = [];
    const datosGuardados = localStorage.getItem('equipos'); // Cambiamos la clave a 'equipos'
    if (datosGuardados) {
      equipos = JSON.parse(datosGuardados);
    }

    // 2. Agregar el nuevo equipo al array
    equipos.push(datosFormulario);

    // 3. Guardar el array actualizado en el localStorage
    localStorage.setItem('equipos', JSON.stringify(equipos));
  
    this.limpiarFormulario();
  }

  cambiarTema() {
    this.temaOscuro = !this.temaOscuro; 

    if (this.temaOscuro) {
      this.renderer.addClass(document.body, 'dark-mode'); 
    } else {
      this.renderer.removeClass(document.body, 'dark-mode');
    }
  }

  limpiarFormulario() {
    this.nombreEntrega = '';
    this.unidadEntrega = '';
    this.serie = '';
    this.descripcion = '';
    this.fechaMinistracion = '';
    this.nombreRecibe = '';
    this.fechaRecepcion = '';

    this.cdRef.detectChanges();
  }

  cerrarSesion() {
    this.router.navigate(['/']); 
  }
}


