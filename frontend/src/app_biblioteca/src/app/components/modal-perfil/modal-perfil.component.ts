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
    usuario_id!: number

    constructor(
        public dialogRef: MatDialogRef<ModalPerfilComponent>,
        private usuariosService: UsuariosService,
        private authService: AuthService,
        private router: Router,

        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit(): void {
        this.usuario_id = parseInt(localStorage.getItem('id') || '0')
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

    deleteUsuario(){
        this.usuariosService.deleteUsuario(this.usuario_id).subscribe({
            error: (error: any) => {
                console.error('Error al eliminar el usuario:', error);
                alert('Error al eliminar el usuario');
            }, complete: () => {
                console.log('Usuario eliminado exitosamente');
                this.router.navigateByUrl('portada'); 
            }
        });
        this.authService.logout()
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


