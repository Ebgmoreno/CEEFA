import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  equipos: Equipo[] = [];

  ngOnInit() {
    const datosGuardados = localStorage.getItem('datosFormulario');

    if (datosGuardados) {
      try {
        const datosEquipos: Equipo[] = JSON.parse(datosGuardados);
        this.equipos = datosEquipos;
      } catch (error) {
        console.error("Error al analizar los datos de localStorage:", error);
      }
    } else {
      console.warn("No se encontraron datos de equipos en localStorage.");
    }
  }
}
