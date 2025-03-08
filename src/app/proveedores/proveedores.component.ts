import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-proveedores',
  imports: [CommonModule, RouterModule],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.scss'
})
export class ProveedoresComponent {
  // Datos duros para los proveedores
  proveedores = [
    { nombre: 'Bimbo', telefono: '2215789123456' },
    { nombre: 'Sabritas', telefono: '2465789871423' },
    { nombre: 'Coca Cola', telefono: '222123456789' },
    { nombre: 'Lala', telefono: '233456789012' },
    { nombre: 'Tecate', telefono: '244567890123' }
  ];

  // Función para editar un proveedor
  editarProveedor(proveedor: any) {
    console.log('Editando proveedor:', proveedor);
    // Aquí puedes implementar la lógica para editar el proveedor
  }

  // Función para eliminar un proveedor
  eliminarProveedor(proveedor: any) {
    console.log('Eliminando proveedor:', proveedor);
    // Aquí puedes implementar la lógica para eliminar el proveedor
  }
}