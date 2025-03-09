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
    import { registrarVenta, obtenerDetallesVenta } from '../controllers/ventas.controller.js'; // Importar controladores de ventas

    const router = express.Router();

    
    // Buscar productos por nombre
    router.get('/productos/buscar', buscarProductosPorNombre);


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
    router.get('/productos-inventario', obtenerProductosInvent);

    // Registrar una nueva venta
    router.post('/ventas', registrarVenta);

    // Obtener detalles de una venta por ID
    router.get('/ventas/:id', obtenerDetallesVenta);

    export default router;