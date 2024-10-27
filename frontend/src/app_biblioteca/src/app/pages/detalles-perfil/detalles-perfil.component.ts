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
        this.usuariosService.getUsuario(parseInt(localStorage.getItem('id') || '0')).subscribe((usuario: any) => { 
            this.usuarioDatos = [usuario.nombre, usuario.apellido, usuario.alias, usuario.mail, usuario.dni, usuario.telefono, '', ''];
        });
    }

    submit() {
        const form = this.formularioComponent.form;  

        if (form.valid && form.value['Contraseña'] === form.value['Confirmar Contraseña']){
            const body = {
                nombre: form.value['Nombre'],
                apellido: form.value['Apellido'],
                mail: form.value['Mail'],
                dni: parseInt(form.value['DNI']),
                telefono: parseInt(form.value['Teléfono']),
                alias: form.value['Alias'],
                contraseña: form.value['Contraseña']
            };
            
            this.usuariosService.putUsuario(parseInt(localStorage.getItem('id') || '0'), body).subscribe({
                next: (response) => {
                    console.log('Tus datos fueron modificados exitosamente:', response);
                }, error: (error) => {
                    console.error('Error al modificar tus datos:', error);
                    alert('Error al modificar tus datos');
                }, complete: () => {
                    this.router.navigateByUrl('/home');
                }
            });
        } else {
            alert('Los valores son requeridos y las contraseñas deben coincidir.');
        }
    }
}
