import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-am-prestamo',
  templateUrl: './am-prestamo.component.html',
  styleUrl: './am-prestamo.component.css'
})
export class AmPrestamoComponent {
    tipoUrl: string = '';

    constructor(private router: Router) { }
  
    ngOnInit(): void {
        if (this.router.url.includes("agregar")){
            this.tipoUrl = "agregar";
        } else if (this.router.url.includes('editar')) {
            this.tipoUrl = "editar";
        }
    }
}
