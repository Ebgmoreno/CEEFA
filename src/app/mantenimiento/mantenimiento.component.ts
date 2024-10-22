import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mantenimiento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.css']
})
export class MantenimientoComponent {

  constructor(
    private router: Router,
    private renderer: Renderer2
  ) { }

  navegarAFormulario() {
    this.router.navigate(['/formulario']);
  }

  navegarAVisualizacion() {
    this.router.navigate(['/visualizacion']);
  }

  cambiarTema() {
    const temaOscuro = localStorage.getItem('temaOscuro') === 'true';
    localStorage.setItem('temaOscuro', (!temaOscuro).toString());

    if (!temaOscuro) {
      this.renderer.addClass(document.body, 'dark-mode');
    } else {
      this.renderer.removeClass(document.body, 'dark-mode');
    }
  }

  cerrarSesion() {
    this.router.navigate(['/']);
  }
}
