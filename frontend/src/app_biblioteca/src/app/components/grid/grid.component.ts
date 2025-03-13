import { Component, Input, OnChanges, SimpleChanges  } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service'
import { PrestamosService } from '../../services/prestamos.service'
import { LibrosService } from '../../services/libros.service'
import { NotificacionesService } from '../../services/notificaciones.service'
import { ModalConfirmacionComponent } from '../modal-confirmacion/modal-confirmacion.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})

export class GridComponent implements OnChanges{
    @Input() url = '';
    @Input() filtros: { filtro: string, valor: string }[] = [];

    headers: any[] = [];
    gridColumns: string = '0'; 
    arrayFilas:any[] = [];
    allFilas:any[] = [];
    currentPage: number = 1;
    totalPages: number = 1;
    pageSize: number = 6;
    filtrosActuales: {} = {}

    constructor(
        private authService: AuthService,
        private router: Router, 
        private usuariosService: UsuariosService,
        private prestamosService: PrestamosService,
        private librosService: LibrosService,
        private notificacionesService: NotificacionesService,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        if (this.authService.es_token_expirado()){
            alert('Sesión expirada. Vuelva a iniciar sesión.');
            this.authService.logout();
            
        } else {
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
                    const totalNotificaciones = rta.total
                    const params = { per_page: totalNotificaciones}
                    
                    this.notificacionesService.getNotificaciones(1, params).subscribe((rta:any) => { 
                        console.log('Return api: ', rta);
        
                        const notificaciones = rta.notificaciones || [];
                        this.arrayFilas = [];
                        this.allFilas = []
                
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
                                    this.allFilas.push({
                                        id: notificacion.id,
                                        fecha: notificacion.fecha,
                                        fecha_inicio: fecha_inicio,     
                                        id_libro: idLibro,
                                        libroTitulo: libro.titulo,
                                        libroAutor: libro.autor.nombre + " " + libro.autor.apellido,
                                        id_usuario: idUsuario,
                                        usuarioAlias: usuario.alias,
                                        usuarioNombre: usuario.nombre + " " + usuario.apellido,
                                        usuarioEstado: usuario.estado
                                    });
                                    
                                    this.allFilas.sort((a: any, b: any) => {
                                        const libroA = a.fecha_inicio;
                                        const libroB = b.fecha_inicio;
                                
                                        if (libroA < libroB) {
                                            return -1;  
                                        }
                                        if (libroA > libroB) {
                                            return 1;
                                        }
                                        return 0;       
                                    });
                                    
                                    this.arrayFilas = this.allFilas.slice(0, 6)
                                    this.currentPage = 1;
                                    this.totalPages = Math.ceil(this.allFilas.length / 6);
                                
                                    const nuevoFiltro = { ["sort_by"]: "Fecha", ["sortDirection"]: "asc" };
                                    this.filtrosActuales = { ...nuevoFiltro };
                                });
                            });
                        });
                        
                    });
                });            
            }
        }    
    }

    openDeleteModal(prestamoID: number) {
        if (this.authService.es_token_expirado()){
            alert('Sesión expirada. Vuelva a iniciar sesión.');
            this.authService.logout();
            
        } else {
            const dialogRef = this.dialog.open(ModalConfirmacionComponent, {
                width: '500px',
                data: { elemento: "prestamo", id: prestamoID, mensaje: "¿Estás seguro de que deseas eliminar este préstamo?" }
            });
        }
    }
    
    onPageChanged(newPage: number) {
        if (this.authService.es_token_expirado()){
            alert('Sesión expirada. Vuelva a iniciar sesión.');
            this.authService.logout();
            
        } else {
            this.currentPage = newPage;
            const currentRoute = this.router.url;

            if (currentRoute.includes('prestamos')) {

                this.prestamosService.getPrestamos(newPage, this.filtrosActuales).subscribe((rta:any) => { 
                    console.log('Return api: ', rta );
                    this.arrayFilas = rta.prestamos || [];
                    this.currentPage = rta.page
                    this.totalPages = rta.pages
                })

            } else if (currentRoute.includes('usuarios')) {
                
                this.usuariosService.getUsuarios(newPage, this.filtrosActuales).subscribe((rta:any) => { 
                    console.log('Return api: ', rta );
                    this.arrayFilas = rta.usuarios || [];
                    this.currentPage = rta.page
                    this.totalPages = rta.pages
                })

            } else if (currentRoute.includes('libros')) {

                this.librosService.getLibros(newPage, this.filtrosActuales).subscribe((rta:any) => { 
                    console.log('Return api: ', rta );
                    this.arrayFilas = rta.libros || [];
                    this.currentPage = rta.page
                    this.totalPages = rta.pages
                })

            } else if (currentRoute.includes('notificaciones')) {
                this.arrayFilas = this.allFilas.slice(6 * (newPage - 1), 6 * newPage)
                this.currentPage = newPage;
            }
        }
    }
    
    sortGrid(header: any){
        if (this.authService.es_token_expirado()){
            alert('Sesión expirada. Vuelva a iniciar sesión.');
            this.authService.logout();
            
        } else {
            const filtrosSinOrdenamiento = { ...this.filtrosActuales } as { [key: string]: any };

            for (const ordenamientoKey in filtrosSinOrdenamiento) {
                if (ordenamientoKey.startsWith('sortby_')) {
                    delete filtrosSinOrdenamiento[ordenamientoKey];
                    break; 
                }
            }

            const currentRoute = this.router.url;
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

                const nuevoFiltro = { [key]: header.sortDirection };
                this.filtrosActuales = { ...filtrosSinOrdenamiento, ...nuevoFiltro };

                this.prestamosService.getPrestamos(this.currentPage, this.filtrosActuales ).subscribe((rta:any) => { 
                    console.log('Return api: ', rta );
                    this.arrayFilas = rta.prestamos || [];
                    this.currentPage = rta.page
                    this.totalPages = rta.pages
                })

            } else if (currentRoute.includes('usuarios')) {
                
                if (header.name == 'Usuario') {
                    key = 'sortby_alias'
                
                } else {
                    key = 'sortby_' + header.name.toLowerCase()
                
                }

                const nuevoFiltro = { [key]: header.sortDirection };
                this.filtrosActuales = { ...filtrosSinOrdenamiento, ...nuevoFiltro };

                this.usuariosService.getUsuarios(this.currentPage, this.filtrosActuales ).subscribe((rta:any) => { 
                    console.log('Return api: ', rta );
                    this.arrayFilas = rta.usuarios || [];
                    this.currentPage = rta.page
                    this.totalPages = rta.pages
                })

            } else if (currentRoute.includes('libros')) {

                key = 'sortby_' + header.name.toLowerCase()

                const nuevoFiltro = { [key]: header.sortDirection };
                this.filtrosActuales = { ...filtrosSinOrdenamiento, ...nuevoFiltro };

                this.librosService.getLibros(this.currentPage, this.filtrosActuales ).subscribe((rta:any) => { 
                    console.log('Return api: ', rta );
                    this.arrayFilas = rta.libros || [];
                    this.currentPage = rta.page
                    this.totalPages = rta.pages
                })

            } else if (currentRoute.includes('notificaciones')) {
                if ( header.name == "Fecha" ) {
                    const direction = header.sortDirection === 'asc' ? 1 : -1;

                    this.allFilas.sort((a: any, b: any) => {
                        const libroA = a.fecha_inicio;
                        const libroB = b.fecha_inicio;
                
                        if (libroA < libroB) {
                            return -1 * direction;  
                        }
                        if (libroA > libroB) {
                            return 1 * direction;
                        }
                        return 0;       
                    });

                } else if ( header.name == "Libro" ) { 
                    const direction = header.sortDirection === 'asc' ? 1 : -1;

                    this.allFilas.sort((a: any, b: any) => {
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
                } else { 
                    const direction = header.sortDirection === 'asc' ? 1 : -1;

                    this.allFilas.sort((a: any, b: any) => {
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
                }
                this.arrayFilas = this.allFilas.slice(6 * (this.currentPage - 1), 6 * this.currentPage)
            }
            
            (this.filtrosActuales as { [key: string]: any })["sort_by"] = header.name;
            (this.filtrosActuales as { [key: string]: any })["sortDirection"] = header.sortDirection;
            header.sortDirection = header.sortDirection === 'desc' ? 'asc' : 'desc';
        }
    }

    confirmNotificacion(notificacion: any){
        if (this.authService.es_token_expirado()){
            alert('Sesión expirada. Vuelva a iniciar sesión.');
            this.authService.logout();
            
        } else {
            const fechaActual = new Date();

            const body = {
                fecha: (fechaActual.getFullYear()).toString() + "-" + (fechaActual.getMonth() + 1).toString() + "-" + (fechaActual.getDate()).toString(),
                mensaje: "Su solicitud de préstamo de '" + notificacion.libroTitulo + "' fue aceptada, acérquese al local para retirar su libro el " + notificacion.fecha_inicio + ".",
                usuarios: [notificacion.id_usuario]
            };

            this.notificacionesService.deleteNotificacion(notificacion.id).subscribe({
                next: (response) => {
                    this.notificacionesService.postNotificacion(body).subscribe({
                        next: (response) => {
                            console.log('Notificación de confirmación enviada exitosamente:', response);
                        }, error: (error) => {
                            console.error('Error al enviar la notificación de confirmación:', error);
                        }
                    });
                    console.log('Notificación eliminada exitosamente:', response);
                }, error: (error) => {
                    console.error('Error al eliminar la notificación:', error);
                }, complete: () => {
                    this.router.navigateByUrl('/notificaciones').then(() => {
                        window.location.reload();
                    });
                }
            });
        }
    }

    declineNotificacion(notificacion: any){
        if (this.authService.es_token_expirado()){
            alert('Sesión expirada. Vuelva a iniciar sesión.');
            this.authService.logout();
            
        } else {
            const fechaActual = new Date();

            const body = {
                fecha: (fechaActual.getFullYear()).toString() + "-" + (fechaActual.getMonth() + 1).toString() + "-" + (fechaActual.getDate()).toString(),
                mensaje: "Su solicitud de préstamo de '" + notificacion.libroTitulo + "' fue rechazada, lo sentimos.",
                usuarios: [notificacion.id_usuario]
            };
            
            this.notificacionesService.deleteNotificacion(notificacion.id).subscribe({
                next: (response) => {
                    this.notificacionesService.postNotificacion(body).subscribe({
                        next: (response) => {
                            console.log('Notificación de rechazo enviada exitosamente:', response);
                        }, error: (error) => {
                            console.error('Error al enviar la notificación de rechazo:', error);
                        }
                    });
                    console.log('Notificación eliminada exitosamente:', response);
                }, error: (error) => {
                    console.error('Error al eliminar la notificación:', error);
                }, complete: () => {
                    this.router.navigateByUrl('/notificaciones').then(() => {
                        window.location.reload();
                    });
                }
            });
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.authService.es_token_expirado()){
            alert('Sesión expirada. Vuelva a iniciar sesión.');
            this.authService.logout();
            
        } else {
            if (changes['filtros'] && this.filtros.length > 0) {
                const currentRoute = this.router.url;

                this.filtrosActuales = Object.assign( {}, ...this.filtros.map(filtroObj => {
                        const key = filtroObj.filtro.toLowerCase().replace(/\s+/g, "_");
                        const value = filtroObj.valor;
                
                        switch (key) {
                            case "id":
                            case "autor_id":
                            case "libro_id":
                            case "usuario_id":
                            case "dni":
                            case "telefono":
                            case "stock":
                                return { [key]: Number(value) };
                            default:
                                return { [key]: value };
                        }
                    })
                );

                if (currentRoute.includes('prestamos')) {

                    this.prestamosService.getPrestamos(1, this.filtrosActuales).subscribe((rta:any) => { 
                        console.log('Return api: ', rta );
                        this.arrayFilas = rta.prestamos || [];
                        this.currentPage = rta.page
                        this.totalPages = rta.pages
                    })

                } else if (currentRoute.includes('usuarios')) {
                    
                    this.usuariosService.getUsuarios(1, this.filtrosActuales).subscribe((rta:any) => { 
                        console.log('Return api: ', rta );
                        this.arrayFilas = rta.usuarios || [];
                        this.currentPage = rta.page
                        this.totalPages = rta.pages
                    })

                } else if (currentRoute.includes('libros')) {

                    this.librosService.getLibros(1, this.filtrosActuales).subscribe((rta:any) => { 
                        console.log('Return api: ', rta );
                        this.arrayFilas = rta.libros || [];
                        this.currentPage = rta.page
                        this.totalPages = rta.pages
                    })
                }
            }
        }
    }

    getRouter(): string {
        return this.router.url;
    }

    navigate(id: number) {
        if (this.authService.es_token_expirado()){
            alert('Sesión expirada. Vuelva a iniciar sesión.');
            this.authService.logout();
            
        } else {
            this.router.navigate([this.url + '/' + id]);
        }
    }
}

