import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificacionesService } from '../../services/notificaciones.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-modal-usuario-notificaciones',
    templateUrl: './modal-usuario-notificaciones.component.html',
    styleUrls: ['./modal-usuario-notificaciones.component.css']
})

export class ModalUsuarioNotificacionesComponent implements OnInit, OnDestroy{
    usuario_id = parseInt(localStorage.getItem('id') || '0')
    notificaciones:any[] = []

    nuevoMensaje: string = '';
    nuevaFecha: string = '';

    constructor(
        public dialogRef: MatDialogRef<ModalUsuarioNotificacionesComponent>,
        private notificacionesService: NotificacionesService,
        private authService: AuthService,
        private renderer: Renderer2
    ) {}

    ngOnInit(): void {
        if (this.authService.es_token_expirado()){
            alert('Sesión expirada. Vuelva a iniciar sesión.');
            this.authService.logout();
            this.dialogRef.close();
            
        } else {
            this.notificacionesService.getNotificaciones(1).subscribe((rta: any) => {
                const totalNotificaciones = rta.total
                const params = { per_page: totalNotificaciones, sortby_fecha: "desc" }
                this.notificacionesService.getNotificaciones(1, params).subscribe((rta: any) => { 
                    this.notificaciones = rta.notificaciones
                });
            });
            this.renderer.addClass(document.body, 'modal-abierto');
        }
    }

    ngOnDestroy(): void {
        this.renderer.removeClass(document.body, 'modal-abierto');
    }
    
    deleteNotificacion(notificacionID: number) {
        if (this.authService.es_token_expirado()){
            alert('Sesión expirada. Vuelva a iniciar sesión.');
            this.authService.logout();
            this.dialogRef.close();
            
        } else {
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
    }
    
    submit() {
        this.dialogRef.close();
    }
}