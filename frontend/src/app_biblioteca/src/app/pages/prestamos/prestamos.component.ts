import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrl: './prestamos.component.css'
})
export class PrestamosComponent {
    constructor (
        private router: Router
    ) {}

    navigateToAgregarPrestamo() {
        this.router.navigate(['prestamo/0/agregar']);
    }
}
