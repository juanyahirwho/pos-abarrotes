import express from 'express';
import {
    registrarProducto,
    obtenerProductos,
    obtenerProductoPorId,
    actualizarProducto,
    eliminarProducto,
    subirFoto,
    reabastecerProducto,
    obtenerProductosInvent,
    buscarProductosPorNombre
} from '../controllers/productos.controller.js';
import { registrarVenta, obtenerDetallesVenta, obtenerVentas } from '../controllers/ventas.controller.js';
import { registrarProveedor, obtenerProveedores, actualizarProveedor, eliminarProveedor } from '../controllers/proveedores.controller.js';

const router = express.Router();

// Rutas de productos
router.get('/productos', obtenerProductos); // Obtener todos los productos
router.get('/productos/buscar', buscarProductosPorNombre); // Buscar productos por nombre
router.get('/productos/:id', obtenerProductoPorId); // Obtener un producto por ID
router.post('/productos', subirFoto, registrarProducto); // Registrar un nuevo producto
router.put('/productos/:id', subirFoto, actualizarProducto); // Actualizar un producto
router.delete('/productos/:id', eliminarProducto); // Eliminar un producto
router.put('/productos/reabastecer/:id', reabastecerProducto); // Reabastecer un producto
router.get('/productos-inventario', obtenerProductosInvent); // Obtener productos para el inventario

// Rutas de ventas
router.post('/ventas', registrarVenta); // Registrar una nueva venta
router.get('/ventas', obtenerVentas); // Obtener todas las ventas
router.get('/ventas/:id', obtenerDetallesVenta); // Obtener detalles de una venta

// Rutas de proveedores
router.post('/proveedores', registrarProveedor); // Registrar un nuevo proveedor
router.get('/proveedores', obtenerProveedores); // Obtener todos los proveedores
router.put('/proveedores/:id', actualizarProveedor); // Actualizar un proveedor
router.delete('/proveedores/:id', eliminarProveedor); // Eliminar un proveedor

export default router;