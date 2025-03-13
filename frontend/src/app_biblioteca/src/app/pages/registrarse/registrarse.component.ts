import { Component, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'
import { FormularioComponent } from '../../components/formulario/formulario.component';

@Component({
    selector: 'app-registrarse',
    templateUrl: './registrarse.component.html',
    styleUrl: './registrarse.component.css'
})

export class RegistrarseComponent {
    @ViewChild(FormularioComponent) formularioComponent!: FormularioComponent;

    constructor(
        private authService: AuthService,
        private router: Router,
    ) {}

    navigateToPortada() {
        this.router.navigateByUrl('portada');
    }

    convertirInputs(inputs: {
        Nombre: string,
        Apellido: string,
        Mail: string,
        DNI: string,
        Telefono: string,
        Alias: string,
        Contraseña: string,
        "Confirmar Contraseña"?: string}): 
        {
        nombre: string,
        apellido: string,
        mail: string,
        dni: number,
        telefono: number,
        rol: "Usuario",
        alias: string,
        contraseña: string
        } {
        return {
            nombre: inputs.Nombre,
            apellido: inputs.Apellido,
            mail: inputs.Mail,
            dni: Number(inputs.DNI),
            telefono: Number(inputs.Telefono),
            rol: "Usuario", 
            alias: inputs.Alias,
            contraseña: inputs.Contraseña
        };
    }

    submit() {
        const form = this.formularioComponent.form;  

        if (form.valid) {
            const dataRegister = this.convertirInputs(form.value)
            this.authService.register(dataRegister).subscribe({
                error: (error:any) => {
                    console.error('Error al completar el registro:', error);
                    alert('Error al completar el registro');
                }, complete: () => {
                    this.router.navigateByUrl('portada');
                    console.log('Éxito.');
                }
            })
        } else {
            alert('Los valores son requeridos');
        }
    }
}
