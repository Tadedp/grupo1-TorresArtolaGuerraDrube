import { Component, ViewChild } from '@angular/core';
import { Router} from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { FormularioComponent } from '../../components/formulario/formulario.component';

@Component({
    selector: 'app-detalles-perfil',
    templateUrl: './detalles-perfil.component.html',
    styleUrl: './detalles-perfil.component.css'
})

export class DetallesPerfilComponent {
    @ViewChild(FormularioComponent) formularioComponent!: FormularioComponent;

    usuarioDatos:any[] = [];

    constructor(
        private router: Router,
        private usuariosService: UsuariosService,
    ) { }

    ngOnInit(): void {
        this.usuariosService.getUsuario(parseInt(localStorage.getItem('id') || '1')).subscribe((usuario: any) => { 
                this.usuarioDatos = [usuario.nombre, usuario.apellido, usuario.alias, usuario.mail, usuario.dni, usuario.telefono];
            });
    }

    submit() {
        const form = this.formularioComponent.form;  

        if (form.valid) {
            this.router.navigateByUrl('/home');
        } else {
            alert('Los valores son requeridos');
        }
    }
}
