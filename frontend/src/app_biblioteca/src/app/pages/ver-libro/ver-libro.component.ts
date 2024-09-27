import { Component, OnInit } from '@angular/core';
import { CurrentUser } from '../../auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-libro',
  templateUrl: './ver-libro.component.html',
  styleUrl: './ver-libro.component.css'
})
export class VerLibroComponent implements OnInit{
  nombresUsuarios: string[] = ['vicky', 'tadeo', 'celi', 'vale'];
  resenias: string[] = ['muy bueno', 'no me gusto mucho', 'maso maso', 'malisimo'];
  valoraciones: number[] = [4.5, 2.5, 3, 1]; // Agrega las valoraciones aquí

  userRol: string = '';

  constructor (
    private currentUserService: CurrentUser,
    private router: Router) {}

  ngOnInit(): void {
    this.userRol = this.currentUserService.getUserrol();
  }

  isAdmin(): boolean {
    return this.userRol === 'Admin';
  }

  isUser(): boolean {
    return this.userRol === 'Usuario';
  }

  isUserNoReg(): boolean {
    return this.userRol === '';
  }

  navigateToDatosLibro() {
    this.router.navigate(['/datos-libro']);
  }

  navigateToSolicitarLibro() {
    this.router.navigate(['/solicitar-libro']);
  }

  navigateToEnviarResenia() {
    this.router.navigate(['/enviar-resenia']);
  }


}
