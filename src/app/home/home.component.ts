import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  terminoBusqueda: string = ''; // Término de búsqueda
  productosEncontrados: any[] = []; // Productos encontrados
  ventaActual: any = { productos: [], total: 0 }; // Venta actual

  constructor(private http: HttpClient) {}

  // Buscar productos
  buscarProductos() {
    if (this.terminoBusqueda.trim() === '') {
      this.productosEncontrados = [];
      return;
    }

    this.http.get<any[]>(`http://localhost:3000/api/productos?nombre=${this.terminoBusqueda}`)
      .subscribe(
        (data) => {
          this.productosEncontrados = data;
        },
        (error) => {
          console.error('Error al buscar productos:', error);
        }
      );
  }

  // Agregar producto a la venta
  agregarProductoAVenta(producto: any) {
    const productoEnVenta = this.ventaActual.productos.find((p: any) => p.id === producto.id);

    if (productoEnVenta) {
      productoEnVenta.cantidad += 1;
      productoEnVenta.subtotal = productoEnVenta.cantidad * producto.precio_venta;
    } else {
      this.ventaActual.productos.push({
        ...producto,
        cantidad: 1,
        subtotal: producto.precio_venta
      });
    }

    this.calcularTotalVenta();
  }

  // Calcular el total de la venta
  calcularTotalVenta() {
    this.ventaActual.total = this.ventaActual.productos.reduce((total: number, producto: any) => {
        return total + Number(producto.subtotal); // Convierte el subtotal a número
    }, 0);
}

  // Procesar la venta
  procesarVenta() {
    this.http.post('http://localhost:3000/api/ventas', this.ventaActual)
      .subscribe(
        (response) => {
          alert('Venta procesada con éxito');
          this.ventaActual = { productos: [], total: 0 }; // Reiniciar la venta
        },
        (error) => {
          console.error('Error al procesar la venta:', error);
        }
      );
  }
}