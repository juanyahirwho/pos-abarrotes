import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.scss'
})
export class ProveedoresComponent {
  proveedor = {
    nombre: '',
    telefono: ''
  };

  proveedores: any[] = [];
  proveedorEditado: any = null;
  mostrarFormularioEdicion: boolean = false;
  mensaje: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.obtenerProveedores();
  }

  obtenerProveedores() {
    this.http.get('http://localhost:3000/api/proveedores').subscribe(
      (response: any) => {
        this.proveedores = response;
      },
      (error) => {
        console.error('Error al obtener los proveedores:', error);
      }
    );
  }

  registrarProveedor() {
    const proveedorData = {
      nombre: this.proveedor.nombre,
      telefono: this.proveedor.telefono
    };

    this.http.post('http://localhost:3000/api/proveedores', proveedorData).subscribe(
      (response: any) => {
        this.mensaje = 'Proveedor registrado exitosamente con ID: ' + response.id;
        this.limpiarFormulario();
        this.obtenerProveedores();
      },
      (error) => {
        this.mensaje = 'Error al registrar el proveedor: ' + error.message;
      }
    );
  }

  abrirFormularioEdicion(proveedor: any) {
    this.proveedorEditado = { ...proveedor };
    this.mostrarFormularioEdicion = true;
  }

  cerrarFormularioEdicion() {
    this.mostrarFormularioEdicion = false;
    this.proveedorEditado = null;
  }

  guardarCambios() {
    const proveedorData = {
      nombre: this.proveedorEditado.nombre,
      telefono: this.proveedorEditado.telefono
    };

    this.http.put(`http://localhost:3000/api/proveedores/${this.proveedorEditado.id}`, proveedorData).subscribe(
      (response: any) => {
        this.mensaje = 'Proveedor actualizado exitosamente';
        this.cerrarFormularioEdicion();
        this.obtenerProveedores();
      },
      (error) => {
        this.mensaje = 'Error al actualizar el proveedor: ' + error.message;
      }
    );
  }

  confirmarEliminacion(proveedor: any) {
    if (confirm('¿Estás seguro de que deseas eliminar este proveedor?')) {
      this.eliminarProveedor(proveedor);
    }
  }

  eliminarProveedor(proveedor: any) {
    this.http.delete(`http://localhost:3000/api/proveedores/${proveedor.id}`).subscribe(
      (response: any) => {
        this.mensaje = 'Proveedor eliminado exitosamente';
        this.obtenerProveedores();
      },
      (error) => {
        this.mensaje = 'Error al eliminar el proveedor: ' + error.message;
      }
    );
  }

  limpiarFormulario() {
    this.proveedor = {
      nombre: '',
      telefono: ''
    };
  }
}