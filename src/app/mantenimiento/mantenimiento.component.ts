import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipo } from '../models/equipo.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mantenimiento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.css']
})

export class MantenimientoComponent implements OnInit {
  equipo: Equipo = { // Inicializar con valores por defecto
    nombreEntrega: '',
    unidadEntrega: '',
    serie: '',
    descripcion: '',
    fechaMinistracion: '',
    nombreRecibe: '',
    fechaRecepcion: '',
    prioridad: '',
    estado: '',
    observaciones: '',
    reparadoPor: '',
    anotaciones: '',
    datos: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const serie = params['serie'];
      const equiposGuardados = localStorage.getItem('equipos');
      if (equiposGuardados) {
        const equipos: Equipo[] = JSON.parse(equiposGuardados);
        const equipoEncontrado = equipos.find(e => e.serie === serie);

        if (equipoEncontrado) {
          this.equipo = equipoEncontrado;
        } else {
          console.error("No se encontró el equipo con la serie:", serie);
        }
      }
    });
  }

  navegarADetalles() {
    const serie = this.route.snapshot.paramMap.get('serie');

    if (serie) {
      this.router.navigate(['/detalles', serie]);
    } else {
      console.error("No se pudo obtener la serie del equipo.");
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

  guardarCambios() {
    const equiposGuardados = localStorage.getItem('equipos');
    if (equiposGuardados) {
      let equipos: Equipo[] = JSON.parse(equiposGuardados);

      // Actualizar el equipo usando map()
      equipos = equipos.map(e => 
        e.serie === this.equipo.serie ? this.equipo : e
      );

      localStorage.setItem('equipos', JSON.stringify(equipos));
      this.router.navigate(['/detalles', this.equipo.serie]);
    }
  }
}



