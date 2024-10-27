import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'

@Injectable({
    providedIn: 'root'
})

export class AutoresService {
    url = '/api';

    constructor(
        private httpClient:HttpClient
    ) { }

    getAutores(page: number, params?: { per_page?: number, id?: string, nombre?: string, apellido?: string, sortby_nombre?: string, sortby_apellido?: string, sortby_nrLibros?: string}) {
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
            if (params.nombre) {
                httpParams = httpParams.set('nombre', params.nombre);
            }
            if (params.apellido) {
                httpParams = httpParams.set('apellido', params.apellido);
            }
            if (params.sortby_nombre) {
                httpParams = httpParams.set('sortby_nombre', params.sortby_nombre);
            }
            if (params.sortby_apellido) {
              httpParams = httpParams.set('sortby_apellido', params.sortby_apellido);
            }
            if (params.sortby_nrLibros) {
                httpParams = httpParams.set('sortby_nrLibros', params.sortby_nrLibros);
            }
        }

        const requestOptions = { headers: headers, params: httpParams }

        return this.httpClient.get(this.url + '/autores', requestOptions);
    }

    postAutor(body: any) {
        let auth_token = localStorage.getItem('token');

        let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}` 
        })

        const requestOptions = {headers: headers}
        
        return this.httpClient.post(this.url + '/autores', body, requestOptions);
    }
}
