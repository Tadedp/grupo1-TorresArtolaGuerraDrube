import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-libros',
    templateUrl: './libros.component.html',
    styleUrl: './libros.component.css'
})
export class LibrosComponent {
    busqueda: { filtro: string, valor: string }[] = [];

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    navigateToAgregarLibro() {
        if (this.authService.es_token_expirado()){
            alert('Sesión expirada. Vuelva a iniciar sesión.');
            this.authService.logout();
            
        } else {
            this.router.navigate(['libro/0/agregar']);
        }
    }

    busquedaFiltrada(busqueda: { filtro: string, valor: string }[]) {
        if (this.authService.es_token_expirado()){
            alert('Sesión expirada. Vuelva a iniciar sesión.');
            this.authService.logout();
            
        } else {
            this.busqueda = [...busqueda]
        }
    }
}
