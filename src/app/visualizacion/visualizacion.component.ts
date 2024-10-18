import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

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
}