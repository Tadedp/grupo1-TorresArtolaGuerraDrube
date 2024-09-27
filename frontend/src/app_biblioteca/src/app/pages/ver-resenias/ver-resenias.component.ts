import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ver-resenias',
  templateUrl: './ver-resenias.component.html',
  styleUrl: './ver-resenias.component.css'
})
export class VerReseniasComponent {
  @Input() nombresUsuarios: string[] = ['vicky','tadeo','celi','vale','alma'];
  @Input() valoraciones: number[] = [4.5,5,3,3.5,1]
  @Input() resenias: string [] = ['hola','como','estas','chau','no'];
}
