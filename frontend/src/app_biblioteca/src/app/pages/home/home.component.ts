interface Libro {
    id: number;
    titulo: string;
    portada: string;
    autor: {
      nombre: string;
      apellido: string;
    };
    reseñas?: { valoracion: number }[];
    genero?: string;
    estado?: string;
  }

import { Component } from '@angular/core';
import { LibrosService } from '../../services/libros.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {
    rolSesion = localStorage.getItem('rol');
    librosNovela: Libro[] = [];
    ultimosIngresos:Libro[] = [];
    librosMejorReseniados: Libro[] = [];
    librosDisponibles: Libro[] = [];

    constructor (
        private librosService: LibrosService,
    ) {}
    
    ngOnInit(): void {
        this.librosService.getLibros(1).subscribe((rta: any) => {
            const totalLibros = rta.total;
            this.librosService.getLibros(1, { per_page: totalLibros }).subscribe((respuesta: any) => {
                const libros: Libro[] = respuesta.libros || [];
                this.librosMejorReseniados = libros
                .map((libro: Libro) => ({
                    ...libro,
                    promedioValoracion: libro.reseñas?.length
                    ? libro.reseñas.reduce((acc, res) => acc + res.valoracion, 0) / libro.reseñas.length
                    : 0
                }))
                .sort((a, b) => b.promedioValoracion - a.promedioValoracion)
                .slice(0, 5);
                this.ultimosIngresos = [...libros]
                .sort((a, b) => b.id - a.id)
                .slice(0, 10);
                this.librosNovela = libros.filter(libro => libro.genero?.toLowerCase() === 'novela');
                this.librosDisponibles = libros.filter(libro => libro.estado?.toLowerCase() === 'disponible');
            }
        )});
    
    }

    isAdmin(): boolean {
        return this.rolSesion === 'Admin';
    }

    isUser(): boolean {
        return this.rolSesion === 'Usuario';
    }

    isUserNoReg(): boolean {
        return this.rolSesion === null;
    }
}