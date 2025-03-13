import { Component, OnInit } from '@angular/core';
import { LibrosService } from '../../services/libros.service';
import { AutoresService } from '../../services/autores.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})

export class SearchComponent implements OnInit {
    libros: any[] = [];
    librosTodos: any[] = [];
    busqueda: { filtro: string, valor: string }[] = [];
    totalPaginas: number = 1;
    paginaActual: number = 1;
    filtrosActuales: any = {};
  
    constructor(
        private librosService: LibrosService,
        private autoresService: AutoresService
    ) {}
    
    ngOnInit(): void {    
        this.actualizarLibros(1);
    }

    actualizarLibros(pagina:number){
        this.filtrosActuales.per_page=10
        this.librosService.getLibros(pagina, this.filtrosActuales).subscribe((respuesta: any) => {
            this.libros = respuesta.libros || [];
            this.totalPaginas = respuesta.pages;
            this.paginaActual = respuesta.page;
            this.librosTodos = [...this.libros];
        });
    }

    busquedaFiltrada(busqueda: { filtro: string, valor: string }[]) {
        this.busqueda = [...busqueda];
        
        let autorNombre = '';
        let autorApellido = '';

        this.filtrosActuales = Object.assign( {}, ...this.busqueda.map(filtroObj => {
            const key = filtroObj.filtro.toLowerCase().replace(/\s+/g, "_");
            const value = filtroObj.valor;


            if (key === 'titulo' || key === 'genero' || key === 'editorial' || key === 'isbn' ) {
                    return { [key]: value };
            } else {
                if (key === 'autor_nombre') {
                    autorNombre = value;
                } else {
                    autorApellido = value;
                }
                
                return null
            }
        }));

        if ( autorNombre || autorApellido ) {
            let params: any = {}

            if (autorNombre) {
                params.nombre = autorNombre;
            } 

            if (autorApellido) {
                params.apellido = autorApellido;
            }

            this.autoresService.getAutores(1, params).subscribe((rta: any) => {
                let autorID: number = -1
                
                if (rta.autores.length > 0){
                    autorID = parseInt(rta.autores[0].id)
                }  

                this.filtrosActuales.autor_id = autorID;
                this.actualizarLibros(1)
            });

        } else {
            this.actualizarLibros(1)
        }
    }

    onPageChanged(nuevaPagina: number) {
        this.actualizarLibros(nuevaPagina);
    }
}

  