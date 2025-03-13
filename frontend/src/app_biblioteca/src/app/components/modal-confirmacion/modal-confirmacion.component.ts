import { Component, EventEmitter, Inject, Output, Renderer2, OnInit, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LibrosService } from '../../services/libros.service'
import { UsuariosService } from '../../services/usuarios.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PrestamosService } from '../../services/prestamos.service';
import { ReseniasService } from '../../services/resenias.service';

@Component({
  selector: 'app-modal-confirmacion',
  templateUrl: './modal-confirmacion.component.html',
  styleUrl: './modal-confirmacion.component.css'
})

export class ModalConfirmacionComponent {
    mensaje = '';
    @Output() confirmarEliminacion = new EventEmitter<void>();

    constructor (
        public dialogRef: MatDialogRef<ModalConfirmacionComponent>,
        private router: Router,
        private librosServicio: LibrosService,
        private usuariosServicio: UsuariosService,
        private prestamosServicio: PrestamosService,
        private reseniasServicio: ReseniasService,
        private authService: AuthService,
        private renderer: Renderer2,



        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit() {
        if (this.authService.es_token_expirado()) {
            alert('Sesión expirada. Vuelva a iniciar sesión.');
            this.authService.logout();
            this.dialogRef.close();
        } else {
            this.mensaje = this.data.mensaje;
            this.renderer.addClass(document.body, 'modal-abierto'); 
        }
    }

    ngOnDestroy() {
        this.renderer.removeClass(document.body, 'modal-abierto'); 
    }


    eliminar(): void {
        if (this.authService.es_token_expirado()){
            alert('Sesión expirada. Vuelva a iniciar sesión.');
            this.authService.logout();
            this.dialogRef.close();
            
        } else {
            if (this.data.elemento == "libro"){
                this.deleteLibro(this.data.id)
            } else if (this.data.elemento == "self_usuario") {
                this.deleteUsuario(this.data.id)
                this.dialogRef.close();
                this.authService.logout()
            } else if (this.data.elemento == "usuario") {
                this.deleteUsuario(this.data.id)
                this.router.navigateByUrl('usuarios');
            } else if (this.data.elemento == "prestamo"){
                this.deletePrestamo(this.data.id)
            } else if (this.data.elemento == "resenia"){
                this.deleteResenia(this.data.id)
            }
            this.dialogRef.close();
        }
    }

    cerrarModal() {
        this.dialogRef.close();
    }

    deleteLibro(libroID: number){
        if (this.authService.es_token_expirado()){
            alert('Sesión expirada. Vuelva a iniciar sesión.');
            this.authService.logout();
            this.dialogRef.close();
            
        } else {
            this.librosServicio.deleteLibro(libroID).subscribe({
                next: (response) => {
                    console.log('Libro eliminado exitosamente:', response);
                    this.router.navigateByUrl('libros'); 
                }, error: (error) => {
                    console.error('Error al eliminar el libro:', error);
                    alert('Error al eliminar el libro');
                }
            });
        }
    }

    deleteUsuario(usuarioID: number){
        if (this.authService.es_token_expirado()){
            alert('Sesión expirada. Vuelva a iniciar sesión.');
            this.authService.logout();
            this.dialogRef.close();
            
        } else {
            this.usuariosServicio.deleteUsuario(usuarioID).subscribe({
                next: (response) => {
                    console.log('Usuario eliminado exitosamente:', response);
                }, error: (error) => {
                    console.error('Error al eliminar el usuario:', error);
                    alert('Error al eliminar el usuario');
                }
            });
        }
    }

    deletePrestamo(prestamoID: number){
        if (this.authService.es_token_expirado()){
            alert('Sesión expirada. Vuelva a iniciar sesión.');
            this.authService.logout();
            this.dialogRef.close();
            
        } else {
            this.prestamosServicio.deletePrestamo(prestamoID).subscribe({
                next: (response) => {
                console.log('Préstamo eliminado exitosamente:', response);  
                this.router.navigateByUrl('prestamos').then(() => {
                    window.location.reload();
                });  
                }, error: (error) => {
                console.error('Error al eliminar el préstamo:', error);
                alert('Error al eliminar el préstamo');
                }
            });
        }
    }

    deleteResenia(reseñaID: number){
        if (this.authService.es_token_expirado()){
            alert('Sesión expirada. Vuelva a iniciar sesión.');
            this.authService.logout();
            this.dialogRef.close();
            
        } else {
            this.reseniasServicio.deleteReseña(reseñaID).subscribe({
                next: (response) => {
                    console.log('Reseña eliminado exitosamente:', response);
                    this.router.navigateByUrl('libro/' + this.data.libro_id).then(() => {
                        window.location.reload(); 
                    })
                }, error: (error) => {
                    console.error('Error al eliminar la reseña:', error);
                    alert('Error al eliminar la reseña');
                }
            });
        }        
    }
}
