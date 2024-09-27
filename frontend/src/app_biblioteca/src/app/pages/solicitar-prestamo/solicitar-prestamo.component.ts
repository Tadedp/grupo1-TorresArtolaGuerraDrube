import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitar-prestamo',
  templateUrl: './solicitar-prestamo.component.html',
  styleUrl: './solicitar-prestamo.component.css'
})
export class SolicitarPrestamoComponent {
  constructor (
    private router: Router) {}

  navigateToVerLibro() {
    this.router.navigate(['/ver-libro']);
  }

}
