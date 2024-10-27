import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})

export class FooterComponent {
    rolSesion = localStorage.getItem('rol')

    constructor (
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
        this.router.navigate(['/libros']);
    }

    navigateToUsuarios() {
        this.router.navigate(['/usuarios']);
    }

    navigateToPrestamos() {
        this.router.navigate(['/prestamos']);
    }

    navigateToBuscar(){
        this.router.navigate(['/search']);
    }

    navigateToMisPrestamos(){
        this.router.navigate(['/prestamos-usuarios']);
    }

    navigateToHome(){
        this.router.navigate(['/home']);
    }
}
