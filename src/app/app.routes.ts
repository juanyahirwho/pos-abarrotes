import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductosComponent } from './productos/productos.component';
import { RegistrarProductoComponent } from './registrar-producto/registrar-producto.component';
import { ReabastecerProductoComponent } from './reabastecer-producto/reabastecer-producto.component';
import { InventarioComponent } from './inventario/inventario.component';
import { VentasComponent } from './ventas/ventas.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'productos', component: ProductosComponent },
    { path: 'registrar-producto', component: RegistrarProductoComponent },
    { path: 'reabastecer-producto', component: ReabastecerProductoComponent },
    { path: 'inventario', component: InventarioComponent },
    { path: 'ventas', component: VentasComponent },
    { path: 'proveedores', component: ProveedoresComponent },
    { path: '**', redirectTo: '' }
];
