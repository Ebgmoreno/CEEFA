import { Component, ChangeDetectorRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
  temaOscuro: boolean = false; // Variable para controlar el tema



  constructor(private cdRef: ChangeDetectorRef, private router: Router, private renderer: Renderer2) {}

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
    // 1. Eliminar la información de la sesión (si la hay)
    // ... (implementa la lógica para eliminar la sesión) ...

    // 2. Redirigir al usuario a la página de login
    this.router.navigate(['/']); 
  }

  onSubmit() {
    // 1. Obtén los datos del formulario
    const datosFormulario = {
      nombreEntrega: this.nombreEntrega,
      unidadEntrega: this.unidadEntrega,
      serie: this.serie,
      descripcion: this.descripcion,
      fechaMinistracion: this.fechaMinistracion,
      nombreRecibe: this.nombreRecibe,
      fechaRecepcion: this.fechaRecepcion,
      // ... (obtén los valores de los demás campos, incluyendo la prioridad)
    };
  
    // 2. Guarda los datos en localStorage
    localStorage.setItem('datosFormulario', JSON.stringify(datosFormulario));
  
    // 3. (Opcional) Limpia el formulario
    this.limpiarFormulario();
  
   
    // 4. (Opcional) Muestra un mensaje de éxito
    // ...
  }

  


  test() {
    console.log("Se hizo clic en el botón Equipos Registrados");
  }
}


