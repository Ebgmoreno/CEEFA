import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router'; 


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
    private renderer: Renderer2,
    private route: ActivatedRoute // Inyecta ActivatedRoute
  ) { }

  navegarADetalles() {
    // Obtener la serie del equipo de la URL actual
    const serie = this.route.snapshot.paramMap.get('serie'); 
  
    if (serie) {
      this.router.navigate(['/detalles', serie]);
    } else {
      // Manejar el caso en que no se encuentre la serie en la URL
      console.error("No se pudo obtener la serie del equipo.");
      // Puedes redirigir a otra página o mostrar un mensaje de error
    }
  }

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
