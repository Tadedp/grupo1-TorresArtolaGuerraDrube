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

    getNotificaciones(page: number, params?: { sortby_fecha?: string }) {
        let auth_token = localStorage.getItem('token');

        let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}` 
        })

        let httpParams = new HttpParams().set('page', page.toString());

        if (params) {
            if (params.sortby_fecha) {
                httpParams = httpParams.set('sortby_fecha', params.sortby_fecha);
            }
        }
        
        const requestOptions = { headers: headers, params: httpParams }

        return this.httpClient.get(this.url + '/notificaciones' , requestOptions);
    }

    postNotificacion() {
        let auth_token = localStorage.getItem('token');

        let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}` 
        })

        //const body = 
        const requestOptions = {headers: headers}
        
        return this.httpClient.post(this.url + '/notificaciones', requestOptions);
    }

    getNotificacion(id: number) {
        let auth_token = localStorage.getItem('token');

        let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}` 
        })

        //const body =
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
