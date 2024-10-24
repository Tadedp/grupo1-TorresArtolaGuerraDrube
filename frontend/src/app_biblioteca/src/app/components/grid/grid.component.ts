import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service'
import { PrestamosService } from '../../services/prestamos.service'
import { LibrosService } from '../../services/libros.service'
import { NotificacionesService } from '../../services/notificaciones.service'

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})

export class GridComponent {
    @Input() url = '';

    headers: any[] = [];
    gridColumns = '0'; 
    arrayFilas:any[] = []
    filteredFilas:any[] = [...this.arrayFilas]

    currentPage: number = 1;
    totalPages: number = 1;
    pageSize: number = 6;  
    pagedRows: any[] = [];

    constructor(
        private router: Router, 
        private usuariosService: UsuariosService,
        private prestamosService: PrestamosService,
        private librosService: LibrosService,
        private notificacionesService: NotificacionesService
    ) {}

    ngOnInit() {
        const currentRoute = this.router.url;

        if (currentRoute.includes('prestamos')) {
            this.gridColumns = '6'

            this.headers = [
                { name: 'ID', sortDirection: 'desc' },
                { name: 'Libro', sortDirection: 'desc' },
                { name: 'Usuario', sortDirection: 'desc' },
                { name: 'Fecha de Inicio', sortDirection: 'desc' },
                { name: 'Fecha de Fin', sortDirection: 'desc' }
            ];

            this.prestamosService.getPrestamos(1).subscribe((rta:any) => { 
                console.log('Return api: ', rta );
                this.arrayFilas = rta.prestamos || [];
                this.filteredFilas = [...this.arrayFilas]
                this.currentPage = rta.page
                this.totalPages = rta.pages
            })

        } else if (currentRoute.includes('usuarios')) {
            this.gridColumns = '2'

            this.headers = [
                { name: 'ID', sortDirection: 'desc' },
                { name: 'Usuario', sortDirection: 'desc' },
            ];

            this.usuariosService.getUsuarios(1).subscribe((rta:any) => { 
                console.log('Return api: ', rta );
                this.arrayFilas = rta.usuarios || [];
                this.filteredFilas = [...this.arrayFilas]
                this.currentPage = rta.page
                this.totalPages = rta.pages
            })

        } else if (currentRoute.includes('libros')) {
            this.gridColumns = '4'

            this.headers = [
                { name: 'ID', sortDirection: 'desc' },
                { name: 'Titulo', sortDirection: 'desc' },
                { name: 'Estado', sortDirection: 'desc' },
                { name: 'Stock', sortDirection: 'desc' }
            ];
    
            this.librosService.getLibros(1).subscribe((rta:any) => { 
                console.log('Return api: ', rta );
                this.arrayFilas = rta.libros || [];
                this.filteredFilas = [...this.arrayFilas]
                this.currentPage = rta.page
                this.totalPages = rta.pages
            })

        } else if (currentRoute.includes('notificaciones')) {
            this.gridColumns = '4'

            this.headers = [
                { name: 'Fecha', sortDirection: 'desc' },
                { name: 'Libro', sortDirection: 'desc' },
                { name: 'Usuario', sortDirection: 'desc' }
            ];

            this.notificacionesService.getNotificaciones(1).subscribe((rta:any) => { 
                console.log('Return api: ', rta);

                const notificaciones = rta.notificaciones || [];
                this.arrayFilas = [];
        
                notificaciones.forEach((notificacion: any) => {
                    const mensaje = notificacion.mensaje;
        
                    const partes = mensaje.split(/[()]/);
                    const idLibro = partes[1]?.trim();
                    const idUsuario = partes[3]?.trim();

                    const fechaRegex = /\d{4}-\d{2}-\d{2}/;
                    const fechaMatch = mensaje.match(fechaRegex);
                    const fecha_inicio = fechaMatch ? fechaMatch[0] : null;

                    this.librosService.getLibro(idLibro).subscribe((libro: any) => {
                        this.usuariosService.getUsuario(idUsuario).subscribe((usuario: any) => {
                            this.arrayFilas.push({
                                id: notificacion.id,
                                fecha: notificacion.fecha,
                                fecha_inicio: fecha_inicio,     
                                id_libro: idLibro,
                                libroTitulo: libro.titulo,
                                libroAutor: libro.autor.nombre + " " + libro.autor.apellido,
                                id_usuario: idUsuario,
                                usuarioAlias: usuario.alias,
                                usuarioNombre: usuario.nombre + " " + usuario.apellido
                            });

                            this.filteredFilas = [...this.arrayFilas];
                        });
                    });
                });

                this.currentPage = rta.page;
                this.totalPages = rta.pages;
            });
        }    
    }

