import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificacionesService } from '../../services/notificaciones.service';

@Component({
    selector: 'app-modal-usuario-notificaciones',
    templateUrl: './modal-usuario-notificaciones.component.html',
    styleUrls: ['./modal-usuario-notificaciones.component.css']
})

export class ModalUsuarioNotificacionesComponent {
    usuario_id = parseInt(localStorage.getItem('id') || '0')
    notificaciones:any[] = []

    nuevoMensaje: string = '';
    nuevaFecha: string = '';

    constructor(
        public dialogRef: MatDialogRef<ModalUsuarioNotificacionesComponent>,
        private notificacionesService: NotificacionesService,
    ) {}

    ngOnInit(): void {
        this.notificacionesService.getNotificaciones(1).subscribe((rta: any) => {
            const totalNotificaciones = rta.total
            const params = { per_page: totalNotificaciones, sortby_fecha: "desc" }
            this.notificacionesService.getNotificaciones(1, params).subscribe((rta: any) => { 
                this.notificaciones = rta.notificaciones
            });
        });
    }

    deleteNotificacion(notificacionID: number) {
        this.notificacionesService.deleteNotificacion(notificacionID).subscribe({
            next: (response) => {
                console.log('Notificación eliminada exitosamente:', response);
            }, error: (error) => {
                console.error('Error al eliminar la notificación:', error);
                alert('Error al eliminar la notificación');
            }, complete: () => {
                this.notificaciones = this.notificaciones.filter(notificacion => notificacion.id !== notificacionID);
            }
        });
    }
    
    submit() {
        this.dialogRef.close();
    }
}