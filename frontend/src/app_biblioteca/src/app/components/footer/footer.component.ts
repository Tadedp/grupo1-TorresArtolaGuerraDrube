import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})

export class FooterComponent {
    rolSesion = localStorage.getItem('rol')

    constructor (
        private authService: AuthService,
        private router: Router,
    ) {}

    isAdminBibliotecario(): boolean {
        return this.rolSesion === 'Admin' || this.rolSesion === 'Bibliotecario';
    }

    isUser(): boolean {
        return this.rolSesion === 'Usuario';
    }

    isUserNoReg(): boolean {
        return this.rolSesion === null;
    }

    navigateToLibros() {
        if (this.authService.es_token_expirado()){
            alert('Sesión expirada. Vuelva a iniciar sesión.');
            this.authService.logout();
            
        } else {
            this.router.navigate(['/libros']);
        }
    }

    navigateToUsuarios() {
        if (this.authService.es_token_expirado()){
            alert('Sesión expirada. Vuelva a iniciar sesión.');
            this.authService.logout();
            
        } else {
            this.router.navigate(['/usuarios']);
        }
    }

    navigateToPrestamos() {
        if (this.authService.es_token_expirado()){
            alert('Sesión expirada. Vuelva a iniciar sesión.');
            this.authService.logout();
            
        } else {
            this.router.navigate(['/prestamos']);
        }
    }

    navigateToBuscar(){
        this.router.navigate(['/search']);
    }

    navigateToMisPrestamos(){
        if (this.authService.es_token_expirado()){
            alert('Sesión expirada. Vuelva a iniciar sesión.');
            this.authService.logout();
            
        } else {
            this.router.navigate(['/prestamos-usuarios']);
        }
    }

    navigateToHome(){
        this.router.navigate(['/home']);
    }
}
