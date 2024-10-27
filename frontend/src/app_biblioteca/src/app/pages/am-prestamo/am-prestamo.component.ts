import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PrestamosService } from '../../services/prestamos.service';
import { FormularioComponent } from '../../components/formulario/formulario.component';

@Component({
  selector: 'app-am-prestamo',
  templateUrl: './am-prestamo.component.html',
  styleUrl: './am-prestamo.component.css'
})
export class AmPrestamoComponent {
    @ViewChild(FormularioComponent) formularioComponent!: FormularioComponent;

    prestamo_id!: string;
    tipo_op!: string;
    prestamoDatos:any[] = [];

    constructor(
        private route:ActivatedRoute,
        private prestamosService: PrestamosService,
        private router: Router
    ) { }
  
    ngOnInit(): void {
        this.prestamo_id = this.route.snapshot.paramMap.get('id') || '';
        this.tipo_op = this.route.snapshot.paramMap.get('tipo_op') || '';
        
        if (this.tipo_op == "editar") {
            this.prestamosService.getPrestamo(parseInt(this.prestamo_id)).subscribe((prestamo: any) => {
                this.prestamoDatos = [prestamo.usuario.id, prestamo.libro.id, prestamo.fecha_inicio, prestamo.fecha_fin]
            });
        }
    }

    submit() {
        const form = this.formularioComponent.form;  

        if (form.valid) {
            if (this.tipo_op == "agregar") {
                const body = {
                    fecha_inicio: form.value['Fecha de Inicio'],
                    fecha_fin: form.value['Fecha de Fin'],
                    id_usuario: parseInt(form.value['Usuario ID']),
                    id_libro: parseInt(form.value['Libro ID'])
                };
                
                this.prestamosService.postPrestamo(body).subscribe({
                    next: (response) => {
                        console.log('Préstamo agregado exitosamente:', response);
                        this.router.navigateByUrl('/prestamos');
                    },
                    error: (error) => {
                        console.error('Error al agregar el préstamo:', error);
                        alert('Error al agregar el préstamo');
                    }
                });
            } else {
                const body = {
                    fecha_inicio: form.value['Fecha de Inicio'],
                    fecha_fin: form.value['Fecha de Fin'],
                    id_usuario: parseInt(form.value['Usuario ID']),
                    id_libro: parseInt(form.value['Libro ID'])
                };
                
                this.prestamosService.putPrestamo(parseInt(this.prestamo_id), body).subscribe({
                    next: (response) => {
                        console.log('Préstamo modificado exitosamente:', response);
                        this.router.navigateByUrl('/prestamos');
                    },
                    error: (error) => {
                        console.error('Error al modificar el préstamo:', error);
                        alert('Error al modificar el préstamo');
                    }
                });
            }
        } else {
            alert('Los valores son requeridos');
        }
    }
}
