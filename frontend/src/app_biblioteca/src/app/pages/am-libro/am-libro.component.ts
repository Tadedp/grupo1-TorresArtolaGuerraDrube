import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LibrosService } from '../../services/libros.service';
import { AutoresService } from '../../services/autores.service';
import { FormularioComponent } from '../../components/formulario/formulario.component';

@Component({
  selector: 'app-am-libro',
  templateUrl: './am-libro.component.html',
  styleUrl: './am-libro.component.css'
})
export class AmLibroComponent {
    @ViewChild(FormularioComponent) formularioComponent!: FormularioComponent;

    libro_id!: string;
    tipo_op!: string;
    libroDatos:any[] = [];

    constructor(
        private route:ActivatedRoute,
        private librosService: LibrosService,
        private autoresService: AutoresService,
        private router: Router
    ) { }
  
    ngOnInit(): void {
        this.libro_id = this.route.snapshot.paramMap.get('id') || '';
        this.tipo_op = this.route.snapshot.paramMap.get('tipo_op') || '';
        
        if (this.tipo_op == "editar") {
            this.librosService.getLibro(parseInt(this.libro_id)).subscribe((libro: any) => {
                this.libroDatos = [libro.titulo, libro.autor.nombre, libro.autor.apellido, libro.genero, libro.editorial, libro.isbn, libro.sinopsis, libro.cantidad.toString(), libro.estado]
            });
        }
    }

    submit() {
        const form = this.formularioComponent.form;  

        if (form.valid) {
            if (this.tipo_op == "agregar") {
                const params = { nombre: form.value['Autor Nombres'], apellido: form.value['Autor Apellidos']}
                
                this.autoresService.getAutores(1, params).subscribe((rta: any) => {
                    if (rta.autores.length === 0){
                        const bodyAutor= {
                            nombre: form.value['Autor Nombres'],
                            apellido: form.value['Autor Apellidos'],
                        }

                        this.autoresService.postAutor(bodyAutor).subscribe((autor: any) => {
                            const autorID = parseInt(autor.id)    
                        
                            const bodyLibro = {
                                titulo: form.value['Título'],
                                genero: form.value['Género'],
                                editorial: form.value['Editorial'],
                                estado: form.value['Estado'],
                                cantidad: parseInt(form.value['Stock']),
                                isbn: form.value['ISBN'],
                                sinopsis: form.value['Sinopsis'],
                                portada: form.value['Título'].toLowerCase().replace(/\s+/g, '') + '.png',
                                id_autor: autorID
                            };
                            
                            this.librosService.postLibro(bodyLibro).subscribe({
                                next: (response) => {
                                    console.log('Libro agregado exitosamente:', response);
                                    this.router.navigateByUrl('/libros');
                                },
                                error: (error) => {
                                    console.error('Error al agregar el libro:', error);
                                    alert('Error al agregar el libro');
                                }
                            });
                        })

                    } else {
                        const autorID = parseInt(rta.autores[0].id)

                        const bodyLibro = {
                            titulo: form.value['Título'],
                            genero: form.value['Género'],
                            editorial: form.value['Editorial'],
                            estado: form.value['Estado'],
                            cantidad: parseInt(form.value['Stock']),
                            isbn: form.value['ISBN'],
                            sinopsis: form.value['Sinopsis'],
                            portada: form.value['Título'].toLowerCase().replace(/\s+/g, '') + '.png',
                            id_autor: autorID
                        };
                        
                        this.librosService.postLibro(bodyLibro).subscribe({
                            next: (response) => {
                                console.log('Libro agregado exitosamente:', response);
                                this.router.navigateByUrl('/libros');
                            },
                            error: (error) => {
                                console.error('Error al agregar el libro:', error);
                                alert('Error al agregar el libro');
                            }
                        });
                    }
                });
            } else {
                const params = { nombre: form.value['Autor Nombres'], apellido: form.value['Autor Apellidos']}
                
                this.autoresService.getAutores(1, params).subscribe((rta: any) => {
                    if (rta.autores.length === 0){
                        const bodyAutor= {
                            nombre: form.value['Autor Nombres'],
                            apellido: form.value['Autor Apellidos'],
                        }

                        this.autoresService.postAutor(bodyAutor).subscribe((autor: any) => {
                            const autorID = parseInt(autor.id)    
                        
                            const bodyLibro = {
                                titulo: form.value['Título'],
                                genero: form.value['Género'],
                                editorial: form.value['Editorial'],
                                estado: form.value['Estado'],
                                cantidad: parseInt(form.value['Stock']),
                                isbn: form.value['ISBN'],
                                sinopsis: form.value['Sinopsis'],
                                portada: form.value['Título'].toLowerCase().replace(/\s+/g, '') + '.png',
                                id_autor: autorID
                            };
                            
                            this.librosService.putLibro(parseInt(this.libro_id), bodyLibro).subscribe({
                                next: (response) => {
                                    console.log('Libro agregado exitosamente:', response);
                                    this.router.navigateByUrl('/libro/' + this.libro_id);
                                },
                                error: (error) => {
                                    console.error('Error al agregar el libro:', error);
                                    alert('Error al agregar el libro');
                                }
                            });
                        })

                    } else {
                        const autorID = parseInt(rta.autores[0].id)

                        const bodyLibro = {
                            titulo: form.value['Título'],
                            genero: form.value['Género'],
                            editorial: form.value['Editorial'],
                            estado: form.value['Estado'],
                            cantidad: parseInt(form.value['Stock']),
                            isbn: form.value['ISBN'],
                            sinopsis: form.value['Sinopsis'],
                            portada: form.value['Título'].toLowerCase().replace(/\s+/g, '') + '.png',
                            id_autor: autorID
                        };
                        
                        this.librosService.putLibro(parseInt(this.libro_id), bodyLibro).subscribe({
                            next: (response) => {
                                console.log('Libro agregado exitosamente:', response);
                                this.router.navigateByUrl('/libro/' + this.libro_id);
                            },
                            error: (error) => {
                                console.error('Error al agregar el libro:', error);
                                alert('Error al agregar el libro');
                            }
                        });
                    }
                });
            }   
        } else {
            alert('Los valores son requeridos');
        }
    }
}
