import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-am-libro',
  templateUrl: './am-libro.component.html',
  styleUrl: './am-libro.component.css'
})
export class AmLibroComponent {
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
