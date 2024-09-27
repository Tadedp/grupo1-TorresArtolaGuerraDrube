import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})

export class GridComponent {

    headers: any[] = [];
    rows: any[] = [];
    gridColumns = '0';

    currentPage: number = 1;
    pageSize: number = 6;  
    pagedRows: any[] = [];
    totalPages: number = 10;
    @Input() url = '';

    constructor(
        private router: Router, 

    ) {}

    ngOnInit() {
        const currentRoute = this.router.url;

        if (currentRoute.includes('prestamos')) {
            this.gridColumns = '6'

            this.headers = [
                { name: 'ID', sortDirection: 'down' },
                { name: 'Libro', sortDirection: 'down' },
                { name: 'Usuario', sortDirection: 'down' },
                { name: 'Fecha de Inicio', sortDirection: 'down' },
                { name: 'Fecha de Fin', sortDirection: 'down' }
            ];

            this.rows = [
                { id: 23, libro: 'Demian', autor: 'Herman Hesse', usuario: 'juancito123', nombre: 'Juan', apellido: 'Torres', fechaInicio: '13-09-2021', fechaFin: '20-09-2021' },
                { id: 12, libro: 'Orgullo y prejuicio', autor: 'Jane Austen', usuario: 'celinaguerra', nombre: 'Celina', apellido: 'Guerra', fechaInicio: '09-11-2023', fechaFin: '16-11-2023' },
                { id: 32, libro: 'Drácula', autor: 'Bram Stoker', usuario: 'tadedp', nombre: 'Tadeo', apellido: 'Drube', fechaInicio: '27-08-2019', fechaFin: '03-09-2019' },
                { id: 5, libro: 'Cien años de soledad', autor: 'Gabriel García Marquez', usuario: 'valeartola', nombre: 'Valentina', apellido: 'Artola', fechaInicio: '18-08-2023', fechaFin: '25-08-2023' },
                { id: 21, libro: 'Harry Potter y la piedra filosofal', autor: 'J.K. Rowling', usuario: 'valencora', nombre: 'Valentin', apellido: 'Coratolo', fechaInicio: '13-09-2021', fechaFin: '20-09-2021' },
                { id: 56, libro: 'Don Quijote de la Mancha', autor: 'Gabriel García Marquez', usuario: 'almaquinteros', nombre: 'Alma', apellido: 'Quinteros', fechaInicio: '09-11-2023', fechaFin: '16-11-2023' },
                { id: 123, libro: 'Cumbres Borrascosas', autor: 'Emily Bronte', usuario: 'sofisoler', nombre: 'Sofia', apellido: 'Soler', fechaInicio: '27-08-2019', fechaFin: '03-09-2019' },
                { id: 13, libro: 'El código Da Vinci', autor: 'Dan Brown', usuario: 'brunopiastre', nombre: 'Bruno', apellido: 'Pîastrellini', fechaInicio: '09-11-2023', fechaFin: '16-11-2023' },
                { id: 45, libro: '1984', autor: 'George Orwell', usuario: 'emimasso', nombre: 'Emiliano', apellido: 'Massolin', fechaInicio: '27-08-2019', fechaFin: '03-09-2019' },
                { id: 64, libro: 'Crimen y castigo', autor: 'Flódor Dostoyevski', usuario: 'juanmaidar', nombre: 'Juan Manuel', apellido: 'Aidar', fechaInicio: '18-08-2023', fechaFin: '25-08-2023' },
                { id: 70, libro: 'Divina comedia', autor: 'Dante Alighieri', usuario: 'dinomeschi', nombre: 'Dino', apellido: 'Meschini', fechaInicio: '13-09-2021', fechaFin: '20-09-2021' },
                { id: 19, libro: 'Diario de Ana Frank', autor: 'Ana Frank', usuario: 'juancruz', nombre: 'Juan', apellido: 'Herrera', fechaInicio: '09-11-2023', fechaFin: '16-11-2023' },
                { id: 20, libro: 'La casa de los espíritus', autor: 'Isabel Allende', usuario: 'vickytorres', nombre: 'Victoria', apellido: 'Torres', fechaInicio: '18-08-2023', fechaFin: '25-08-2023' },
                { id: 7, libro: 'El retrato de Dorian Gray', autor: 'Oscar Wilde', usuario: 'emicora', nombre: 'Emiliano', apellido: 'Coratolo', fechaInicio: '13-09-2021', fechaFin: '20-09-2021' }
            ];

        } else if (currentRoute.includes('usuarios')) {
            this.gridColumns = '2'

            this.headers = [
                { name: 'ID', sortDirection: 'down' },
                { name: 'Usuario', sortDirection: 'down' },
            ];

            this.rows = [
                { id: 45698, alias: 'juancito123', nombre: 'Juan', apellido: 'Torres'},
                { id: 12369, alias: 'celinaguerra', nombre: 'Celina', apellido: 'Guerra'},
                { id: 45693, alias: 'tadedp', nombre: 'Tadeo', apellido: 'Drube'},
                { id: 74589, alias: 'valeartola', nombre: 'Valentina', apellido: 'Artola'},
                { id: 41258, alias: 'valencora', nombre: 'Valentin', apellido: 'Coratolo'},
                { id: 41255, alias: 'almaquinteros', nombre: 'Alma', apellido: 'Quinteros'},
                { id: 42589, alias: 'sofisoler', nombre: 'Sofia', apellido: 'Soler'},
                { id: 96325, alias: 'vickytorres', nombre: 'Victoria', apellido: 'Torres'},
                { id: 74125, alias: 'emicora', nombre: 'Emiliano', apellido: 'Coratolo'},
                { id: 85236, alias: 'brunopiastre', nombre: 'Bruno', apellido: 'Pîastrellini'},
                { id: 123569, alias: 'juanmaidar', nombre: 'Juan Manuel', apellido: 'Aidar'},
                { id: 97834, alias: 'emimasso', nombre: 'Emiliano', apellido: 'Massolin'},
                { id: 43733, alias: 'dinomeschi', nombre: 'Dino', apellido: 'Meschini'},
                { id: 70702, alias: 'juancruz', nombre: 'Juan', apellido: 'Herrera'}
            ];

        } else if (currentRoute.includes('libros')) {
            this.gridColumns = '4'

            this.headers = [
                { name: 'ID', sortDirection: 'down' },
                { name: 'Título', sortDirection: 'down' },
                { name: 'Estado', sortDirection: 'down' },
                { name: 'Stock', sortDirection: 'down' }
            ];

            this.rows = [
                { id: 125, titulo: 'Demian', autor: 'Herman Hesse', estado: 'No Disponible', stock: 0 },
                { id: 123, titulo: 'Orgullo y prejuicio', autor: 'Jane Austen', estado: 'Disponible', stock: 3 },
                { id: 256, titulo: 'Drácula', autor: 'Bram Stoker', estado: 'No Disponible', stock: 0 },
                { id: 598, titulo: 'Cien años de soledad', autor: 'Gabriel García Marquez', estado: 'Disponible', stock: 4 },
                { id: 857, titulo: 'Harry Potter y la piedra filosofal', autor: 'J.K. Rowling', estado: 'No Disponible', stock: 0 },
                { id: 115, titulo: 'Don Quijote de la Mancha', autor: 'Gabriel García Marquez', estado: 'Disponible', stock: 2 },
                { id: 975, titulo: 'Cumbres borrascosas', autor: 'Emily Bronte', estado: 'Disponible', stock: 5 },
                { id: 257, titulo: 'El código Da Vinci', autor: 'Dan Brown', estado: 'Disponible', stock: 1 },
                { id: 900, titulo: '1984', autor: 'George Orwell', estado: 'No Disponible', stock: 5 },
                { id: 850, titulo: 'Crimen y castigo', autor: 'Flódor Dostoyevski', estado: 'Disponible', stock: 10 },
                { id: 707, titulo: 'Divina comedia', autor: 'Dante Alighieri', estado: 'No Disponible', stock: 0 },
                { id: 198, titulo: 'Diario de Ana Frank', autor: 'Ana Frank', estado: 'Disponible', stock: 5 },
                { id: 206, titulo: 'La casa de los espíritus', autor: 'Isabel Allende', estado: 'Disponible', stock: 8 },
                { id: 756, titulo: 'El retrato de Dorian Gray', autor: 'Oscar Wilde', estado: 'No Disponible', stock: 0 }
            ];

        } else if (currentRoute.includes('notificaciones')) {
            this.gridColumns = '4'

            this.headers = [
                { name: 'Fecha', sortDirection: 'down' },
                { name: 'Libro', sortDirection: 'down' },
                { name: 'Usuario', sortDirection: 'down' }
            ];

            this.rows = [
                { fecha: '13-09-2021', libro: 'Demian', usuario: 'juancito123'},
                { fecha: '09-11-2023', libro: 'Orgullo y prejuicio', usuario: 'celinaguerra '},
                { fecha: '09-11-2023', libro: 'Drácula', usuario: 'tadedp'},
                { fecha: '18-08-2023', libro: 'Cien años de soledad', usuario: 'valeartola'},
                { fecha: '13-09-2021', libro: 'Harry Potter y la piedra filosofal', usuario: 'valencora'},
                { fecha: '07-11-2023', libro: 'Don Quijote de la Mancha', usuario: 'almaquinteros'},
                { fecha: '09-12-2023', libro: 'Cumbres borrascosas', usuario: 'sofisoler'},
                { fecha: '13-09-2021', libro: 'El codigo Da Vinci', usuario: 'brunopiastre'},
                { fecha: '09-11-2023', libro: '1984', usuario: 'emimasso'},
                { fecha: '09-11-2023', libro: 'Crimen y castigo', usuario: 'juanmaidar'},
                { fecha: '20-08-2023', libro: 'Divina comedia', usuario: 'dinomeschi'},
                { fecha: '19-11-2023', libro: 'El diario de Ana Frank', usuario: 'valencora'},
                { fecha: '13-09-2021', libro: 'La casa de los espiritus', usuario: 'vickytorres'},
                { fecha: '09-11-2023', libro: 'El retrato de Dorian Gray', usuario: 'fedepalumbo'},
                { fecha: '03-11-2023', libro: 'Rebelión en la granja', usuario: 'camichoque'}
            ];
        }

        this.totalPages = Math.ceil(this.rows.length / this.pageSize);
        this.updatePagedRows();
    }

