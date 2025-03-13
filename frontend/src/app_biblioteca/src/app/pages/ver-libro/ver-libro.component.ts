import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LibrosService } from '../../services/libros.service'
import { catchError } from 'rxjs/operators';
import { ModalConfirmacionComponent } from '../../components/modal-confirmacion/modal-confirmacion.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalDatosLibroComponent } from '../../components/modal-datos-libro/modal-datos-libro.component';
import { ModalSolicitarPrestamoComponent } from '../../components/modal-solicitar-prestamo/modal-solicitar-prestamo.component';
import { ModalEnviarReseniaComponent } from '../../components/modal-enviar-resenia/modal-enviar-resenia.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-ver-libro',
  templateUrl: './ver-libro.component.html',
  styleUrl: './ver-libro.component.css'
})

export class VerLibroComponent {
    libro_id!: number;
    libro_datos: any;
    libro_autor: any;
    libro_resenias: any = [];
    libro_estado: any;
    miResenia: any = null; 

    rolSesion = localStorage.getItem('rol')
    estadoSesion = localStorage.getItem('estado')

    constructor (
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private librosServicio: LibrosService,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.libro_id = parseInt(this.route.snapshot.paramMap.get('id') || '1');
        this.librosServicio.getLibro(this.libro_id).pipe(
            catchError(() => {
                console.error('Error 404: Libro no encontrado');
                this.router.navigateByUrl('libros'); 
                return []
            })
            ).subscribe((rta: any) => { 
                console.log('Return api: ', rta );
                this.libro_datos = rta;
                this.libro_autor = rta.autor.nombre + ' ' + rta.autor.apellido;
                this.libro_estado = rta.estado;
                
                this.libro_resenias = rta.reseñas.sort((a: any, b: any) => {
                    return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
                });

                const usuarioActual = localStorage.getItem('id') || '0';
            
                for (let i = 0; i < this.libro_resenias.length; i++) {
                    if (this.libro_resenias[i].usuario.id == parseInt(usuarioActual)) {
                        this.miResenia = this.libro_resenias[i]
                        this.libro_resenias.splice(i, 1)
                        break
                    }
                }
            });
    }

    isAdminBibliotecario(): boolean {
        return this.rolSesion === 'Admin' || this.rolSesion === 'Bibliotecario';
    }

    isUser(): boolean {
        return this.rolSesion === 'Usuario';
    }

    isUserNoReg(): boolean {
        return this.rolSesion === null;
    }

    usuarioTieneResenia(): boolean {
        return this.miResenia !== null;
    }

    openModalDatosLibro(): void {
        if (this.authService.es_token_expirado()){
            alert('Sesión expirada. Vuelva a iniciar sesión.');
            this.authService.logout();
            
        } else {
            const dialogRef = this.dialog.open(ModalDatosLibroComponent, {
                width: '500px',
                data: { 
                    libro_id: this.libro_id, 
                    autor_id: this.libro_datos.autor.id,
                    libro_genero: this.libro_datos.genero, 
                    libro_editorial: this.libro_datos.editorial, 
                    libro_isbn: this.libro_datos.isbn,
                    libro_cantidad: this.libro_datos.cantidad,
                    libro_estado: this.libro_datos.estado 
                } 
            });
        }
    }
        
    openModalSolicitarPrestamo(): void {
        if (this.authService.es_token_expirado()){
            alert('Sesión expirada. Vuelva a iniciar sesión.');
            this.authService.logout();
            
        } else {
            const dialogRef = this.dialog.open(ModalSolicitarPrestamoComponent, {
            width: '500px',
            data: { libro_datos: this.libro_datos }
            });
        }
    }

    openModalEnviarResenia(): void {
        if (this.authService.es_token_expirado()){
            alert('Sesión expirada. Vuelva a iniciar sesión.');
            this.authService.logout();
            
        } else {
            const dialogRef = this.dialog.open(ModalEnviarReseniaComponent, {
            width: '500px',
            data: { libro_id: this.libro_id }
            });
        }
    }

    openDeleteModalLibro(libroID: number) {
        if (this.authService.es_token_expirado()){
            alert('Sesión expirada. Vuelva a iniciar sesión.');
            this.authService.logout();
            
        } else {
            const dialogRef = this.dialog.open(ModalConfirmacionComponent, {
                width: '500px',
                data: { elemento: "libro", id: libroID, mensaje: "¿Estás seguro de que deseas eliminar este libro?" }
            });
        }
    }

    openDeleteModalResenia(reseniaID: number) {
        if (this.authService.es_token_expirado()){
            alert('Sesión expirada. Vuelva a iniciar sesión.');
            this.authService.logout();
            
        } else {
            const dialogRef = this.dialog.open(ModalConfirmacionComponent, {
                width: '500px',
                data: { elemento: "resenia", id: reseniaID, libro_id: this.libro_id, mensaje: "¿Estás seguro de que deseas eliminar esta reseña?" }
            });
        }
    }
}
