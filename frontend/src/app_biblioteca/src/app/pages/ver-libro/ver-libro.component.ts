import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LibrosService } from '../../services/libros.service'
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ModalDatosLibroComponent } from '../../components/modal-datos-libro/modal-datos-libro.component';
import { ModalSolicitarPrestamoComponent } from '../../components/modal-solicitar-prestamo/modal-solicitar-prestamo.component';
import { ModalEnviarReseniaComponent } from '../../components/modal-enviar-resenia/modal-enviar-resenia.component';

@Component({
  selector: 'app-ver-libro',
  templateUrl: './ver-libro.component.html',
  styleUrl: './ver-libro.component.css'
})

export class VerLibroComponent {
    libro_id!: number;
    libro_datos: any;
    libro_autor: any;
    libro_resenias: any;

    rolSesion = localStorage.getItem('rol')

    constructor (
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
                this.libro_autor = rta.autores[0].nombre + ' ' + rta.autores[0].apellido;
                this.libro_resenias = rta.reseñas
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

    openModalDatosLibro(): void {
        const dialogRef = this.dialog.open(ModalDatosLibroComponent, {
            width: '500px',
            data: { 
                libro_id: this.libro_id, 
                libro_genero: this.libro_datos.genero, 
                libro_editorial: this.libro_datos.editorial, 
                libro_isbn: this.libro_datos.isbn,
                libro_cantidad: this.libro_datos.cantidad,
                libro_estado: this.libro_datos.estado 
            } 
        });
    }
        
    openModalSolicitarPrestamo(): void {
        const dialogRef = this.dialog.open(ModalSolicitarPrestamoComponent, {
        width: '500px',
        data: { libro_id: this.libro_id }
        });
    }

    openModalEnviarResenia(): void {
        const dialogRef = this.dialog.open(ModalEnviarReseniaComponent, {
        width: '500px',
        data: { libro_id: this.libro_id }
        });
    }

    navigateToDatosLibro() {
        this.router.navigate(['/datos-libro']);
    }

    navigateToSolicitarPrestamo() {
        this.router.navigate(['/solicitar-prestamo']);
    }

    navigateToEnviarResenia() {
        this.router.navigate(['/enviar-resenia']);
    }

}
