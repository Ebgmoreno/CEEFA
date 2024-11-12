import { Router } from '@angular/router';
import { Component, ChangeDetectorRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms'; // Importa NgForm
import { Equipo } from '../models/equipo.model';
import { formatDate } from '@angular/common';

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
  nombreRecibe: string = '';
  fechaRecepcion: string = '';
  prioridad: string = 'Ordinario'; 
  estado: string = 'Almacén'; // Inicializa la propiedad estado con 'Almacén'
  observaciones: string = '';
  reparadoPor: string = '';
  anotaciones: string = '';
  datos: string = '';
  temaOscuro: boolean = false; 
  fechaActual: string = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');

  constructor(
    private cdRef: ChangeDetectorRef, 
    private router: Router, 
    private renderer: Renderer2
  ) {}

  navegarAVisualizacion() {
    this.router.navigate(['/visualizacion']);
  }

  onSubmit(equipoForm: NgForm) { // Recibe el formulario como argumento
    if (equipoForm.valid) { // Verifica si el formulario es válido
      const datosFormulario: Equipo = { 
        nombreEntrega: this.nombreEntrega,
        unidadEntrega: this.unidadEntrega,
        serie: this.serie,
        descripcion: this.descripcion,
        nombreRecibe: this.nombreRecibe,
        fechaRecepcion: this.fechaRecepcion,
        prioridad: this.prioridad,
        estado: this.estado,
        observaciones: this.observaciones,
        reparadoPor: this.reparadoPor,
        anotaciones: this.anotaciones,
        datos: this.datos
      };

      try {
        // 1. Obtener los datos existentes del localStorage
        let equipos: Equipo[] = [];
        const datosGuardados = localStorage.getItem('equipos'); 
        if (datosGuardados) {
          equipos = JSON.parse(datosGuardados);
        }

        // 2. Agregar el nuevo equipo al array
        equipos.push(datosFormulario);

        // 3. Guardar el array actualizado en el localStorage
        localStorage.setItem('equipos', JSON.stringify(equipos));

        // Mostrar un mensaje de éxito (puedes usar una alerta o un snackbar)
        console.log("Equipo guardado correctamente.");
      } catch (error) {
        console.error("Error al guardar el equipo:", error);
      }

      this.limpiarFormulario();
    } else {
      // Mostrar un mensaje de error o realizar alguna acción si el formulario no es válido
      console.log("Por favor, llena todos los campos obligatorios.");
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

  limpiarFormulario() {
    this.nombreEntrega = '';
    this.unidadEntrega = '';
    this.serie = '';
    this.descripcion = '';
    this.nombreRecibe = '';
    this.fechaRecepcion = '';
    this.cdRef.detectChanges();
  }

  cerrarSesion() {
    this.router.navigate(['/']); 
  }
}