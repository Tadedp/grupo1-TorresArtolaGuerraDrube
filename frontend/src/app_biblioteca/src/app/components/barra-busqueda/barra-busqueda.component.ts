import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barra-busqueda',
  templateUrl: './barra-busqueda.component.html',
  styleUrls: ['./barra-busqueda.component.css']
})
export class BarraBusquedaComponent {
  searchText: string = ''; // Almacena el texto del input
  libros: { id: number, titulo: string }[] = [
    { id: 1, titulo: '1984' },
    { id: 2, titulo: 'Orgullo y Prejuicio' },
    { id: 3, titulo: 'Drácula' },
    { id: 4, titulo: 'Harry Potter y la Piedra Filosofal' }
  ];
  librosFiltrados: { id: number, titulo: string }[] = []; // Libros que coinciden con la búsqueda

  constructor(private router: Router) {}

  // Método para filtrar los libros según lo que escriba el usuario
  buscarLibros() {
    const texto = this.searchText.toLowerCase();
    this.librosFiltrados = this.libros.filter(libro => libro.titulo.toLowerCase().includes(texto));
  }

  // Método para redirigir a la página de detalles del libro usando el id
  verLibro(libro: { id: number, titulo: string }) {
    this.searchText = libro.titulo; // Actualiza el campo de búsqueda con el título
    this.librosFiltrados = []; // Limpia el dropdown

    // Redirige a la página de detalles usando el ID del libro
    this.router.navigate(['/libros/libro', libro.id]);
  }
}
