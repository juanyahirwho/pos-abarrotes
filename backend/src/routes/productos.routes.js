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
import { registrarVenta, obtenerDetallesVenta, obtenerVentas } from '../controllers/ventas.controller.js'; // Importar controladores de ventas

const router = express.Router();

// Rutas de productos
router.get('/productos', obtenerProductos);
router.get('/productos/buscar', buscarProductosPorNombre);
router.get('/productos/:id', obtenerProductoPorId);
router.post('/productos', subirFoto, registrarProducto);
router.put('/productos/:id', subirFoto, actualizarProducto);
router.delete('/productos/:id', eliminarProducto);
router.put('/productos/reabastecer/:id', reabastecerProducto);
router.get('/productos-inventario', obtenerProductosInvent);

// Rutas de ventas
router.post('/ventas', registrarVenta);
router.get('/ventas', obtenerVentas);
router.get('/ventas/:id', obtenerDetallesVenta);

export default router;