import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-modal-enviar-notificacion',
    templateUrl: './modal-enviar-notificacion.component.html',
    styleUrl: './modal-enviar-notificacion.component.css'
})

export class ModalEnviarNotificacionComponent {
    form!: FormGroup;

    constructor (
        public dialogRef: MatDialogRef<ModalEnviarNotificacionComponent>,
        private formBuilder: FormBuilder,
        private router: Router,
    
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { this.form = this.formBuilder.group({
            usuarios: ['', Validators.required],
            mensaje: ['', Validators.required]
    })}

    submit() {
        if (this.form.valid) {
            this.router.navigateByUrl('/notificaciones');
            this.dialogRef.close();
        } else {
            alert('Los valores son requeridos');
        }
    }
}
