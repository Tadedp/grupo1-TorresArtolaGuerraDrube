import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {
    @Input() titulos: string[] = []
    @Input() placeholders: string[] = []
    @Input() values: string[] = []

    ngOnInit() {
        if (!this.placeholders || this.placeholders.length === 0) {
            this.placeholders = Array(this.titulos.length).fill('...');
        }
        
        if (!this.values || this.values.length === 0) {
            this.values = Array(this.titulos.length).fill('');
        }
    }
}
