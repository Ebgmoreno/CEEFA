import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Equipo { // Define la interfaz para los datos del equipo
  nombreEntrega: string;
  unidadEntrega: string;
  serie: string;
  descripcion: string;
  fechaMinistracion: string;
  nombreRecibe: string;
  fechaRecepcion: string;
  prioridad: string;
}

@Component({
  selector: 'app-equipos-registrados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './equipos-registrados.component.html',
  styleUrls: ['./equipos-registrados.component.css']
})
export class EquiposRegistradosComponent {
  equipos: Equipo[] = []; // Inicializa el array de equipos

  // ... (Aquí puedes obtener los datos de los equipos de un servicio o del almacenamiento local)

  verDetalles(equipo: Equipo) {
    // Implementa la lógica para navegar a la página de detalles del equipo
    console.log("Ver detalles del equipo:", equipo);
  }
}
