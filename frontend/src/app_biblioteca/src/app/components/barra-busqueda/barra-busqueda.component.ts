import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-barra-busqueda',
    templateUrl: './barra-busqueda.component.html',
    styleUrls: ['./barra-busqueda.component.css']
})

export class BarraBusquedaComponent {
    searchText: string = ''; 
    libros: { id: number, titulo: string }[] = [
        { id: 1, titulo: '1984' },
        { id: 2, titulo: 'Orgullo y Prejuicio' },
        { id: 3, titulo: 'Drácula' },
        { id: 4, titulo: 'Harry Potter y la Piedra Filosofal' }
    ];
    librosFiltrados: { id: number, titulo: string }[] = []; 
    
    constructor(
        private router: Router
    ) {}

    buscarLibros() {
        const texto = this.searchText.toLowerCase();
        this.librosFiltrados = this.libros.filter(libro => libro.titulo.toLowerCase().includes(texto));
    }

    verLibro(libro: { id: number, titulo: string }) {
        this.searchText = libro.titulo; 
        this.librosFiltrados = []; 


        this.router.navigate(['/libro/1']);
    }
}
