import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Equipo } from '../models/equipo.model';
import { CommonModule } from '@angular/common'; // Importa CommonModule


@Component({
  selector: 'app-detalles',
  standalone: true,
  imports: [CommonModule], // Asegúrate de importar CommonModule
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})

export class DetallesComponent implements OnInit {
  equipo: Equipo | undefined;

  constructor(private route: ActivatedRoute) { }


  ngOnInit() {
    this.route.params.subscribe(params => {
      const serie = params['serie']; 
      // Obtener el equipo del localStorage usando la serie como clave
      const equiposGuardados = localStorage.getItem('equipos');
      if (equiposGuardados) {
        const equipos: Equipo[] = JSON.parse(equiposGuardados);
        this.equipo = equipos.find(e => e.serie === serie);
      }
    });
  }

}