import { Component, ViewChild  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormularioComponent } from '../../components/formulario/formulario.component';

@Component({
    selector: 'app-registrarse',
    templateUrl: './registrarse.component.html',
    styleUrl: './registrarse.component.css'
})

export class RegistrarseComponent {
    @ViewChild(FormularioComponent) formularioComponent!: FormularioComponent;

    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) {}

    navigateToPortada() {
        this.router.navigateByUrl('portada');
    }

    submit() {
        const form = this.formularioComponent.form;  

        if (form.valid) {
            this.router.navigateByUrl('/portada');
        } else {
            alert('Los valores son requeridos');
        }
    }
}
