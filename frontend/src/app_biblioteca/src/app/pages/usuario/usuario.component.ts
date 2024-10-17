import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service'
import { catchError } from 'rxjs/operators';

@Component({
    selector: 'app-usuario',
    templateUrl: './usuario.component.html',
    styleUrl: './usuario.component.css'
})

export class UsuarioComponent {
    usuario_id!: number;
    usuario_datos: any;

    constructor(
        private route: ActivatedRoute,
        private usuariosService: UsuariosService,
        private router: Router
    ) { }
  
    ngOnInit(): void {
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
            });
    }
}
