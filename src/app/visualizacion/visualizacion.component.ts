import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Equipo } from '../models/equipo.model';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-visualizacion',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbPaginationModule],
  templateUrl: './visualizacion.component.html',
  styleUrls: ['./visualizacion.component.css']
})
export class VisualizacionComponent implements OnInit {
  equipos: Equipo[] = [];

  page = 1;
  pageSize = 5;
  collectionSize = 0;

  temaOscuro: boolean = false;
  textoBusqueda: string = '';
  constructor(
    private router: Router,
    private renderer: Renderer2
  ) {}

  verDetalles(serie: string) {
    this.router.navigate(['/detalles', serie]);
  }

  navegarAFormulario() {
    this.router.navigate(['/formulario']);
  }

  ngOnInit() {
    const datosGuardados = localStorage.getItem('equipos'); 

    if (datosGuardados) {
      try {
        this.equipos = JSON.parse(datosGuardados); 
      } catch (error) {
        console.error("Error al analizar los datos de localStorage:", error);
      }
    } else {
      console.warn("No se encontraron datos de equipos en localStorage.");
    }

    this.collectionSize = this.equipos.length; 
  }

  buscarEquipo() {
    const datosGuardados = localStorage.getItem('equipos');
    if (datosGuardados) {
      try {
        this.equipos = JSON.parse(datosGuardados);
      } catch (error) {
        console.error("Error al analizar los datos de localStorage:", error);
        return; 
      }
    } else {
      console.warn("No se encontraron datos de equipos en localStorage.");
      return; 
    }

    if (this.textoBusqueda) {
      const textoBusquedaLower = this.textoBusqueda.toLowerCase();
      this.equipos = this.equipos.filter(equipo => {
        return equipo.nombreEntrega.toLowerCase().includes(textoBusquedaLower) ||
               equipo.unidadEntrega.toLowerCase().includes(textoBusquedaLower) ||
               equipo.serie.toLowerCase().includes(textoBusquedaLower) ||
               equipo.descripcion.toLowerCase().includes(textoBusquedaLower);
      });
    }

    this.collectionSize = this.equipos.length; // Actualiza collectionSize después de filtrar
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

  get equiposPaginados(): Equipo[] { 
    return this.equipos
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
}