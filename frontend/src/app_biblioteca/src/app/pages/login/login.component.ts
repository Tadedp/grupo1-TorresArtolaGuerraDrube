import { Component } from '@angular/core';
import { CurrentUser } from '../../auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private CurrentUser: CurrentUser) {}

  isUsernoReg(): boolean {
    return this.CurrentUser.getUserrol() === '';
  }

}
