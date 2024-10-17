import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-modal-enviar-resenia',
    templateUrl: './modal-enviar-resenia.component.html',
    styleUrl: './modal-enviar-resenia.component.css'
})

export class ModalEnviarReseniaComponent {
    form!: FormGroup;

    constructor (
        public dialogRef: MatDialogRef<ModalEnviarReseniaComponent>,
        private formBuilder: FormBuilder,
        private router: Router,

        @Inject(MAT_DIALOG_DATA) public data: any
    ) { this.form = this.formBuilder.group({
            reseña: ['', Validators.required]
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
