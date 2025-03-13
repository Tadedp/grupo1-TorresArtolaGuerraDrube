import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalPerfilComponent } from '../modal-perfil/modal-perfil.component';
import { ModalUsuarioNotificacionesComponent } from '../modal-usuario-notificaciones/modal-usuario-notificaciones.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent{
    rolSesion = localStorage.getItem('rol')

    constructor (
        private router: Router,
        private authService: AuthService,
        private dialog: MatDialog
    ) {}

    openModalPerfilDialog(): void {
        if (this.authService.es_token_expirado()){
            alert('Sesión expirada. Vuelva a iniciar sesión.');
            this.authService.logout();
            
        } else {
            const dialogRef = this.dialog.open(ModalPerfilComponent, {
            width: '500px',
            data: {}
            });
        }
    }

    openModalUsuarioNotificaciones(): void {
        if (this.authService.es_token_expirado()){
            alert('Sesión expirada. Vuelva a iniciar sesión.');
            this.authService.logout();
            
        } else {
            const dialogRef = this.dialog.open(ModalUsuarioNotificacionesComponent, {
            width: '500px',
            data: {}
            });
        }
    }
    
    isAdminBibliotecario(): boolean {
        return this.rolSesion === "Admin" || this.rolSesion === "Bibliotecario";
    }

    isUsuario(): boolean {
        return this.rolSesion === "Usuario";
    }

    isUserNoReg(): boolean {
        return this.rolSesion === null;
    }

    navigateToNotifications() {
        if (this.authService.es_token_expirado()){
            alert('Sesión expirada. Vuelva a iniciar sesión.');
            this.authService.logout();
            
        } else {
            this.router.navigate(['/notificaciones']);
        }
    }
}
