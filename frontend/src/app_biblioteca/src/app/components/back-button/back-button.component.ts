import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.css'
})
export class BackButtonComponent {
    @Input() texto: string = '';
    @Input() url: string = '';

    constructor(
        private router: Router
    ) {}

    navigate() {
        this.router.navigate([this.url]);
    }
}
