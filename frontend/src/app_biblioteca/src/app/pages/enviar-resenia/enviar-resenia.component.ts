import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enviar-resenia',
  templateUrl: './enviar-resenia.component.html',
  styleUrl: './enviar-resenia.component.css'
})
export class EnviarReseniaComponent {
  constructor (
    private router: Router) {}

  navigateToVerLibro() {
    this.router.navigate(['/ver-libro']);
  }

}


