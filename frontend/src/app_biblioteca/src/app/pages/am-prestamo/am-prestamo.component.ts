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
                this.prestamoDatos = [prestamo.usuario.id, prestamo.libros[0].id, prestamo.fecha_inicio, prestamo.fecha_fin]
            });
        }
    }

    submit() {
        const form = this.formularioComponent.form;  

        if (form.valid) {
            this.router.navigateByUrl('/prestamos');
        } else {
            alert('Los valores son requeridos');
        }
    }
}
