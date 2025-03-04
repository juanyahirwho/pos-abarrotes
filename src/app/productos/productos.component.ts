import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-productos',
  standalone: true, // Indica que es un componente standalone
  imports: [CommonModule, RouterModule], // Importa CommonModule
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss'
})
export class ProductosComponent {
  productos = [
    { nombre: 'Producto 1', descripcion: 'Descripción del Producto 1', precio: 100, existencias: 10, img: 'https://via.placeholder.com/150' },
    { nombre: 'Producto 2', descripcion: 'Descripción del Producto 2', precio: 200, existencias: 5, img: 'https://via.placeholder.com/150' },
    { nombre: 'Producto 3', descripcion: 'Descripción del Producto 3', precio: 300, existencias: 8, img: 'https://via.placeholder.com/150' },
    { nombre: 'Producto 4', descripcion: 'Descripción del Producto 4', precio: 150, existencias: 3, img: 'https://via.placeholder.com/150' },
    { nombre: 'Producto 5', descripcion: 'Descripción del Producto 5', precio: 250, existencias: 7, img: 'https://via.placeholder.com/150' },
  ];
}