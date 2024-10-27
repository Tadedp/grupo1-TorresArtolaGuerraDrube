import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NotificacionesService } from '../../services/notificaciones.service';
import { UsuariosService } from '../../services/usuarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { catchError, firstValueFrom, map} from 'rxjs';

@Component({
    selector: 'app-modal-enviar-notificacion',
    templateUrl: './modal-enviar-notificacion.component.html',
    styleUrl: './modal-enviar-notificacion.component.css'
})

export class ModalEnviarNotificacionComponent {
    form!: FormGroup;
    enviarATodos: boolean = false;

    constructor (
        public dialogRef: MatDialogRef<ModalEnviarNotificacionComponent>,
        private notificacionesService: NotificacionesService,
        private usuariosService: UsuariosService,
        private formBuilder: FormBuilder,
        private router: Router,
    
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { this.form = this.formBuilder.group({
            usuarios: [{ value: '', disabled: this.enviarATodos }, Validators.required],
            mensaje: ['', Validators.required]
    })}

    toggleEnviarATodos() {
        this.enviarATodos = !this.enviarATodos;
        const usuariosControl = this.form.get('usuarios');
        
        if (this.enviarATodos) {
            usuariosControl?.disable();
        } else {
            usuariosControl?.enable();
        }
    }

    async obtenerTodosLosUsuarios(): Promise<number[]> {
        let listaIDs: number[] = [];
        const params: any = { rol: "Usuario" };
    
        try {
            const rta: any = await firstValueFrom(this.usuariosService.getUsuarios(1, params));
            
            if (rta && rta.total) {
                const totalUsuarios = rta.total; 
                const updatedParams = { per_page: totalUsuarios, rol: "Usuario" }

                const listaIDsRespuesta: any = await firstValueFrom(
                    this.usuariosService.getUsuarios(1, updatedParams).pipe(
                        map((rta: any) => {
                            return rta.usuarios.map((usuario: any) => usuario.id);
                        }),
                        catchError((error) => {
                            throw error;
                        })
                    )
                );
                
                listaIDs = listaIDsRespuesta;
            }
        } catch (error) {
            throw error;
        }
        return listaIDs;
    }

    submit() {
        if (this.form.valid) {
            let listaIDs: number[];
            const fechaActual = new Date();

            if (!this.enviarATodos) {
                const usuarios = this.form.get('usuarios')?.value;
                
                listaIDs = usuarios.split(',')
                    .map((id: string) => parseInt(id.trim(), 10))
                    .filter((id: number) => !isNaN(id)); 

                for (let id of listaIDs){    
                    const body = {
                        fecha: (fechaActual.getFullYear()).toString() + "-" + (fechaActual.getMonth() + 1).toString() + "-" + (fechaActual.getDate()).toString(),
                        mensaje: this.form.value['mensaje'],
                        usuarios: [id]
                    };
                    
                    this.notificacionesService.postNotificacion(body).subscribe({
                        next: (response) => {
                            console.log('Notificación enviada exitosamente:', response);
                            this.router.navigateByUrl('/notificaciones');
                        },
                        error: (error) => {
                            console.error('Error al enviar la notificación:', error);
                        }
                    });
                }

            } else {
                try {
                    this.obtenerTodosLosUsuarios().then(ids => {
                        listaIDs = ids;

                        for (let id of listaIDs) {    
                            const body = {
                                fecha: (fechaActual.getFullYear()).toString() + "-" + (fechaActual.getMonth() + 1).toString() + "-" + (fechaActual.getDate()).toString(),
                                mensaje: this.form.value['mensaje'],
                                usuarios: [id]
                            };
                            
                            console.log(body);
                       
                            this.notificacionesService.postNotificacion(body).subscribe({
                                next: (response) => {
                                    console.log('Notificación enviada exitosamente:', response);
                                    this.router.navigateByUrl('/notificaciones');
                                },
                                error: (error) => {
                                    console.error('Error al enviar la notificación:', error);
                                    alert('Error al enviar la notificación');
                                }
                            });
                        }
                    });

                } catch (error) {
                    console.error('Error obteniendo los IDs de todos los usuarios:', error);
                    alert('Error al obtener los IDs de todos los usuarios.');
                }

            }

            this.dialogRef.close();
        } else {
            alert('Los valores son requeridos');
        }
    }
}
