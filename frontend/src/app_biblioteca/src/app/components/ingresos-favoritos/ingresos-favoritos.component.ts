import { Component, Input } from '@angular/core';
import { CurrentUser } from '../../auth';
import { Router } from '@angular/router';

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

