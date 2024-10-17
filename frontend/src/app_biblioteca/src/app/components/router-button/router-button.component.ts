import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-router-button',
    templateUrl: './router-button.component.html',
    styleUrl: './router-button.component.css'
})
export class RouterButtonComponent {
    @Input() texto: string = '';
    @Input() tipo: string = '';
    @Output() clickEvent = new EventEmitter<void>();

    emitirClick() {
        this.clickEvent.emit();
    }
}