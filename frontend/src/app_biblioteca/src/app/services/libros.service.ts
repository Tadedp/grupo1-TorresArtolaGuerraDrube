import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'

@Injectable({
    providedIn: 'root'
})
export class LibrosService {
    url = '/api';

    constructor(
        private httpClient:HttpClient
    ) { }

    getLibros(page: number, params?: { per_page?: number, id?: string, titulo?: string, autor_id?: string, genero?: string, editorial?: string, estado?: string, stock?: string, isbn?: string, sortby_id?: string, sortby_titulo?: string, sortby_estado?: string, sortby_stock?: string}) {
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
            if (params.titulo) {
                httpParams = httpParams.set('titulo', params.titulo);
            }
            if (params.autor_id) {
                httpParams = httpParams.set('autor_id', params.autor_id);
            }
            if (params.genero) {
                httpParams = httpParams.set('genero', params.genero);
            }
            if (params.editorial) {
                httpParams = httpParams.set('editorial', params.editorial);
            }
            if (params.estado) {
              httpParams = httpParams.set('estado', params.estado);
            }
            if (params.stock) {
                httpParams = httpParams.set('cantidad', params.stock);
            }
            if (params.isbn) {
                httpParams = httpParams.set('isbn', params.isbn);
            }
            if (params.sortby_id) {
                httpParams = httpParams.set('sortby_id', params.sortby_id);
            }
            if (params.sortby_titulo) {
              httpParams = httpParams.set('sortby_titulo', params.sortby_titulo);
            }
            if (params.sortby_estado) {
                httpParams = httpParams.set('sortby_estado', params.sortby_estado);
            }
            if (params.sortby_stock) {
                httpParams = httpParams.set('sortby_cantidad', params.sortby_stock);
            }
        }

        const requestOptions = { headers: headers, params: httpParams }

        return this.httpClient.get(this.url + '/libros', requestOptions);
    }

    postLibro(body: any) {
        let auth_token = localStorage.getItem('token');

        let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}` 
        })

        const requestOptions = {headers: headers}
        
        return this.httpClient.post(this.url + '/libros', body, requestOptions);
    }

    getLibro(id: number) {
        let auth_token = localStorage.getItem('token');

        let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}` 
        })

        const requestOptions = {headers: headers}

        return this.httpClient.get(this.url + '/libro/' + id, requestOptions);
    }

    putLibro(id: number, body: any) {
        let auth_token = localStorage.getItem('token');

        let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}` 
        })

        const requestOptions = {headers: headers}

        return this.httpClient.put(this.url + '/libro/' + id, body, requestOptions);
    }

    deleteLibro(id: number) {
        let auth_token = localStorage.getItem('token');

        let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}` 
        })

        const requestOptions = {headers: headers}

        return this.httpClient.delete(this.url + '/libro/' + id, requestOptions);
    }
}
