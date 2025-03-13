import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-edit-delete-buttons',
    templateUrl: './edit-delete-buttons.component.html',
    styleUrl: './edit-delete-buttons.component.css'
})

export class EditDeleteButtonsComponent {
    @Input() editarUrl: string = '';
    @Output() clickEvent = new EventEmitter<void>();
    
    constructor(
        private authService: AuthService,
        private router: Router,
    ) {}

    navigateToEditar() {
        if (this.authService.es_token_expirado()){
            alert('Sesión expirada. Vuelva a iniciar sesión.');
            this.authService.logout();
            
        } else {
            this.router.navigate([this.editarUrl]);    
        }    
    }

    emitirClick() {
        if (this.authService.es_token_expirado()){
            alert('Sesión expirada. Vuelva a iniciar sesión.');
            this.authService.logout();
            
        } else {
            this.clickEvent.emit();
        }
    }
}
