import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentUser {

  private currentUser: { email: string, rol: string } = {email:'hola', rol:'Usuario'};
  
  getUserrol() {
    return this.currentUser?.rol
  }
}
