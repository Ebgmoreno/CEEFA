import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

interface Equipo {
  nombreEntrega: string;
  unidadEntrega: string;
  serie: string;
  descripcion: string;
  fechaMinistracion: string;
  nombreRecibe: string;
  fechaRecepcion: string;
}

@Component({
  selector: 'app-visualizacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './visualizacion.component.html',
  styleUrls: ['./visualizacion.component.css']
})
export class VisualizacionComponent implements OnInit {
  equipo: Equipo = { // Inicializamos con un objeto vacío
    nombreEntrega: '',
    unidadEntrega: '',
    serie: '',
    descripcion: '',
    fechaMinistracion: '',
    nombreRecibe: '',
    fechaRecepcion: ''
  };
  
  temaOscuro: boolean = false;

  constructor(
    private router: Router, 
    private renderer: Renderer2
  ) {}

  navegarAFormulario() {
    this.router.navigate(['/formulario']);
  }

  ngOnInit() {
    const datosGuardados = localStorage.getItem('datosFormulario');
  
    if (datosGuardados) {
      try {
        const datosEquipo: Equipo = JSON.parse(datosGuardados); // Cambiamos de Equipo[] a Equipo
        this.equipo = datosEquipo; // Asignamos el objeto a this.equipo
      } catch (error) {
        console.error("Error al analizar los datos de localStorage:", error);
      }
    } else {
      console.warn("No se encontraron datos de equipos en localStorage.");
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

  cerrarSesion() {
    this.router.navigate(['/']);
  }
}