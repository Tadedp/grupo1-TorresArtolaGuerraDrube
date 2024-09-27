import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUser } from '../../auth';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})

export class FooterComponent implements OnInit {

  userRol: string = '';

  constructor (
    private currentUserService: CurrentUser,
    private router: Router,
  ) {}

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

  navigateToLibros() {
    this.router.navigate(['/libros']);
  }

  navigateToUsuarios() {
    this.router.navigate(['/usuarios']);
  }

  navigateToPrestamos() {
    this.router.navigate(['/prestamos']);
  }

  navigateToBuscar(){
    this.router.navigate(['/search']);
  }

  navigateToMisPrestamos(){
    this.router.navigate(['/prestamos-usuarios']);
  }

  navigateToHome(){
    this.router.navigate(['/home']);
  }

}
