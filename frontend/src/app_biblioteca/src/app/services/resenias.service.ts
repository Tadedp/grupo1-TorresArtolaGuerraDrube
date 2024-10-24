import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ReseniasService {
    url = '/api';
    
    constructor(
        private httpClient:HttpClient
    ) { }

    getResenias(page: number, params?: { per_page?: number, id?: number, valoracion?: number, fecha?: string, id_libro?: number, id_usuario?: number, sortby_valoracion?: string, sortby_fecha?: string }) {
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
            if (params.valoracion) {
                httpParams = httpParams.set('valoracion', params.valoracion);
            }
            if (params.fecha) {
                httpParams = httpParams.set('fecha', params.fecha);
            }
            if (params.id_libro) {
                httpParams = httpParams.set('id_libro', params.id_libro);
            }
            if (params.id_usuario) {
                httpParams = httpParams.set('id_usuario', params.id_usuario);
            }
            if (params.sortby_valoracion) {
                httpParams = httpParams.set('sortby_valoracion', params.sortby_valoracion);
            }
            if (params.sortby_fecha) {
                httpParams = httpParams.set('sortby_fecha', params.sortby_fecha);
            }
        }
        
        const requestOptions = { headers: headers, params: httpParams }

        return this.httpClient.get(this.url + '/reseñas' , requestOptions);
    }

    postResenia(body: any) {
        let auth_token = localStorage.getItem('token');

        let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}` 
        })

        const requestOptions = {headers: headers}
        
        return this.httpClient.post(this.url + '/reseñas', body, requestOptions);
    }

    deleteReseña(id: number) {
        let auth_token = localStorage.getItem('token');

        let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}` 
        })

        const requestOptions = {headers: headers}

        return this.httpClient.delete(this.url + '/reseña/' + id, requestOptions);
    }
}
