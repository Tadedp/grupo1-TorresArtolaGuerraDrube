import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-searchfilterbar',
    templateUrl: './searchfilterbar.component.html',
    styleUrl: './searchfilterbar.component.css'
})

export class SearchfilterbarComponent implements OnInit{
  
    dropdownItems: string[] = [];
    bars: number[] = [1];
    nextBar: number = 2;

    constructor(
        private router: Router
    ) {}

    ngOnInit() {
        const currentRoute = this.router.url;

        if (currentRoute.includes('prestamos')) {
            this.dropdownItems = ['ID', 'Libro', 'Usuario', 'Fecha de Inicio', 'Fecha de Fin'];
        } else if (currentRoute.includes('usuarios')) {
            this.dropdownItems = ['ID', 'Alias', 'Nombre', 'Apellido', 'Email', 'DNI', 'Teléfono'];
        } else if (currentRoute.includes('libros')) {
            this.dropdownItems = ['ID', 'Título', 'Autor', 'Género', 'Editorial', 'Estado', 'Stock'];
        }
    }

    get maxBars(): number {
        return this.dropdownItems.length;
    }

    addBar() {
        if (this.bars.length < this.maxBars) {
            this.bars.push(this.nextBar);
            this.nextBar++;
        }
    }

    removeBar(index: number) {
        if (this.bars.length > 1 && index != 1) {
            this.bars = this.bars.filter(bar => bar !== index);
        }
    }
}