    onPageChanged(newPage: number) {
        this.currentPage = newPage;
        this.updatePagedRows();
    }

    updatePagedRows() {
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        this.pagedRows = this.rows.slice(start, end);
    }

    getRouter(): string {
        return this.router.url;
    }

    toggleSortDirection(header: any) {
        header.sortDirection = header.sortDirection === 'down' ? 'up' : 'down';
        this.sortGrid(header);
        this.updatePagedRows(); 
    }

    parseDate(dateString: string): Date {
        const parts = dateString.split('-');
        return new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
    }

    sortGrid(header: any) {
        const currentRoute = this.router.url;
        var fieldMap: any = {}

        if (currentRoute.includes('prestamos')) {
            fieldMap = {
                'ID': 'id',
                'Libro': 'libro',
                'Usuario': 'usuario',
                'Fecha de Inicio': 'fechaInicio',
                'Fecha de Fin': 'fechaFin'
            };

        } else if (currentRoute.includes('usuarios')) {
            fieldMap = {
                'ID': 'id',
                'Usuario': 'alias'
            }; 
            
        } else if (currentRoute.includes('libros')) {
            fieldMap = {
                'ID': 'id',
                'Título': 'titulo',
                'Estado': 'estado',
                'Stock': 'stock'
            }; 

        } else if (currentRoute.includes('notificaciones')) {
            fieldMap = {
                'Fecha': 'fecha',
                'Libro': 'libro',
                'Usuario': 'usuario',
            }; 
        }
        
        const column = fieldMap[header.name]; 
        const direction = header.sortDirection === 'down' ? 1 : -1;
    
        this.rows.sort((a: any, b: any) => {
            if (column === 'fechaInicio' || column === 'fechaFin' || column === 'fecha') {
                const dateA = this.parseDate(a[column]);
                const dateB = this.parseDate(b[column]);
                return (dateA.getTime() - dateB.getTime()) * direction;
            }
            
            if (a[column] < b[column]) {
                return -1 * direction;
            } else if (a[column] > b[column]) {
                return 1 * direction;
            }
            return 0;
        });
    }

    navigate() {
        this.router.navigate([this.url]);
    }

}