    onPageChanged(newPage: number) {
        this.currentPage = newPage;
        const currentRoute = this.router.url;

        if (currentRoute.includes('prestamos')) {

            this.prestamosService.getPrestamos(newPage).subscribe((rta:any) => { 
                console.log('Return api: ', rta );
                this.arrayFilas = rta.prestamos || [];
                this.filteredFilas = [...this.arrayFilas]
                this.currentPage = rta.page
                this.totalPages = rta.pages
            })

        } else if (currentRoute.includes('usuarios')) {
            
            this.usuariosService.getUsuarios(newPage).subscribe((rta:any) => { 
                console.log('Return api: ', rta );
                this.arrayFilas = rta.usuarios || [];
                this.filteredFilas = [...this.arrayFilas]
                this.currentPage = rta.page
                this.totalPages = rta.pages
            })

        } else if (currentRoute.includes('libros')) {

            this.librosService.getLibros(newPage).subscribe((rta:any) => { 
                console.log('Return api: ', rta );
                this.arrayFilas = rta.libros || [];
                this.filteredFilas = [...this.arrayFilas]
                this.currentPage = rta.page
                this.totalPages = rta.pages
            })

        } else if (currentRoute.includes('notificaciones')) {
         
            this.notificacionesService.getNotificaciones(newPage).subscribe((rta:any) => { 
                console.log('Return api: ', rta);

                const notificaciones = rta.notificaciones || [];
                this.arrayFilas = [];
        
                notificaciones.forEach((notificacion: any) => {
                    const mensaje = notificacion.mensaje;
        
                    const partes = mensaje.split(/[()]/);
                    const idLibro = partes[1]?.trim();
                    const idUsuario = partes[3]?.trim();

                    const fechaRegex = /\d{4}-\d{2}-\d{2}/;
                    const fechaMatch = mensaje.match(fechaRegex);
                    const fecha_inicio = fechaMatch ? fechaMatch[0] : null;

                    this.librosService.getLibro(idLibro).subscribe((libro: any) => {
                        this.usuariosService.getUsuario(idUsuario).subscribe((usuario: any) => {
                            this.arrayFilas.push({
                                id: notificacion.id,
                                fecha: notificacion.fecha,
                                fecha_inicio: fecha_inicio,     
                                id_libro: idLibro,
                                libroTitulo: libro.titulo,
                                libroAutor: libro.autor.nombre + " " + libro.autor.apellido,
                                id_usuario: idUsuario,
                                usuarioAlias: usuario.alias,
                                usuarioNombre: usuario.nombre + " " + usuario.apellido
                            });

                            this.filteredFilas = [...this.arrayFilas];
                        });
                    });
                });

                this.currentPage = rta.page;
                this.totalPages = rta.pages;
            });
        }
    }
    
    sortGrid(header: any){
        const currentRoute = this.router.url;
        const parametro: any = {};
        let key: string = ''

        if (currentRoute.includes('prestamos')) {
            
            if (header.name == 'Libro') {
                key = 'sortby_libro_titulo'
            
            } else if (header.name == 'Usuario') {
                key = 'sortby_usuario_alias'
            
            } else if (header.name == 'Fecha de Inicio') {
                key = 'sortby_fecha_inicio'
            
            } else if (header.name == 'Fecha de Fin') {
                key = 'sortby_fecha_fin'
    
            } else {
                key = 'sortby_' + header.name.toLowerCase()
            
            }

            parametro[key] = header.sortDirection;

            this.prestamosService.getPrestamos(this.currentPage, parametro).subscribe((rta:any) => { 
                console.log('Return api: ', rta );
                this.arrayFilas = rta.prestamos || [];
                this.filteredFilas = [...this.arrayFilas]
                this.currentPage = rta.page
                this.totalPages = rta.pages
            })

        } else if (currentRoute.includes('usuarios')) {
            
            if (header.name == 'Usuario') {
                key = 'sortby_alias'
            
            } else {
                key = 'sortby_' + header.name.toLowerCase()
            
            }

            parametro[key] = header.sortDirection;

            this.usuariosService.getUsuarios(this.currentPage, parametro).subscribe((rta:any) => { 
                console.log('Return api: ', rta );
                this.arrayFilas = rta.usuarios || [];
                this.filteredFilas = [...this.arrayFilas]
                this.currentPage = rta.page
                this.totalPages = rta.pages
            })

        } else if (currentRoute.includes('libros')) {

            key = 'sortby_' + header.name.toLowerCase()

            parametro[key] = header.sortDirection;

            this.librosService.getLibros(this.currentPage, parametro).subscribe((rta:any) => { 
                console.log('Return api: ', rta );
                this.arrayFilas = rta.libros || [];
                this.filteredFilas = [...this.arrayFilas]
                this.currentPage = rta.page
                this.totalPages = rta.pages
            })

        } else if (currentRoute.includes('notificaciones')) {
            
            if ( header.name == "Fecha" ) {
                key = 'sortby_' + header.name.toLowerCase()

                parametro[key] = header.sortDirection;
            
                this.notificacionesService.getNotificaciones(this.currentPage, parametro).subscribe((rta:any) => { 
                    console.log('Return api: ', rta);

                    const notificaciones = rta.notificaciones || [];
                    this.arrayFilas = [];
            
                    notificaciones.forEach((notificacion: any) => {
                        const mensaje = notificacion.mensaje;
            
                        const partes = mensaje.split(/[()]/);
                        const idLibro = partes[1]?.trim();
                        const idUsuario = partes[3]?.trim();

                        const fechaRegex = /\d{4}-\d{2}-\d{2}/;
                        const fechaMatch = mensaje.match(fechaRegex);
                        const fecha_inicio = fechaMatch ? fechaMatch[0] : null;

                        this.librosService.getLibro(idLibro).subscribe((libro: any) => {
                            this.usuariosService.getUsuario(idUsuario).subscribe((usuario: any) => {
                                this.arrayFilas.push({
                                    id: notificacion.id,
                                    fecha: notificacion.fecha,
                                    fecha_inicio: fecha_inicio,     
                                    id_libro: idLibro,
                                    libroTitulo: libro.titulo,
                                    libroAutor: libro.autor.nombre + " " + libro.autor.apellido,
                                    id_usuario: idUsuario,
                                    usuarioAlias: usuario.alias,
                                    usuarioNombre: usuario.nombre + " " + usuario.apellido
                                });

                                this.filteredFilas = [...this.arrayFilas];
                            });
                        });
                    });

                    this.currentPage = rta.page;
                    this.totalPages = rta.pages;
                });

            } else if ( header.name == "Libro" ) { 
                const direction = header.sortDirection === 'asc' ? 1 : -1;

                this.arrayFilas.sort((a: any, b: any) => {
                    const libroA = a.libroTitulo.toLowerCase();
                    const libroB = b.libroTitulo.toLowerCase();
            
                    if (libroA < libroB) {
                        return -1 * direction;  
                    }
                    if (libroA > libroB) {
                        return 1 * direction;
                    }
                    return 0;       
                });
            
                this.filteredFilas = [...this.arrayFilas];
            } else { 
                const direction = header.sortDirection === 'asc' ? 1 : -1;

                this.arrayFilas.sort((a: any, b: any) => {
                    const usuarioA = a.usuarioAlias.toLowerCase();
                    const usuarioB = b.usuarioAlias.toLowerCase();
            
                    if (usuarioA < usuarioB) {
                        return -1 * direction;  
                    }
                    if (usuarioA > usuarioB) {
                        return 1 * direction;
                    }
                    return 0;       
                });
            
                this.filteredFilas = [...this.arrayFilas];
            }
        }
        
        header.sortDirection = header.sortDirection === 'desc' ? 'asc' : 'desc';
    }

