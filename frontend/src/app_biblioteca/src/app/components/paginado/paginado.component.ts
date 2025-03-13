import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-paginado',  
  templateUrl: './paginado.component.html',
  styleUrls: ['./paginado.component.css']
})

export class PaginadoComponent {
    @Input() total_paginas!: number;
    @Input() pagina_actual!: number;
    @Output() cambio_pagina = new EventEmitter<number>();
    max_paginas_visibles: number = 5;
    
    get paginas_visibles(): number[] {
        const paginas: number[] = [];
        const mitad_rango = Math.floor(this.max_paginas_visibles / 2);
    
        let inicio = Math.max(1, this.pagina_actual - mitad_rango);
        let final = Math.min(this.total_paginas, inicio + this.max_paginas_visibles - 1);
    
        if (this.total_paginas >= this.max_paginas_visibles && final === this.total_paginas) {
            inicio = this.total_paginas - this.max_paginas_visibles + 1;
        }
    
        for (let i = inicio; i <= final; i++) {
            paginas.push(i);
        }
    
        return paginas;
    }
    
    get mostrar_elipsis_izq(): boolean {
        return this.pagina_actual > Math.floor(this.max_paginas_visibles / 2) + 1 && this.max_paginas_visibles < this.total_paginas;
    }
    
    get mostrar_elipsis_der(): boolean {
        return this.pagina_actual < this.total_paginas - Math.floor(this.max_paginas_visibles / 2) && this.max_paginas_visibles < this.total_paginas;
    }
   
    ir_a_pagina(pagina: number) {
        if (pagina >= 1 && pagina <= this.total_paginas) {
            this.cambio_pagina.emit(pagina);
        }
    }
  
    pagina_siguiente() {
        if (this.pagina_actual < this.total_paginas) {
            this.cambio_pagina.emit(this.pagina_actual + 1);
        }
    }
  
    pagina_anterior() {
        if (this.pagina_actual > 1) {
            this.cambio_pagina.emit(this.pagina_actual - 1);
        }
    }
  
    ir_a_primer_pagina() {
        if (this.pagina_actual !== 1) {
            this.cambio_pagina.emit(1);
        }
    }
  
    ir_a_ultima_pagina() {
        if (this.pagina_actual !== this.total_paginas) {
            this.cambio_pagina.emit(this.total_paginas);
        }
    }
}
