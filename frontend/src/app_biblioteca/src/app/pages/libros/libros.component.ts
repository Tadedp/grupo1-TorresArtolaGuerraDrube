import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrl: './libros.component.css'
})
export class LibrosComponent {
    constructor (
        private router: Router
    ) {}

    navigateToAgregarLibro() {
        this.router.navigate(['libro/0/agregar']);
    }
}
