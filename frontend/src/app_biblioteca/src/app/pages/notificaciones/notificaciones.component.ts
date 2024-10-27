import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalEnviarNotificacionComponent } from '../../components/modal-enviar-notificacion/modal-enviar-notificacion.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-notificaciones',
    templateUrl: './notificaciones.component.html',
    styleUrl: './notificaciones.component.css'
})

export class NotificacionesComponent {
    constructor (
        private router: Router,
        private dialog: MatDialog
    ) {}

    openModalEnviarNotificacion(): void {
        const dialogRef = this.dialog.open(ModalEnviarNotificacionComponent, {
            width: '500px',
            data: {}
        });
    }
}