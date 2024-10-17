import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'

@Injectable({
    providedIn: 'root'
})
export class PrestamosService {
    url = '/api';

    constructor(
        private httpClient:HttpClient
    ) { }

    getPrestamos(page: number, params?: { id?: string, libro_id?:string, usuario_id?: string, fecha_inicio?: string, fecha_fin?: string, sortby_id?: string, sortby_libro_titulo?: string, sortby_usuario_alias?: string, sortby_fecha_inicio?: string, sortby_fecha_fin?: string}) {
        let auth_token = localStorage.getItem('token');

        let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}` 
        })

        let httpParams = new HttpParams().set('page', page.toString());

        if (params) {
            if (params.id) {
                httpParams = httpParams.set('id', params.id);
            }
            if (params.libro_id) {
                httpParams = httpParams.set('libro_id', params.libro_id);
            }
            if (params.usuario_id) {
                httpParams = httpParams.set('usuario_id', params.usuario_id);
            }
            if (params.fecha_inicio) {
                httpParams = httpParams.set('fecha_inicio', params.fecha_inicio);
            }
            if (params.fecha_fin) {
                httpParams = httpParams.set('fecha_fin', params.fecha_fin);
            }
            if (params.sortby_id) {
              httpParams = httpParams.set('sortby_id', params.sortby_id);
            }
            if (params.sortby_libro_titulo) {
                httpParams = httpParams.set('sortby_libro_titulo', params.sortby_libro_titulo);
            }
            if (params.sortby_usuario_alias) {
                httpParams = httpParams.set('sortby_usuario_alias', params.sortby_usuario_alias);
            }
            if (params.sortby_fecha_inicio) {
              httpParams = httpParams.set('sortby_fecha_inicio', params.sortby_fecha_inicio);
            }
            if (params.sortby_fecha_fin) {
                httpParams = httpParams.set('sortby_fecha_fin', params.sortby_fecha_fin);
            }
        }

        const requestOptions = { headers: headers, params: httpParams }

        return this.httpClient.get(this.url + '/prestamos', requestOptions);
    }

    postPrestamo() {
        let auth_token = localStorage.getItem('token');

        let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}` 
        })

        //const body = 
        const requestOptions = {headers: headers}
        
        return this.httpClient.post(this.url + '/prestamos', requestOptions);
    }

    getPrestamo(id: number) {
        let auth_token = localStorage.getItem('token');

        let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}` 
        })

        //const body =
        const requestOptions = {headers: headers}

        return this.httpClient.get(this.url + '/prestamo/' + id, requestOptions);
    }

    putPrestamo(id: number) {
        let auth_token = localStorage.getItem('token');

        let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}` 
        })

        const requestOptions = {headers: headers}

        return this.httpClient.put(this.url + '/prestamo/' + id, requestOptions);
    }

    deletePrestamo(id: number) {
        let auth_token = localStorage.getItem('token');

        let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}` 
        })

        const requestOptions = {headers: headers}

        return this.httpClient.delete(this.url + '/prestamo/' + id, requestOptions);
    }
}
