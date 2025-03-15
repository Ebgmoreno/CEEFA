import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';




@Component({
  selector: 'app-root',
  standalone: true,
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.css'],
  imports: [RouterModule, RouterOutlet]
})
export class AppComponent {
  title = 'registro-mantenimiento';
}
