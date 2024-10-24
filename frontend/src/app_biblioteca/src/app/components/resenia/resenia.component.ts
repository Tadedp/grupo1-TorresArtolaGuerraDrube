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
    @Input() fecha: Date = new Date();

    getEstrellas(): { llenas: number, media: boolean, vacias: number } {
        const estrellasLlenas = Math.floor(this.valoracion); 
        const tieneMediaEstrella = this.valoracion - estrellasLlenas >= 0.5; 
        const estrellasVacias = 5 - estrellasLlenas - (tieneMediaEstrella ? 1 : 0); 
        return {
            llenas: estrellasLlenas,
            media: tieneMediaEstrella,
            vacias: estrellasVacias
        };
    }
}


