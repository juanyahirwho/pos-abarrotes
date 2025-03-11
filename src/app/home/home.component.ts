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

   // Agregar producto a la venta
   agregarProductoAVenta(producto: any) {
    // Verificar si hay existencias disponibles
    if (producto.existencias <= 0) {
        alert('No hay existencias disponibles para este producto.');
        return; // Detener la función si no hay existencias
    }

    const productoEnVenta = this.ventaActual.productos.find((p: any) => p.id === producto.id);

    if (productoEnVenta) {
        // Verificar si al agregar una unidad se superan las existencias
        if (productoEnVenta.cantidad + 1 > producto.existencias) {
            alert('No hay suficientes existencias para este producto.');
            return; // Detener la función si no hay suficientes existencias
        }

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

// Eliminar producto de la venta
eliminarProductoDeVenta(index: number) {
    this.ventaActual.productos.splice(index, 1); // Eliminar el producto del array
    this.calcularTotalVenta(); // Recalcular el total
}

// Procesar la venta
procesarVenta() {
    // Preparar los datos para enviar al backend
    const ventaData = {
        total: this.ventaActual.total,
        detalles: this.ventaActual.productos.map((producto: any) => ({
            id_producto: producto.id,          // ID del producto
            cantidad: producto.cantidad,       // Cantidad vendida
            precio_unitario: producto.precio_venta, // Precio unitario
            subtotal: producto.subtotal        // Subtotal (precio_unitario * cantidad)
        }))
    };

    // Enviar la venta al backend
    this.http.post('http://localhost:3000/api/ventas', ventaData)
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
