import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {  HttpClient, HttpClientModule} from '@angular/common/http';
import { error } from 'console';


@Component({
  selector: 'app-reabastecer-producto',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './reabastecer-producto.component.html',
  styleUrl: './reabastecer-producto.component.scss'
})

export class ReabastecerProductoComponent implements OnInit {
  productos: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.http.get<any[]>('http://localhost:3000/api/productos').subscribe(
      (data) => {
        this.productos = data.map(producto => ({
          ...producto,
          img: producto.foto ? `http://localhost:3000/${producto.foto}` : 'https://via.placeholder.com/150'
        }));
      },
      (error) => {
        console.error('Error al obtener productos:', error);
        alert(`Error al obtener productos: ${error.message}`);
      }
    );
  }

  reabastecerProducto(id: number, cantidadIngresada: number, existenciasActuales: number) {
    if (cantidadIngresada <= existenciasActuales) {
      alert('La nueva cantidad debe ser mayor a la existente.');
      return;
    }

    this.http.put(`http://localhost:3000/api/productos/reabastecer/${id}`, { existencias: cantidadIngresada })
      .subscribe(
        (response: any) => {
          alert(response.message);
          this.obtenerProductos(); // Refrescar la lista de productos
        },
        (error) => {
          console.error('Error al reabastecer producto:', error);
          alert(`Error al reabastecer producto: ${error.message}`);
        }
      );
  }
}
