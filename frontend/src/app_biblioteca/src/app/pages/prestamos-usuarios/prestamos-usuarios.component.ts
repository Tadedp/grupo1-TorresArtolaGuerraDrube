import { Component } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-prestamos-usuarios',
    templateUrl: './prestamos-usuarios.component.html',
    styleUrl: './prestamos-usuarios.component.css'
})
export class PrestamosUsuariosComponent {
    usuarioPrestamos: any[] = [];
    
    constructor(
        private authService: AuthService,
        private usuariosService: UsuariosService,
    ) { }

    ngOnInit(): void {
        if (this.authService.es_token_expirado()){
            alert('Sesión expirada. Vuelva a iniciar sesión.');
            this.authService.logout();
            
        } else {
            this.usuariosService.getUsuario(parseInt(localStorage.getItem('id') || '0')).subscribe((usuario: any) => { 
                    this.usuarioPrestamos = usuario.prestamos;
            });   
        }
    }
}
