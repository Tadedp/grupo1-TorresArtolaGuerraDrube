import { Component } from '@angular/core';
import { CurrentUser } from '../../auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
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

  navigateToLibro(){
    this.router.navigate(['/ver-libro']);
  }
}
