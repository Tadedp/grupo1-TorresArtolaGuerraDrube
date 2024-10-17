import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
    rolSesion = localStorage.getItem('rol')

    constructor (
        private router: Router,
    ) {}

    isAdmin(): boolean {
        return this.rolSesion === 'Admin';
    }

    isUser(): boolean {
        return this.rolSesion === 'Usuario';
    }

    isUserNoReg(): boolean {
        return this.rolSesion === null;
    }

    navigateToLibro(){
        this.router.navigate(['/libro/1']);
    }
}
