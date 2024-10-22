import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipo } from '../models/equipo.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {
  equipo: Equipo | undefined;

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
        this.equipo = equipos.find(e => e.serie === serie); 
      }
    });
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