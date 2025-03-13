import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service'
import { catchError } from 'rxjs/operators';
import { ModalConfirmacionComponent } from '../../components/modal-confirmacion/modal-confirmacion.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-usuario',
    templateUrl: './usuario.component.html',
    styleUrl: './usuario.component.css'
})

export class UsuarioComponent {
    usuario_id!: number;
    usuario_datos: any;

    constructor(
        private authService: AuthService,
        private route: ActivatedRoute,
        private usuariosService: UsuariosService,
        private router: Router,
        private dialog: MatDialog
    ) { }
  
    ngOnInit(): void {
        if (this.authService.es_token_expirado()){
            alert('Sesión expirada. Vuelva a iniciar sesión.');
            this.authService.logout();
            
        } else {
            this.usuario_id = parseInt(this.route.snapshot.paramMap.get('id') || '1');
            this.usuariosService.getUsuario(this.usuario_id).pipe(
                catchError(() => {
                    console.error('Error 404: Usuario no encontrado');
                    this.router.navigateByUrl('usuarios'); 
                    return []
                })
                ).subscribe((rta: any) => { 
                    console.log('Return api: ', rta );
                    this.usuario_datos = rta;
                }
            );
        }
    }

    openDeleteModal(usuarioID: number) {
        if (this.authService.es_token_expirado()){
            alert('Sesión expirada. Vuelva a iniciar sesión.');
            this.authService.logout();
            
        } else {
            const dialogRef = this.dialog.open(ModalConfirmacionComponent, {
                width: '500px',
                data: { elemento: "usuario", id: usuarioID, mensaje: "¿Estás seguro de que deseas eliminar este usuario?" }
            });
        }
    }
}
