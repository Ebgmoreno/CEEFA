import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Equipo } from '../models/equipo.model';


@Component({
  selector: 'app-visualizacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './visualizacion.component.html',
  styleUrls: ['./visualizacion.component.css']
})
export class VisualizacionComponent implements OnInit {
  equipos: Equipo[] = []; // Declara equipos como un array de Equipo

  temaOscuro: boolean = false;

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