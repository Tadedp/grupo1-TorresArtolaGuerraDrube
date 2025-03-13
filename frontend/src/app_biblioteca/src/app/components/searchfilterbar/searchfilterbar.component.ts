import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-searchfilterbar',
    templateUrl: './searchfilterbar.component.html',
    styleUrl: './searchfilterbar.component.css'
})

export class SearchfilterbarComponent implements OnInit{
    dropdownItems: string[] = [];
    dropdownItemsBackUp: string[] = [];
    filtrosSeleccionados: string[] = [];
    barras: { filtro: string, valor: string }[] = [{ filtro: '', valor: '' }];
    valores = [''];

    @Output() search: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        private router: Router
    ) {}

    ngOnInit() {
        const currentRoute = this.router.url;

        if (currentRoute.includes('prestamos')) {
            this.barras = [{ filtro: 'Usuario ID', valor: '' }];
            this.dropdownItems = ['ID', 'Libro ID', 'Fecha Inicio', 'Fecha Fin'];
            this.dropdownItemsBackUp = ['ID', 'Libro ID', 'Usuario ID', 'Fecha Inicio', 'Fecha Fin'];
        } else if (currentRoute.includes('usuarios')) {
            this.barras = [{ filtro: 'Nombre', valor: '' }];
            this.dropdownItems = ['ID', 'Alias', 'Apellido', 'Mail', 'DNI', 'Telefono', 'Estado'];
            this.dropdownItemsBackUp = ['ID', 'Alias', 'Nombre', 'Apellido', 'Mail', 'DNI', 'Telefono','Estado'];
        } else if (currentRoute.includes('libros')) {
            this.barras = [{ filtro: 'Titulo', valor: '' }];
            this.dropdownItems = ['ID', 'Autor ID', 'Genero', 'Editorial', 'ISBN', 'Estado', 'Stock'];
            this.dropdownItemsBackUp = ['ID', 'Titulo', 'Autor ID', 'Genero', 'Editorial', 'ISBN', 'Estado', 'Stock'];
        } else if (currentRoute.includes('search')) {
            this.barras = [{ filtro: 'Titulo', valor: '' }];
            this.dropdownItems = ['Autor Nombre', 'Autor Apellido', 'ISBN', 'Genero', 'Editorial'];
            this.dropdownItemsBackUp = ['Autor Nombre', 'Autor Apellido', 'Titulo', 'ISBN', 'Genero', 'Editorial'];
        }

        this.filtrosSeleccionados.push(this.barras[0].filtro)
    }

    get maxBars(): number {
        return this.dropdownItemsBackUp.length;
    }

    removeBar(filtro: string) {
        this.filtrosSeleccionados.splice(this.filtrosSeleccionados.indexOf(filtro), 1)
        this.dropdownItems = []
        for (let item of this.dropdownItemsBackUp) {
            if (!this.filtrosSeleccionados.includes(item)){
                this.dropdownItems.push(item)
            }       
        }
        this.barras = this.barras.filter(barra => barra.filtro !== filtro);
        this.valores.pop()
    }

    emitBusqueda() {
        this.search.emit(this.barras);
    }

    seleccionarFiltro( filtro: string ) {
        if (this.barras.length < this.maxBars) {
            this.barras.push({ filtro: filtro, valor: '' });
            this.valores.push('')
        }

        this.barras[-1]
        this.filtrosSeleccionados.push(filtro)
        this.dropdownItems = []
        for (let item of this.dropdownItemsBackUp) {
            if (!this.filtrosSeleccionados.includes(item)){
                this.dropdownItems.push(item)
            }       
        }
    }
    
    inputIngresado(filtro: string, valor: string) {
        this.emitBusqueda();
    }
}
