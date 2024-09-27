import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-datos-libro',
  templateUrl: './datos-libro.component.html',
  styleUrl: './datos-libro.component.css'
})
export class DatosLibroComponent {
  constructor (
    private router: Router) {}
    
    navigateToVerLibro() {
      this.router.navigate(['/ver-libro']);
  }
}

