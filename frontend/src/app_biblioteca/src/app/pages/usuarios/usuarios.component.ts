import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
    constructor (
        private router: Router
    ) {}

    navigateToAgregarUsuario() {
        this.router.navigate(['usuario/0/agregar']);
    }
}
