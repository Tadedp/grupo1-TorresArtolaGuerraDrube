import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-campo-formulario',
  templateUrl: './campo-formulario.component.html',
  styleUrl: './campo-formulario.component.css'
})

export class CampoFormularioComponent {
    @Input() titulo: string = '';
    @Input() placeholder: string = '';
    @Input() value: string = '';
}
