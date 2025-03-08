import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // 🟢 IMPORTAR ESTO

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, FormsModule], // 🟢 AÑADIR FormsModule
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss'
})
export class ProductosComponent implements OnInit {
  productos: any[] = [];
  mostrarModalEditar: boolean = false;
  mostrarAlertaEliminar: boolean = false;
  productoEditado: any = {};
  productoIdAEliminar: number | null = null;

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

  abrirModalEditar(producto: any) {
    this.productoEditado = { ...producto };
    this.mostrarModalEditar = true;
  }

  cerrarModalEditar() {
    this.mostrarModalEditar = false;
  }

  guardarCambios() {
    this.http.put(`http://localhost:3000/api/productos/${this.productoEditado.id}`, this.productoEditado).subscribe(
      (response) => {
        this.obtenerProductos(); // Refrescar la lista de productos
        this.cerrarModalEditar();
        alert('Producto actualizado exitosamente');
      },
      (error) => {
        console.error('Error al actualizar el producto:', error);
        alert(`Error al actualizar el producto: ${error.message}`);
      }
    );
  }

  confirmarEliminar(id: number) {
    this.productoIdAEliminar = id;
    this.mostrarAlertaEliminar = true;
  }

  cancelarEliminar() {
    this.mostrarAlertaEliminar = false;
    this.productoIdAEliminar = null;
  }

  eliminarProducto() {
    if (this.productoIdAEliminar !== null) {
      this.http.delete(`http://localhost:3000/api/productos/${this.productoIdAEliminar}`).subscribe(
        (response) => {
          this.obtenerProductos(); // Refrescar la lista de productos
          this.mostrarAlertaEliminar = false;
          alert('Producto eliminado exitosamente');
        },
        (error) => {
          console.error('Error al eliminar el producto:', error);
          alert(`Error al eliminar el producto: ${error.message}`);
        }
      );
    }
  }
}