import { Component, Inject, OnInit, OnDestroy, Renderer2} from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificacionesService } from '../../services/notificaciones.service';
import { UsuariosService } from '../../services/usuarios.service';
import { forkJoin, Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

interface Usuario {
    id: number;
    alias: string;
    apellido: string;
    nombre: string;
    mail: string;
    dni: number;
    telefono: number;
    rol: string;
}

interface UsuariosResponse {
    usuarios: Usuario[];
    total: number;
    page: number;
    pages: number
}

@Component({
    selector: 'app-modal-solicitar-prestamo',
    templateUrl: './modal-solicitar-prestamo.component.html',
    styleUrl: './modal-solicitar-prestamo.component.css'
})

export class ModalSolicitarPrestamoComponent implements OnInit, OnDestroy{
    form!: FormGroup;

    constructor (
        public dialogRef: MatDialogRef<ModalSolicitarPrestamoComponent>,
        private notificacionesService: NotificacionesService,
        private usuariosService: UsuariosService,
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private renderer: Renderer2,

        @Inject(MAT_DIALOG_DATA) public data: any
        ) { 
            this.form = this.formBuilder.group({
                fecha: ['', this.soloFechaValidator]
            })
        }

    ngOnInit(): void {
        this.renderer.addClass(document.body, 'modal-abierto');
    }

    ngOnDestroy(): void {
        this.renderer.removeClass(document.body, 'modal-abierto');
    }
    
    submit() {
        if (this.authService.es_token_expirado()){
            alert('Sesión expirada. Vuelva a iniciar sesión.');
            this.authService.logout();
            this.dialogRef.close();

        } else {
            if (this.form.valid) {
                this.usuariosService.getUsuario(parseInt(localStorage.getItem('id') || '0')).subscribe((usuario: any) => { 
                    this.usuariosService.getUsuarios(1).subscribe((usuarios: any) => {
                        var listaIDs: number[] = [];
                        const fechaActual = new Date();
                        const totalUsuarios = usuarios.total

                        const adminParams = { per_page: totalUsuarios, rol: "Admin" };
                        const bibliotecarioParams = { per_page: totalUsuarios, rol: "Bibliotecario" };

                        forkJoin({
                            admins: this.usuariosService.getUsuarios(1, adminParams) as Observable<UsuariosResponse>,
                            bibliotecarios: this.usuariosService.getUsuarios(1, bibliotecarioParams) as Observable<UsuariosResponse>
                        }).subscribe(({ admins, bibliotecarios }) => {
                            admins.usuarios.forEach((admin: any) => listaIDs.push(admin.id));
                            bibliotecarios.usuarios.forEach((bibliotecario: any) => listaIDs.push(bibliotecario.id));

                            const body = {
                                fecha: (fechaActual.getFullYear()).toString() + "-" + (fechaActual.getMonth() + 1).toString() + "-" + (fechaActual.getDate()).toString(),
                                mensaje: this.data.libro_datos.titulo + " (" + this.data.libro_datos.id + ") solicitado por " + usuario.alias + " (" + usuario.id + ") para la fecha " + this.form.value['fecha'],
                                usuarios: listaIDs
                            };
                            
                            this.notificacionesService.postNotificacion(body).subscribe({
                                next: (response) => {
                                    console.log('Solicitud enviada exitosamente:', response);
                                }, error: (error) => {
                                    console.error('Error al enviar la solicitud:', error);
                                }, complete: () => {
                                    this.dialogRef.close();
                                }
                            });
                        })
                    })
                });
            } else {
                alert('Los valores son requeridos');
            }
        }
    }

    soloFechaValidator(control: AbstractControl): ValidationErrors | null {
        const valor = control.value;
        const soloFecha = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(valor);
        return soloFecha ? null : { soloFecha: true };
    }
}