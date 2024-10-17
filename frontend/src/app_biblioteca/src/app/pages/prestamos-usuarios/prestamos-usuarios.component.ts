import { Component } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
    selector: 'app-prestamos-usuarios',
    templateUrl: './prestamos-usuarios.component.html',
    styleUrl: './prestamos-usuarios.component.css'
})
export class PrestamosUsuariosComponent {
    usuarioPrestamos: any[] = [];
    librosImg: string[] = ['cienanosdesoledad.png', '1984.jpeg', 'orgulloyprejuicio.png', 'demian.png', 'harrypotter.jpg']
    
    constructor(
        private usuariosService: UsuariosService,
    ) { }

    ngOnInit(): void {
        this.usuariosService.getUsuario(parseInt(localStorage.getItem('id') || '1')).subscribe((usuario: any) => { 
                this.usuarioPrestamos = usuario.prestamos;
        });   
    }
}
