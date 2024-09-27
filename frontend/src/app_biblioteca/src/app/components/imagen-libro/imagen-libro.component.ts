import { Component, Input} from '@angular/core';


@Component({
  selector: 'app-imagen-libro',
  templateUrl: './imagen-libro.component.html',
  styleUrl: './imagen-libro.component.css'
})
export class ImagenLibroComponent{
  @Input() urlImagen: string = 'url-libro';
  @Input() titulo: string = 'titulo';
  @Input() autor: string = 'autor';
}
