import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-am-usuario',
  templateUrl: './am-usuario.component.html',
  styleUrl: './am-usuario.component.css'
})
export class AmUsuarioComponent {
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
