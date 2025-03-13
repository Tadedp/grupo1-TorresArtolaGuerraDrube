import { Component, Inject, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-modal-datos-libro',
    templateUrl: './modal-datos-libro.component.html',
    styleUrl: './modal-datos-libro.component.css'
})
export class ModalDatosLibroComponent {
    constructor(
        public dialogRef: MatDialogRef<ModalDatosLibroComponent>,
        private renderer: Renderer2,
        
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit() {
        this.renderer.addClass(document.body, 'modal-abierto'); 
    }
    
    ngOnDestroy() {
        this.renderer.removeClass(document.body, 'modal-abierto'); 
    }

    submit() {
        this.dialogRef.close();
    }
}

