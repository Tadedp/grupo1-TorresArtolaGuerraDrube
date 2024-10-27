import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LibrosService } from '../../services/libros.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {
    rolSesion = localStorage.getItem('rol');
    librosNovela: any[] = [];
    ultimosIngresos:any[] = [];
    librosMejorReseniados: any[] = [];

    constructor (
        private router: Router,
        private librosService: LibrosService,
    ) {}

    ngOnInit(): void {
        this.librosService.getLibros(1).subscribe((rta_pagina_1: any) => {
            const total_libros = rta_pagina_1.total
            
            var esNovela = { genero: "Novela", per_page: total_libros };
            this.librosService.getLibros(1, esNovela).subscribe((rta: any) => {
                console.log('Return api: ', rta);
                this.librosNovela = rta.libros || [];
            });

            var nuevoIngreso = {sortby_id: 'desc', per_page: total_libros }
            this.librosService.getLibros(1, nuevoIngreso).subscribe((rta:any) => { 
                console.log('Return api: ', rta );
                this.ultimosIngresos = rta.libros || [];
            });

            const mejoresValorados = { per_page: total_libros }
            this.librosService.getLibros(1, mejoresValorados).subscribe((rta_total_libros: any) => {
                let libros = rta_total_libros.libros || [];
        
                this.librosMejorReseniados = libros
                    .map((libro: any) => {
                        const totalReseñas = libro.reseñas.length;
                        const promedioValoracion = totalReseñas > 0
                            ? libro.reseñas.reduce((acc: number, reseña: any) => acc + reseña.valoracion, 0) / totalReseñas
                            : 0;
                        return {...libro, promedioValoracion};
                    })
                    .sort((a: any, b: any) => b.promedioValoracion - a.promedioValoracion); 
            });
        })
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

    navigateToLibro(){
        this.router.navigate(['/libro/1']);
    }
}
