import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-resenia',
  templateUrl: './resenia.component.html',
  styleUrl: './resenia.component.css'
})
export class ReseniaComponent {
  @Input() nombreUsuario: string = '';
  @Input() valoracion: number = 0;
  @Input() resenia: string = '';
  getEstrellas(): { llenas: number, media: boolean, vacias: number } {
    const estrellasLlenas = Math.floor(this.valoracion); // Parte entera
    const tieneMediaEstrella = this.valoracion - estrellasLlenas >= 0.5; // Verifica si hay media estrella
    const estrellasVacias = 5 - estrellasLlenas - (tieneMediaEstrella ? 1 : 0); // Resto de las estrellas vacías
    return {
      llenas: estrellasLlenas,
      media: tieneMediaEstrella,
      vacias: estrellasVacias
    };
  }
}


