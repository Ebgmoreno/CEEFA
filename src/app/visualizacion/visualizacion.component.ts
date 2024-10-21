import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Equipo } from '../models/equipo.model';
import { FormsModule } from '@angular/forms'; // Importa FormsModule



@Component({
  selector: 'app-visualizacion',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './visualizacion.component.html',
  styleUrls: ['./visualizacion.component.css']
})
export class VisualizacionComponent implements OnInit {
  equipos: Equipo[] = []; // Declara equipos como un array de Equipo

  temaOscuro: boolean = false;
  textoBusqueda: string = '';
  constructor(
    private router: Router,
    private renderer: Renderer2
  ) {}

  navegarAFormulario() {
    this.router.navigate(['/formulario']);
  }

  ngOnInit() {
    const datosGuardados = localStorage.getItem('equipos'); // Lee la información de la clave "equipos"

    if (datosGuardados) {
      try {
        this.equipos = JSON.parse(datosGuardados); // Parsea los datos y los asigna al array equipos
      } catch (error) {
        console.error("Error al analizar los datos de localStorage:", error);
      }
    } else {
      console.warn("No se encontraron datos de equipos en localStorage.");
    }
  }

  buscarEquipo() {
    // 1. Obtener los equipos del localStorage
    const datosGuardados = localStorage.getItem('equipos');
    if (datosGuardados) {
      try {
        this.equipos = JSON.parse(datosGuardados);
      } catch (error) {
        console.error("Error al analizar los datos de localStorage:", error);
        return; // Salir de la función si hay un error
      }
    } else {
      console.warn("No se encontraron datos de equipos en localStorage.");
      return; // Salir de la función si no hay datos
    }

    // 2. Filtrar los equipos
    if (this.textoBusqueda) {
      const textoBusquedaLower = this.textoBusqueda.toLowerCase();
      this.equipos = this.equipos.filter(equipo => {
        return equipo.nombreEntrega.toLowerCase().includes(textoBusquedaLower) ||
               equipo.unidadEntrega.toLowerCase().includes(textoBusquedaLower) ||
               equipo.serie.toLowerCase().includes(textoBusquedaLower) ||
               equipo.descripcion.toLowerCase().includes(textoBusquedaLower);
      });
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