    deletePrestamo(prestamoID: number){
        this.prestamosService.deletePrestamo(prestamoID).subscribe({
            next: (response) => {
                console.log('Préstamo eliminado exitosamente:', response);
                
            }, error: (error) => {
                console.error('Error al eliminar el préstamo:', error);
                alert('Error al eliminar el préstamo');
            }, complete: () => {
                this.onPageChanged(1)
            }
        });
    }

    confirmNotificacion(notificacion: any){
        const fechaActual = new Date();

        const body = {
            fecha: (fechaActual.getFullYear()).toString() + "-" + (fechaActual.getMonth() + 1).toString() + "-" + (fechaActual.getDate()).toString(),
            mensaje: "Su solicitud de préstamo de '" + notificacion.libroTitulo + "' fue aceptada, acérquese al local para retirar su libro el " + notificacion.fecha_inicio + ".",
            usuarios: [notificacion.id_usuario]
        };

        this.notificacionesService.deleteNotificacion(notificacion.id).subscribe({
            next: (response) => {
                console.log('Notificación eliminada exitosamente:', response);
            }, error: (error) => {
                console.error('Error al eliminar la notificación:', error);
            }, complete: () => {
                this.onPageChanged(1)
                this.notificacionesService.postNotificacion(body).subscribe({
                    next: (response) => {
                        console.log('Notificación de confirmación enviada exitosamente:', response);
                    }, error: (error) => {
                        console.error('Error al enviar la notificación de confirmación:', error);
                    }
                });
            }
        });
    }

    declineNotificacion(notificacion: any){
        const fechaActual = new Date();

        const body = {
            fecha: (fechaActual.getFullYear()).toString() + "-" + (fechaActual.getMonth() + 1).toString() + "-" + (fechaActual.getDate()).toString(),
            mensaje: "Su solicitud de préstamo de '" + notificacion.libroTitulo + "' fue rechazada, lo sentimos.",
            usuarios: [notificacion.id_usuario]
        };
        
        this.notificacionesService.deleteNotificacion(notificacion.id).subscribe({
            next: (response) => {
                console.log('Notificación eliminada exitosamente:', response);
            }, error: (error) => {
                console.error('Error al eliminar la notificación:', error);
            }, complete: () => {
                this.onPageChanged(1)
                this.notificacionesService.postNotificacion(body).subscribe({
                    next: (response) => {
                        console.log('Notificación de rechazo enviada exitosamente:', response);
                    }, error: (error) => {
                        console.error('Error al enviar la notificación de rechazo:', error);
                    }
                });
            }
        });
    }

    getRouter(): string {
        return this.router.url;
    }

    getLibroNotificacion(mensaje: string) {
        return mensaje;
    }

    navigate(id: number) {
        this.router.navigate([this.url + '/' + id]);
    }
}

