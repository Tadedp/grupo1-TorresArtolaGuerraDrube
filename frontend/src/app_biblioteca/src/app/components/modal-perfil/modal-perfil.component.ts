import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UsuariosService } from '../../services/usuarios.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-modal-perfil',
    templateUrl: './modal-perfil.component.html',
    styleUrl: './modal-perfil.component.css'
})

export class ModalPerfilComponent {
    usuarioDatos:any[] = [];

    constructor(
        public dialogRef: MatDialogRef<ModalPerfilComponent>,
        private usuariosService: UsuariosService,
        private authService: AuthService,
        private router: Router,

        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit(): void {
        this.usuariosService.getUsuario(parseInt(localStorage.getItem('id') || '1')).subscribe((usuario: any) => { 
                this.usuarioDatos = [usuario.alias, usuario.nombre, usuario.apellido];
            });
    }

    navigateToDetallesPerfil() {
        this.router.navigate(['/detalles-perfil']);
        this.dialogRef.close();
    }

    navigateToFavoritos() {
        this.router.navigate(['/home']);
        this.dialogRef.close();
    }

    logout() {
        this.authService.logout()
        this.dialogRef.close();
    }

    closeModal(): void {
        this.dialogRef.close()
    }

    saveChanges(): void {
        this.dialogRef.close()
    }
}


