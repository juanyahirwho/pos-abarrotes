import express from 'express';
import {
    registrarProducto,
    obtenerProductos,
    obtenerProductoPorId,
    actualizarProducto,
    eliminarProducto,
    subirFoto,
    reabastecerProducto,
    obtenerProductosInvent
} from '../controllers/productos.controller.js';
const router = express.Router();

// Registrar un nuevo producto
router.post('/productos', subirFoto, registrarProducto);

// Obtener todos los productos
router.get('/productos', obtenerProductos);

// Obtener un producto por ID
router.get('/productos/:id', obtenerProductoPorId);

// Actualizar un producto
router.put('/productos/:id', subirFoto, actualizarProducto);

// Eliminar un producto
router.delete('/productos/:id', eliminarProducto);

// Reabastecer un producto
router.put('/productos/reabastecer/:id', reabastecerProducto);

// Obtener todos los productos para el inventario
router.get('/productos', obtenerProductosInvent);

export default router;