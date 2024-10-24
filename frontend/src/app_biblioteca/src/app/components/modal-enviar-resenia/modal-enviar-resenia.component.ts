import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReseniasService } from '../../services/resenias.service';

@Component({
    selector: 'app-modal-enviar-resenia',
    templateUrl: './modal-enviar-resenia.component.html',
    styleUrl: './modal-enviar-resenia.component.css'
})

export class ModalEnviarReseniaComponent {
    form!: FormGroup;
    rating: number = 0;

    constructor (
        public dialogRef: MatDialogRef<ModalEnviarReseniaComponent>,
        private reseniasService: ReseniasService,
        private formBuilder: FormBuilder,
        private router: Router,

        @Inject(MAT_DIALOG_DATA) public data: any
    ) { this.form = this.formBuilder.group({
            reseña: ['', Validators.required]
    })}

    rate(value: number, event: MouseEvent) {
        const starElement = event.target as HTMLElement;
        const rect = starElement.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const width = rect.width;
    
        if (clickX < width / 2) {
            this.rating = value - 0.5;
        } else {
            this.rating = value;
        }
    }

    submit() {
        if (this.form.valid && this.rating > 0) {
            const fechaActual = new Date();
            const body = {
                comentario: this.form.value['reseña'],
                valoracion: this.rating,
                fecha: (fechaActual.getFullYear()).toString() + "-" + (fechaActual.getMonth() + 1).toString() + "-" + (fechaActual.getDate()).toString(),
                id_usuario: localStorage.getItem('id'),
                id_libro: this.data.libro_id
            }

            this.reseniasService.postResenia(body).subscribe({
                next: (response) => {
                    console.log('Reseña publicada exitosamente:', response);
                }, error: (error) => {
                    console.error('Error al publicar la reseña:', error);
                }, complete: () => {
                    this.router.navigateByUrl('/libro/' + this.data.libro_id).then(() => {
                        window.location.reload();
                    });
                    this.dialogRef.close();
                }
            });
        } else {
            alert('Los valores son requeridos');
        }
    }
}
