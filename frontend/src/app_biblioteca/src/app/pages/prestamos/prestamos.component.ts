import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrl: './prestamos.component.css'
})
export class PrestamosComponent {
    busqueda: { filtro: string, valor: string }[] = [];

    constructor (
        private authService: AuthService,
        private router: Router
    ) {}

    navigateToAgregarPrestamo() {
        if (this.authService.es_token_expirado()){
            alert('Sesión expirada. Vuelva a iniciar sesión.');
            this.authService.logout();
            
        } else {
            this.router.navigate(['prestamo/0/agregar']);
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
