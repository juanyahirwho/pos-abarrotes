import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registrar-producto',
  standalone: true, 
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule], // ✅ Agregar HttpClientModule aquí
  templateUrl: './registrar-producto.component.html',
  styleUrls: ['./registrar-producto.component.scss']
})
export class RegistrarProductoComponent {
  producto = {
    nombre: '',
    categoria: '',
    marca: '',
    precio_compra: 0,
    precio_venta: 0,
    existencias: 0
  };
  foto: File | null = null;
  mensaje: string = '';

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    this.foto = event.target.files[0];
  }

  registrarProducto() {
    const formData = new FormData();
    formData.append('nombre', this.producto.nombre);
    formData.append('categoria', this.producto.categoria);
    formData.append('marca', this.producto.marca);
    formData.append('precio_compra', this.producto.precio_compra.toString());
    formData.append('precio_venta', this.producto.precio_venta.toString());
    formData.append('existencias', this.producto.existencias.toString());

    if (this.foto) {
      formData.append('foto', this.foto);
    }

    this.http.post('http://localhost:3000/api/productos', formData).subscribe(
      (response: any) => {
        this.mensaje = 'Producto registrado exitosamente con ID: ' + response.id;
        this.limpiarFormulario();
      },
      (error) => {
        this.mensaje = 'Error al registrar el producto: ' + error.message;
      }
    );
  }

  limpiarFormulario() {
    this.producto = {
      nombre: '',
      categoria: '',
      marca: '',
      precio_compra: 0,
      precio_venta: 0,
      existencias: 0
    };
    this.foto = null;
  }
}
