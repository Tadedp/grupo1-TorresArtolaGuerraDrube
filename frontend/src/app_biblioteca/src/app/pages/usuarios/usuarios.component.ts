import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
    busqueda: { filtro: string, valor: string }[] = [];
    
    constructor (
        private authService: AuthService,
        private router: Router
    ) {}

    navigateToAgregarUsuario() {
        if (this.authService.es_token_expirado()){
            alert('Sesión expirada. Vuelva a iniciar sesión.');
            this.authService.logout();
            
        } else {
            this.router.navigate(['usuario/0/agregar']);
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
