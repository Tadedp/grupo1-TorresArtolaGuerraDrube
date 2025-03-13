import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-imagen-libro',
  templateUrl: './imagen-libro.component.html',
  styleUrl: './imagen-libro.component.css'
})

export class ImagenLibroComponent{
    @Input() urlImagen: string = 'url-libro';
    @Input() titulo: string = 'titulo';
    @Input() autor: string = 'autor';
    @Input() idLibro!: number;

    constructor(
        private router: Router
    ) {}
    
    getImagen(): string {
        return this.urlImagen;
    }
    
    onImageError(event: any) {
        event.target.src = 'default_libro.png';
    }

    navigateToLibro(){
        this.router.navigate(['/libro', this.idLibro]);
    }
}
