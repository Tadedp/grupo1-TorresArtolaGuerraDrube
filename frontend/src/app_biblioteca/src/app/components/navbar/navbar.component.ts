import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalPerfilComponent } from '../modal-perfil/modal-perfil.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent{
    rolSesion = localStorage.getItem('rol')

    constructor (
        private router: Router,
        private dialog: MatDialog
    ) {}

    openModalPerfilDialog(): void {
        const dialogRef = this.dialog.open(ModalPerfilComponent, {
          width: '500px',
          data: {} // Puedes pasar datos adicionales aquí si lo necesitas
        });
    }

    isAdmin(): boolean {
        return this.rolSesion === 'Admin';
    }

    isUser(): boolean {
        return this.rolSesion === 'Usuario';
    }

    isUserNoReg(): boolean {
        return this.rolSesion === null;
    }

    navigateToNotifications() {
        this.router.navigate(['/notificaciones']);
    }
}
