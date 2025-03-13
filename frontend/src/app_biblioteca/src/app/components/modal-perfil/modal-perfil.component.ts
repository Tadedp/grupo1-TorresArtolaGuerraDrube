import { Component, Inject, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UsuariosService } from '../../services/usuarios.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalConfirmacionComponent } from '../modal-confirmacion/modal-confirmacion.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-modal-perfil',
    templateUrl: './modal-perfil.component.html',
    styleUrl: './modal-perfil.component.css'
})

export class ModalPerfilComponent implements OnInit, OnDestroy{
    usuarioDatos:any[] = [];
    usuario_id!: number

    constructor(
        public dialogRef: MatDialogRef<ModalPerfilComponent>,
        private usuariosService: UsuariosService,
        private authService: AuthService,
        private router: Router,
        private renderer: Renderer2,
        private dialog: MatDialog,

        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit(): void {
        if (this.authService.es_token_expirado()){
            alert('Sesión expirada. Vuelva a iniciar sesión.');
            this.authService.logout();
            this.dialogRef.close();
            
        } else {
            this.usuario_id = parseInt(localStorage.getItem('id') || '0')
            this.usuariosService.getUsuario(parseInt(localStorage.getItem('id') || '1')).subscribe((usuario: any) => { 
                    this.usuarioDatos = [usuario.alias, usuario.nombre, usuario.apellido, usuario.estado];
                });

            this.renderer.addClass(document.body, 'modal-abierto');
        }
    }

    ngOnDestroy(): void {
        this.renderer.removeClass(document.body, 'modal-abierto');
    }

    navigateToDetallesPerfil() {
        if (this.authService.es_token_expirado()){
            alert('Sesión expirada. Vuelva a iniciar sesión.');
            this.authService.logout();
            
        } else {
            this.router.navigate(['/detalles-perfil']);
        }

        this.dialogRef.close();
    }

    navigateToFavoritos() {
        if (this.authService.es_token_expirado()){
            alert('Sesión expirada. Vuelva a iniciar sesión.');
            this.authService.logout();
            
        } else {
            this.router.navigate(['/home']);
        }
        
        this.dialogRef.close();
    }

    openDeleteModal(usuarioID: number) {
        this.dialogRef.close();

        if (this.authService.es_token_expirado()){
            alert('Sesión expirada. Vuelva a iniciar sesión.');
            this.authService.logout();
            
        } else {
            const dialogRef = this.dialog.open(ModalConfirmacionComponent, {
                width: '500px',
                data: { elemento: "self_usuario", id: usuarioID, mensaje: "¿Estás seguro de que deseas eliminar tu cuenta?" }
            });
        }
    }

    logout() {
        this.authService.logout()
        this.dialogRef.close();
    }

    closeModal(): void {
        this.dialogRef.close()
    }
}