import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductosComponent } from './productos/productos.component';
import { RegistrarProductoComponent } from './registrar-producto/registrar-producto.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'productos', component: ProductosComponent },
    { path: 'registrar-producto', component: RegistrarProductoComponent },
    { path: '**', redirectTo: '' }
];
