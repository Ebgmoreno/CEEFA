import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Equipo } from '../models/equipo.model';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-visualizacion',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbPaginationModule],
  templateUrl: './visualizacion.component.html',
  styleUrls: ['./visualizacion.component.css']
})
export class VisualizacionComponent implements OnInit {
  equipos: Equipo[] = [];
  equiposFiltrados: Equipo[] = []; 

  page = 1;
  pageSize = 9;
  collectionSize = 0;

  temaOscuro: boolean = false;
  textoBusqueda: string = '';

  filtro: {
    nombreEntrega: string;
    unidadEntrega: string;
    prioridad: string;
    descripcion: string;
    fechaRecepcion: string;
    estado: string;
    fechaInicio: string;
    fechaFin: string;
  } = {
    nombreEntrega: '',
    unidadEntrega: '',
    prioridad: '',
    descripcion: '',
    fechaRecepcion: '',
    estado: '',
    fechaInicio: '',
    fechaFin: ''
  };

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
        this.equiposFiltrados = this.equipos; 
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
      this.equiposFiltrados = this.equipos.filter(equipo => {
        return equipo.nombreEntrega.toLowerCase().includes(textoBusquedaLower) ||
                equipo.unidadEntrega.toLowerCase().includes(textoBusquedaLower) ||
                equipo.serie.toLowerCase().includes(textoBusquedaLower) ||
                equipo.descripcion.toLowerCase().includes(textoBusquedaLower) ||
                equipo.nombreRecibe.toLowerCase().includes(textoBusquedaLower) ||
                equipo.fechaRecepcion.toLowerCase().includes(textoBusquedaLower) ||
                equipo.prioridad.toLowerCase().includes(textoBusquedaLower) ||
                equipo.estado.toLowerCase().includes(textoBusquedaLower); 
      });
    } else {
      this.equiposFiltrados = this.equipos; 
    }
  
    this.collectionSize = this.equiposFiltrados.length; 
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

  aplicarFiltro() {
    if (this.filtro.fechaInicio && this.filtro.fechaFin && this.filtro.fechaInicio > this.filtro.fechaFin) {
      console.error("La fecha de inicio no puede ser posterior a la fecha de fin.");
      return;
    }

    this.equiposFiltrados = this.equipos.filter(equipo => {
      const coincideNombre = !this.filtro.nombreEntrega || equipo.nombreEntrega.toLowerCase().includes(this.filtro.nombreEntrega.toLowerCase());
      const coincideUnidad = !this.filtro.unidadEntrega || equipo.unidadEntrega.toLowerCase().includes(this.filtro.unidadEntrega.toLowerCase());
      const coincidePrioridad = !this.filtro.prioridad || equipo.prioridad === this.filtro.prioridad;
      const coincideDescripcion = !this.filtro.descripcion || equipo.descripcion.toLowerCase().includes(this.filtro.descripcion.toLowerCase());
      const coincideFechaRecepcion = !this.filtro.fechaRecepcion || equipo.fechaRecepcion === this.filtro.fechaRecepcion;
      const coincideEstado = !this.filtro.estado || equipo.estado === this.filtro.estado;

      const coincideFechaInicio = !this.filtro.fechaInicio || equipo.fechaRecepcion >= this.filtro.fechaInicio;
      const coincideFechaFin = !this.filtro.fechaFin || equipo.fechaRecepcion <= this.filtro.fechaFin;
    
      return coincideNombre && coincideUnidad && coincidePrioridad && coincideDescripcion && coincideFechaRecepcion && coincideEstado && coincideFechaInicio && coincideFechaFin;
    });
  
    this.collectionSize = this.equiposFiltrados.length; 
    this.page = 1; 
  }

  get equiposPaginados(): Equipo[] { 
    return this.equiposFiltrados
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  exportarExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.equiposFiltrados); 
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Equipos');
  
    XLSX.writeFile(wb, 'equipos.xlsx');
  }

  calcularDiasDiferencia(fechaRecepcion: string): number {
    const fechaInicio = new Date(fechaRecepcion);
    const fechaActual = new Date();
    const diferenciaEnMilisegundos = Math.abs(fechaActual.getTime() - fechaInicio.getTime());
    const diferenciaEnDias = Math.ceil(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));
    return diferenciaEnDias;
  }
}
