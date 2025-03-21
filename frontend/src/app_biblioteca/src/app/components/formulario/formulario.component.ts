import { Component, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms'
import { Router } from '@angular/router';

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
        private router: Router, 
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
            let validators = [Validators.required];
            
            if (this.esCampoEmail(titulo)) {
                validators.push(Validators.email);
            }
            
            if (this.esCampoSoloLetras(titulo)) {
                validators.push(this.soloLetrasValidator);
            }
            
            if (this.esCampoSoloNumeros(titulo) && titulo.toLowerCase() !== 'apellido') {
                validators.push(this.soloNumerosValidator);
            }

            if (this.esCampoFecha(titulo)) {
                validators.push(this.soloFechaValidator);
            }

            if (this.esCampoEstadoLibro(titulo)) {
                validators.push(this.soloEstadoLibroValidator);
            }

            if (this.esCampoEstadoUsuario(titulo)) {
                validators.push(this.soloEstadoUsuarioValidator);
            }

            if (this.esCampoRol(titulo)) {
                validators.push(this.soloRolValidator);
            }

            if (this.esCampoTelefono(titulo)) {
                validators.push(this.soloLargoValidator(10));  // Límite de 10 caracteres para teléfono
            }

            if (this.esCampoISBN(titulo)) {
                validators.push(this.soloLargoValidator(13));  // Límite de 13 caracteres para ISBN
            }

            formEstructura[titulo] = [this.values[index] || '', validators];
        });

        this.form = this.formBuilder.group(formEstructura);
    }

    esCampoContrasena(titulo: string): boolean {
        return titulo.toLowerCase().includes('contraseña');
    }

    esCampoEmail(titulo: string): boolean {
        return titulo.toLowerCase().includes('email') || titulo.toLowerCase().includes('mail');
    }
    
    esCampoSoloLetras(titulo: string): boolean {
        return titulo.toLowerCase().includes('nombre') || titulo.toLowerCase().includes('apellido') || titulo.toLowerCase().includes('autor nombres') || titulo.toLowerCase().includes('autor apellidos') || titulo.toLowerCase().includes('género');
    }

    esCampoSoloNumeros(titulo: string): boolean {
        return titulo.toLowerCase().includes('dni') || titulo.toLowerCase().includes('telefono') || titulo.toLowerCase().includes('teléfono') || titulo.toLowerCase().includes('isbn') || titulo.toLowerCase().includes('stock') || titulo.toLowerCase() === 'id';
    }

    esCampoISBN(titulo: string): boolean {
        return titulo.toLowerCase().includes('isbn');
    }

    esCampoTelefono(titulo: string): boolean {
        return titulo.toLowerCase().includes('telefono');
    }

    esCampoFecha(titulo: string): boolean {
        return titulo.toLowerCase().includes('fecha');
    }

    esCampoEstadoLibro(titulo: string): boolean {
        const currentRoute = this.router.url;
        if (currentRoute.includes('libro')) {
            return titulo.toLowerCase().includes('estado');
        } else {
            return false;
        }
    }

    esCampoEstadoUsuario(titulo: string): boolean {
        const currentRoute = this.router.url;
        if (currentRoute.includes('usuario')) {
            return titulo.toLowerCase().includes('estado');
        } else {
            return false;
        }
    }

    esCampoRol(titulo: string): boolean {
        return titulo.toLowerCase().includes('rol');
    }

    soloLetrasValidator(control: AbstractControl): ValidationErrors | null {
        const valor = control.value;
        const soloLetras = /^[a-zA-Z\s]*$/.test(valor);
        return soloLetras ? null : { soloLetras: true };
    }
    
    soloNumerosValidator(control: AbstractControl): ValidationErrors | null {
        const valor = control.value;
        const soloNumeros = /^[0-9]*$/.test(valor);
        return soloNumeros ? null : { soloNumeros: true };
    }

    soloFechaValidator(control: AbstractControl): ValidationErrors | null {
        const valor = control.value;
        const soloFecha = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(valor);
        return soloFecha ? null : { soloFecha: true };
    }

    soloEstadoLibroValidator(control: AbstractControl): ValidationErrors | null {
        const valor = control.value;
        const soloEstadoLibro = valor === 'Disponible' || valor === 'No Disponible';
        return soloEstadoLibro ? null : { soloEstadoLibro: true };
    }

    soloEstadoUsuarioValidator(control: AbstractControl): ValidationErrors | null {
        const valor = control.value;
        const soloEstadoUsuario = valor === 'Habilitado' || valor === 'Suspendido';
        return soloEstadoUsuario ? null : { soloEstadoUsuario: true };
    }

    soloRolValidator(control: AbstractControl): ValidationErrors | null {
        const valor = control.value;
        const soloRol = valor === 'Usuario' || valor === 'Bibliotecario' || valor === 'Admin';
        return soloRol ? null : { soloRol: true };
    }

    soloLargoValidator(longitudMaxima: number) {
        return (control: AbstractControl): ValidationErrors | null => {
            const valor = control.value;
            const longitudValida = valor.length == longitudMaxima; // Verifica que no exceda el límite
            
        return longitudValida ? null : { soloLargo: true };
        };
    }
}