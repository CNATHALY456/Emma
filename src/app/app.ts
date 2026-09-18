import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CicloComponent } from './ciclo/ciclo';
import { CalendarioComponent } from './calendario/calendario';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CicloComponent,
    CalendarioComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
