import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-edit-delete-buttons',
    templateUrl: './edit-delete-buttons.component.html',
    styleUrl: './edit-delete-buttons.component.css'
})

export class EditDeleteButtonsComponent {
    @Input() editarUrl: string = '';
    @Output() clickEvent = new EventEmitter<void>();
    
    constructor(
        private router: Router,

    ) {}

    navigateToEditar() {
        this.router.navigate([this.editarUrl]);
    }

    emitirClick() {
        this.clickEvent.emit();
    }
}
