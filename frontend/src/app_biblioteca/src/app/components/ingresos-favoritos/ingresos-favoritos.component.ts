import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ingresos-favoritos',
  templateUrl: './ingresos-favoritos.component.html',
  styleUrl: './ingresos-favoritos.component.css'
})

export class IngresosFavoritosComponent {
    @Input() titulo: string = 'texto'; 
    @Input() subtitulo: string = 'texto'; 

    @Input() rutas: string [] = []
    @Input() titulos: string [] = []
    @Input() autores: string [] = []
}

