import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-red-button',
    templateUrl: './red-button.component.html',
    styleUrls: ['./red-button.component.css']
})
export class RedButtonComponent {
    @Input() texto: string = '';
    @Input() url: string = '';

    constructor(private router: Router) {}

    navigate() {
        this.router.navigate([this.url]);
    }
}