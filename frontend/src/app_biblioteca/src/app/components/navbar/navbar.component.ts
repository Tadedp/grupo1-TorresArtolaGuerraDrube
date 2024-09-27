import { Component, OnInit } from '@angular/core';
import { CurrentUser } from '../../auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit{
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

  navigateToProfile() {
    this.router.navigate(['/perfil']);
  }

  navigateToNotifications() {
    this.router.navigate(['/notificaciones']);
  }

}
