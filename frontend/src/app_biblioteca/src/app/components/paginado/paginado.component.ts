import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginado',
  templateUrl: './paginado.component.html',
  styleUrls: ['./paginado.component.css']
})

export class PaginadoComponent  {
    @Input() totalPages!: number;
    @Input() currentPage!: number;
    @Output() pageChanged = new EventEmitter<number>();
    maxVisiblePages: number = 5;

    get visiblePages(): number[] {
      const pages: number[] = [];
      const halfRange = Math.floor(this.maxVisiblePages / 2);
  
      let start = Math.max(1, this.currentPage - halfRange);
      let end = Math.min(this.totalPages, start + this.maxVisiblePages - 1);
  
      if (this.totalPages > this.maxVisiblePages && end === this.totalPages) {
        start = this.totalPages - this.maxVisiblePages + 1;
      }
  
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
  
      return pages;
    }
    
    get showLeftEllipsis(): boolean {
        return this.currentPage > Math.floor(this.maxVisiblePages / 2) + 1;
    }
    
    get showRightEllipsis(): boolean {
        return this.currentPage < this.totalPages - Math.floor(this.maxVisiblePages / 2);
    }
   
    goToPage(page: number) {
      if (page >= 1 && page <= this.totalPages) {
        this.pageChanged.emit(page);
      }
    }
  
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.pageChanged.emit(this.currentPage + 1);
      }
    }
  
    prevPage() {
      if (this.currentPage > 1) {
        this.pageChanged.emit(this.currentPage - 1);
      }
    }
  
    goToFirstPage() {
      if (this.currentPage !== 1) {
        this.pageChanged.emit(1);
      }
    }
  
    goToLastPage() {
      if (this.currentPage !== this.totalPages) {
        this.pageChanged.emit(this.totalPages);
      }
    }
}

