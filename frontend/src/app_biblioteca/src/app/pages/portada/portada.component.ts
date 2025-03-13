import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
    selector: 'app-portada',
    templateUrl: './portada.component.html',
    styleUrl: './portada.component.css'
})

export class PortadaComponent {
    mostrarLogin: boolean = false;
    loginForm!: FormGroup;

    constructor(
        private authService: AuthService,
        private router: Router,
        private formBuilder: FormBuilder
    ) {
        this.loginForm = this.formBuilder.group({
        mail: ['', Validators.required],
        contraseña: ['', Validators.required]
        })
    }

    navigateToHome(dataLogin:any) {
        this.authService.login(dataLogin).subscribe({
            next: (rta:any) => {
            localStorage.setItem('token', rta.access_token);
            localStorage.setItem('id', rta.id);
            const tokenPayload = JSON.parse(atob(rta.access_token.split('.')[1]));
            localStorage.setItem('rol', tokenPayload.rol);
            localStorage.setItem('estado', tokenPayload.estado);
            this.router.navigateByUrl('home');
        
        }, error: (err:any) => {
            alert('ERROR: Usuario o contraseña incorrecta.');
            console.log('Error: ', err);
            localStorage.removeItem('token');
            localStorage.removeItem('id');
            localStorage.removeItem('rol');
            localStorage.removeItem('estado');
        }
        })
    }

    submit() {
        if(this.loginForm.valid) {
            this.navigateToHome(this.loginForm.value);
        
        } else {
            alert('ERROR: Ingrese email y contraseña.');
        }
    }

    mostrarFormularioLogin() {
        this.mostrarLogin = true;
    }

    navigateToRegistrarse() {
        this.router.navigateByUrl('registrarse');
    }
}
