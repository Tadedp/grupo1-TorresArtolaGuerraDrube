import { Component } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
    selector: 'app-prestamos-usuarios',
    templateUrl: './prestamos-usuarios.component.html',
    styleUrl: './prestamos-usuarios.component.css'
})
export class PrestamosUsuariosComponent {
    usuarioPrestamos: any[] = [];
    librosImg: string[] = ['cienaniosdesoledad.png', '1984.png', 'orgulloyprejuicio.png', 'demian.png', 'harrypotterylapiedrafilosofal.png']
    
    constructor(
        private usuariosService: UsuariosService,
    ) { }

    ngOnInit(): void {
        this.usuariosService.getUsuario(parseInt(localStorage.getItem('id') || '0')).subscribe((usuario: any) => { 
                this.usuarioPrestamos = usuario.prestamos;
        });   
    }
}
