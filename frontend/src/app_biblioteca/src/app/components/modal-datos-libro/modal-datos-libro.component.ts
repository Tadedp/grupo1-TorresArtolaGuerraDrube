import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-modal-datos-libro',
    templateUrl: './modal-datos-libro.component.html',
    styleUrl: './modal-datos-libro.component.css'
})
export class ModalDatosLibroComponent {
    constructor(
        public dialogRef: MatDialogRef<ModalDatosLibroComponent>,
    
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    submit() {
        this.dialogRef.close();
    }
}

