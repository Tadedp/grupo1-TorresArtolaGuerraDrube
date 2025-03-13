import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'

@Injectable({
    providedIn: 'root'
})
export class UsuariosService {
    url = '/api';

    constructor(
        private httpClient:HttpClient
    ) { }

    getUsuarios(page: number, params?: { per_page?: number, id?: string, alias?: string, nombre?: string, apellido?: string, dni?: string, telefono?: string, mail?: string, rol?: string, estado?: string, sortby_id?: string, sortby_alias?: string}) {
        let auth_token = localStorage.getItem('token');

        let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}` 
        })

        let httpParams = new HttpParams().set('page', page.toString());

        if (params) {
            if (params.per_page) {
                httpParams = httpParams.set('per_page', params.per_page);
            }
            if (params.id) {
                httpParams = httpParams.set('id', params.id);
            }
            if (params.alias) {
                httpParams = httpParams.set('alias', params.alias);
            }
            if (params.nombre) {
                httpParams = httpParams.set('nombre', params.nombre);
            }
            if (params.apellido) {
                httpParams = httpParams.set('apellido', params.apellido);
            }
            if (params.dni) {
              httpParams = httpParams.set('dni', params.dni);
            }
            if (params.telefono) {
                httpParams = httpParams.set('telefono', params.telefono);
            }
            if (params.mail) {
                httpParams = httpParams.set('mail', params.mail);
            }
            if (params.rol) {
                httpParams = httpParams.set('rol', params.rol);
            }
            if (params.estado) {
                httpParams = httpParams.set('estado', params.estado);
            }
            if (params.sortby_id) {
              httpParams = httpParams.set('sortby_id', params.sortby_id);
            }
            if (params.sortby_alias) {
                httpParams = httpParams.set('sortby_alias', params.sortby_alias);
            }
        }

        const requestOptions = { headers: headers, params: httpParams }

        return this.httpClient.get(this.url + '/usuarios', requestOptions);
    }

    postUsuario(body: any) {
        let auth_token = localStorage.getItem('token');

        let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}` 
        })

        const requestOptions = {headers: headers}
        
        return this.httpClient.post(this.url + '/usuarios', body, requestOptions);
    }

    getUsuario(id: number) {
        let auth_token = localStorage.getItem('token');

        let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}` 
        })

        const requestOptions = {headers: headers}

        return this.httpClient.get(this.url + '/usuario/' + id, requestOptions);
    }

    putUsuario(id: number, body: any) {
        let auth_token = localStorage.getItem('token');

        let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}` 
        })

        const requestOptions = {headers: headers}

        return this.httpClient.put(this.url + '/usuario/' + id, body, requestOptions);
    }

    deleteUsuario(id: number) {
        let auth_token = localStorage.getItem('token');

        let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}` 
        })

        const requestOptions = {headers: headers}

        return this.httpClient.delete(this.url + '/usuario/' + id, requestOptions);
    }
}
