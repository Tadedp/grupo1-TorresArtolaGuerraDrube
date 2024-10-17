import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-modal-solicitar-prestamo',
    templateUrl: './modal-solicitar-prestamo.component.html',
    styleUrl: './modal-solicitar-prestamo.component.css'
})

export class ModalSolicitarPrestamoComponent {
    form!: FormGroup;

    constructor (
        public dialogRef: MatDialogRef<ModalSolicitarPrestamoComponent>,
        private formBuilder: FormBuilder,
        private router: Router,

        @Inject(MAT_DIALOG_DATA) public data: any
    ) { this.form = this.formBuilder.group({
            fecha: ['', Validators.required]
    })}
    
    submit() {
        if (this.form.valid) {
            this.router.navigateByUrl('/libro/' + this.data.libro_id);
            this.dialogRef.close();
        } else {
            alert('Los valores son requeridos');
        }
    }
}