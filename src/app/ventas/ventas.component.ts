import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ventas',
  imports: [CommonModule, RouterModule],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.scss'
})
export class VentasComponent {
  // Datos duros para el historial de ventas
  ventas = [
    {
      id: 1,
      fecha: new Date('2023-10-01T14:30:00'),
      productos: [
        {
          img: 'https://via.placeholder.com/50',
          nombre: 'Doritos Incógnita',
          cantidad: 2,
          precio: 15.00
        },
        {
          img: 'https://via.placeholder.com/50',
          nombre: 'Coca Cola 600ml',
          cantidad: 1,
          precio: 12.00
        }
      ],
      total: 42.00
    },
    {
      id: 2,
      fecha: new Date('2023-10-02T10:15:00'),
      productos: [
        {
          img: 'https://via.placeholder.com/50',
          nombre: 'Pan Bimbo',
          cantidad: 3,
          precio: 20.00
        },
        {
          img: 'https://via.placeholder.com/50',
          nombre: 'Jabón líquido Ace',
          cantidad: 1,
          precio: 35.00
        }
      ],
      total: 95.00
    },
    {
      id: 3,
      fecha: new Date('2023-10-03T16:45:00'),
      productos: [
        {
          img: 'https://via.placeholder.com/50',
          nombre: 'Cerveza Tecate',
          cantidad: 6,
          precio: 18.00
        },
        {
          img: 'https://via.placeholder.com/50',
          nombre: 'Leche Lala',
          cantidad: 2,
          precio: 22.00
        }
      ],
      total: 152.00
    },
    {
      id: 4,
      fecha: new Date('2023-10-04T09:00:00'),
      productos: [
        {
          img: 'https://via.placeholder.com/50',
          nombre: 'Galletas Oreo',
          cantidad: 4,
          precio: 10.00
        },
        {
          img: 'https://via.placeholder.com/50',
          nombre: 'Agua Bonafont 1L',
          cantidad: 5,
          precio: 8.00
        }
      ],
      total: 80.00
    },
    {
      id: 5,
      fecha: new Date('2023-10-05T12:30:00'),
      productos: [
        {
          img: 'https://via.placeholder.com/50',
          nombre: 'Papas Sabritas',
          cantidad: 3,
          precio: 12.00
        },
        {
          img: 'https://via.placeholder.com/50',
          nombre: 'Jugo Jumex',
          cantidad: 2,
          precio: 15.00
        }
      ],
      total: 66.00
    }
  ];
}
