import db from '../config/db.js';

// Registrar un nuevo producto
export const registrarProducto = async (nombre, categoria, marca, precio_compra, precio_venta, foto, existencias) => {
    const sql = `INSERT INTO productos (nombre, categoria, marca, precio_compra, precio_venta, foto, existencias) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const result = await db.run(sql, [nombre, categoria, marca, precio_compra, precio_venta, foto, existencias]);
    return result.lastID; // Retorna el ID del producto registrado
};

// Obtener todos los productos
export const obtenerProductos = async () => {
    const sql = `SELECT * FROM productos`;
    const productos = await db.all(sql);
    return productos;
};

// Obtener un producto por ID
export const obtenerProductoPorId = async (id) => {
    const sql = `SELECT * FROM productos WHERE id = ?`;
    const producto = await db.get(sql, [id]);
    return producto;
};

// Actualizar un producto
export const actualizarProducto = async (id, nombre, categoria, marca, precio_compra, precio_venta, existencias) => {
    const sql = `UPDATE productos SET nombre = ?, categoria = ?, marca = ?, precio_compra = ?, precio_venta = ?, existencias = ? WHERE id = ?`;
    const result = await db.run(sql, [nombre, categoria, marca, precio_compra, precio_venta, existencias, id]);
    return result.changes; // Retorna el número de filas afectadas
};

// Eliminar un producto
export const eliminarProducto = async (id) => {
    const sql = `DELETE FROM productos WHERE id = ?`;
    const result = await db.run(sql, [id]);
    return result.changes; // Retorna el número de filas afectadas
};

// Obtener todos los productos para el inventario
export const obtenerProductosInvent = async () => {
    const sql = `SELECT * FROM productos`;
    const productos = await db.all(sql);
    return productos;
};

// Actualizar existencias de un producto
export const actualizarExistencias = async (id, existencias) => {
    const sql = `UPDATE productos SET existencias = ? WHERE id = ?`;
    const result = await db.run(sql, [existencias, id]);
    return result.changes; // Retorna el número de filas afectadas
};

// Buscar productos por nombre
export const buscarProductosPorNombre = async (nombre) => {
    const sql = `SELECT * FROM productos WHERE nombre LIKE ?`;
    const productos = await db.all(sql, [`%${nombre}%`]);
    return productos;
};