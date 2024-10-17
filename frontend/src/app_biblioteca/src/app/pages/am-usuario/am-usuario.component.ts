import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { FormularioComponent } from '../../components/formulario/formulario.component';

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
        private router: Router
    ) { }
  
    ngOnInit(): void {
        this.usuario_id = this.route.snapshot.paramMap.get('id') || '';
        this.tipo_op = this.route.snapshot.paramMap.get('tipo_op') || '';
        
        if (this.tipo_op == "editar") {
            this.usuariosService.getUsuario(parseInt(this.usuario_id)).subscribe((usuario: any) => {
                this.usuarioDatos = [usuario.nombre, usuario.apellido, usuario.alias, usuario.mail, usuario.dni, usuario.telefono]
            });
        }
    }

    submit() {
        const form = this.formularioComponent.form;  

        if (form.valid) {
            this.router.navigateByUrl('/usuarios');
        } else {
            alert('Los valores son requeridos');
        }
    }
}