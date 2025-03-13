import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalEnviarNotificacionComponent } from '../../components/modal-enviar-notificacion/modal-enviar-notificacion.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-notificaciones',
    templateUrl: './notificaciones.component.html',
    styleUrl: './notificaciones.component.css'
})

export class NotificacionesComponent {
    constructor (
        private router: Router,
        private authService: AuthService,
        private dialog: MatDialog
    ) {}

    openModalEnviarNotificacion(): void {
        if (this.authService.es_token_expirado()){
            alert('Sesión expirada. Vuelva a iniciar sesión.');
            this.authService.logout();
            
        } else {
            const dialogRef = this.dialog.open(ModalEnviarNotificacionComponent, {
                width: '500px',
                data: {}
            });
        }
    }
}