import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-blue-button',
    templateUrl: './blue-button.component.html',
    styleUrls: ['./blue-button.component.css']
})
export class BlueButtonComponent {
    @Input() texto: string = '';
    @Input() url: string = '';

    constructor(private router: Router) {}

    navigate() {
        this.router.navigate([this.url]);
    }
}