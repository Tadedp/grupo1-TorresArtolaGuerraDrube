import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'

@Injectable({
    providedIn: 'root'
})
export class NotificacionesService {
    url = '/api';
    
    constructor(
        private httpClient:HttpClient
    ) { }

    getNotificaciones(page: number, params?: { per_page?: number, sortby_fecha?: string }) {
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
            if (params.sortby_fecha) {
                httpParams = httpParams.set('sortby_fecha', params.sortby_fecha);
            }
        }
        
        const requestOptions = { headers: headers, params: httpParams }

        return this.httpClient.get(this.url + '/notificaciones' , requestOptions);
    }

    postNotificacion(body: any) {
        let auth_token = localStorage.getItem('token');

        let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}` 
        })

        const requestOptions = {headers: headers}
        
        return this.httpClient.post(this.url + '/notificaciones', body, requestOptions);
    }

    getNotificacion(id: number) {
        let auth_token = localStorage.getItem('token');

        let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}` 
        })

        const requestOptions = {headers: headers}

        return this.httpClient.get(this.url + '/notificacion/' + id, requestOptions);
    }

    deleteNotificacion(id: number) {
        let auth_token = localStorage.getItem('token');

        let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}` 
        })

        const requestOptions = {headers: headers}

        return this.httpClient.delete(this.url + '/notificacion/' + id, requestOptions);
    }
}
