import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { FormularioComponent } from '../../components/formulario/formulario.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-am-usuario',
  templateUrl: './am-usuario.component.html',
  styleUrl: './am-usuario.component.css'
})
export class AmUsuarioComponent {
    @ViewChild(FormularioComponent) formularioComponent!: FormularioComponent;
    
    usuario_id!: string;
    tipo_op!: string;
    usuarioDatos:any[] = [];

    constructor(
        private route: ActivatedRoute,
        private usuariosService: UsuariosService,
        private authService: AuthService,
        private router: Router
    ) { }
  
    ngOnInit(): void {
        if (this.authService.es_token_expirado()){
            alert('Sesión expirada. Vuelva a iniciar sesión.');
            this.authService.logout();
            
        } else {
            this.usuario_id = this.route.snapshot.paramMap.get('id') || '';
            this.tipo_op = this.route.snapshot.paramMap.get('tipo_op') || '';
            
            if (this.tipo_op == "editar") {
                this.usuariosService.getUsuario(parseInt(this.usuario_id)).subscribe((usuario: any) => {
                    this.usuarioDatos = [usuario.nombre, usuario.apellido, usuario.alias, usuario.mail, usuario.dni, usuario.telefono, usuario.estado]
                });
            }
        }
    }

    submit() {
        if (this.authService.es_token_expirado()){
            alert('Sesión expirada. Vuelva a iniciar sesión.');
            this.authService.logout();
            
        } else {
            const form = this.formularioComponent.form;  

            if (form.valid) {
                if (this.tipo_op == "agregar") {
                    const body = {
                        nombre: form.value['Nombre'],
                        apellido: form.value['Apellido'],
                        mail: form.value['Mail'],
                        dni: parseInt(form.value['DNI']),
                        telefono: parseInt(form.value['Teléfono']),
                        rol: form.value['Rol'],
                        alias: form.value['Alias'],
                        estado: form.value['Estado'],
                        contraseña: form.value['Contraseña'],
                    };
                    
                    this.usuariosService.postUsuario(body).subscribe({
                        next: (response) => {
                            console.log('Usuario agregado exitosamente:', response);
                        }, error: (error) => {
                            console.error('Error al agregar el usuario:', error);
                            alert('Error al agregar el usuario');
                        }, complete: () => {
                            this.router.navigateByUrl('/usuarios');
                        }
                    });
                } else {
                    const body = {
                        nombre: form.value['Nombre'],
                        apellido: form.value['Apellido'],
                        mail: form.value['Mail'],
                        dni: parseInt(form.value['DNI']),
                        telefono: parseInt(form.value['Teléfono']),
                        estado: form.value['Estado'],
                        alias: form.value['Alias']
                    };
                    
                    this.usuariosService.putUsuario(parseInt(this.usuario_id), body).subscribe({
                        next: (response) => {
                            console.log('Usuario modificado exitosamente:', response);
                        }, error: (error) => {
                            console.error('Error al modificar el usuario:', error);
                            alert('Error al modificar el usuario');
                        }, complete: () => {
                            this.router.navigateByUrl('/usuario/' + this.usuario_id);
                        }
                    });
                }
            } else {
                alert('Los valores son requeridos');
            }
        }
    }
}