import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, take } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    url = '/api';
    
    constructor(
        private httpClient: HttpClient,
        private router: Router
    ) { }

    login(dataLogin:any): Observable<any> {
        return this.httpClient.post(this.url+'/auth/login', dataLogin).pipe(take(1));
    }

    register(dataRegister:any): Observable<any> {
        return this.httpClient.post(this.url+'/auth/register', dataRegister).pipe(take(1));
    }

    es_token_expirado() {
        const token = localStorage.getItem('token') || '';
        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        const tiempo_actual_segundos = Date.now() / 1000;

        return (tokenPayload.exp < tiempo_actual_segundos)
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('rol');
        localStorage.removeItem('id');
        localStorage.removeItem('estado');
        this.router.navigateByUrl('portada');
    }
}
