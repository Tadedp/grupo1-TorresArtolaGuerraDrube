import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LibrosService } from '../../services/libros.service';
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
        private router: Router
    ) { }
  
    ngOnInit(): void {
        this.libro_id = this.route.snapshot.paramMap.get('id') || '';
        this.tipo_op = this.route.snapshot.paramMap.get('tipo_op') || '';
        
        if (this.tipo_op == "editar") {
            this.librosService.getLibro(parseInt(this.libro_id)).subscribe((libro: any) => {
                this.libroDatos = [libro.titulo, libro.autores[0].id, libro.genero, libro.editorial, libro.isbn, libro.cantidad.toString(), libro.estado]
            });
        }
    }

    submit() {
        const form = this.formularioComponent.form;  

        if (form.valid) {
            this.router.navigateByUrl('/libros');
        } else {
            alert('Los valores son requeridos');
        }
    }
}
