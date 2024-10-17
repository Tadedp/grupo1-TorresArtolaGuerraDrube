import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {
    @Input() titulos: string[] = []
    @Input() placeholders: string[] = []
    @Input() values: string[] = []
    form!: FormGroup;

    constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.actualizarFormulario()
    }

    ngOnChanges(changes: SimpleChanges) {
        if ( changes['values'] ) {
          this.actualizarFormulario();
        }
    }

    actualizarFormulario(){
        if (!this.placeholders || this.placeholders.length === 0) {
            this.placeholders = Array(this.titulos.length).fill('...');
        }
        
        if (!this.values || this.values.length === 0) {
            this.values = Array(this.titulos.length).fill('');
        }
        
        const formEstructura: { [key: string]: any } = {};

        this.titulos.forEach((titulo, index) => {
            console.log(this.values[index])
            formEstructura[titulo] = [this.values[index] || '', Validators.required];
        });

        this.form = this.formBuilder.group(formEstructura);
    }
}