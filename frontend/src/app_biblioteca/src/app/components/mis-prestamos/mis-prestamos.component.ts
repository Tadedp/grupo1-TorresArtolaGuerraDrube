import { Component } from '@angular/core';

@Component({
  selector: 'app-mis-prestamos',
  templateUrl: './mis-prestamos.component.html',
  styleUrl: './mis-prestamos.component.css'
})
export class MisPrestamosComponent {

  arrayMisPrestamos =[
    {
      id: 1,
      titulo: '1984',
      autor: 'George Orwell',
      fecha_inicio: '18/05/2024',
      fecha_fin: '25/05/2024',
      img: '1984.jpeg'
    },
    {
      id: 2,
      titulo: 'Orgullo y Prejuicio',
      autor: 'Jane Austen',
      fecha_inicio: '06/10/2021',
      fecha_fin: '13/10/2021',
      img: 'orgulloyprejuicio.png'
    },
    {
      id: 3,
      titulo: 'Dracula',
      autor: 'Bram Stoker',
      fecha_inicio: '01/01/2023',
      fecha_fin: '08/01/2023',
      img: 'demian.png'
    },
    {
      id: 4,
      titulo: 'Harry Potter y la Piedra Filosofal',
      autor: 'J.K. Rowling',
      fecha_inicio: '31/10/2023',
      fecha_fin: '07/11/2023',
      img: 'harrypotter.jpg'
    },
  ]
}
