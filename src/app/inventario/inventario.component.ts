import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {  HttpClient, HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.scss'
})
export class InventarioComponent implements OnInit {
  productos: any[] = [];
  productosFiltrados: any[] = [];
  terminoBusqueda: string = ''; // Término de búsqueda
  productosEncontrados: any[] = []; // Productos encontrados
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.obtenerProductosInvent();
  }

  obtenerProductosInvent() {
    this.http.get<any[]>('http://localhost:3000/api/productos').subscribe(
      (data) => {
        this.productos = data.map(producto => ({
          ...producto,
          img: producto.foto ? `http://localhost:3000/${producto.foto}` : 'https://via.placeholder.com/150'
        }));
        this.productosFiltrados = [...this.productos]; // Asegurar que productosFiltrados se actualiza
      },
      (error) => {
        console.error('Error al obtener productos:', error);
        alert(`Error al obtener productos: ${error.message}`);
      }
    );
  }
  // Buscar productos
  buscarProductos() {
    if (this.terminoBusqueda.trim() === '') {
        this.productosEncontrados = [];
        return;
    }

    this.http.get<any[]>(`http://localhost:3000/api/productos/buscar?nombre=${this.terminoBusqueda}`)
        .subscribe(
            (data) => {
                this.productosEncontrados = data;
            },
            (error) => {
                console.error('Error al buscar productos:', error);
            }
        );
}
  


}
