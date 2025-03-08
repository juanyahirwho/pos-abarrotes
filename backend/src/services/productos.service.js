import pool from '../config/db.js';

// Registrar un nuevo producto
export const registrarProducto = async (nombre, categoria, marca, precio_compra, precio_venta, foto, existencias) => {
    const [result] = await pool.query(
        'INSERT INTO productos (nombre, categoria, marca, precio_compra, precio_venta, foto, existencias) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [nombre, categoria, marca, precio_compra, precio_venta, foto, existencias]
    );
    return result.insertId; // Retorna el ID del producto registrado
};

// Obtener todos los productos
export const obtenerProductos = async () => {
    const [rows] = await pool.query('SELECT * FROM productos');
    return rows;
};

// Obtener un producto por ID
export const obtenerProductoPorId = async (id) => {
    const [rows] = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
    return rows[0]; // Retorna el primer resultado (o undefined si no existe)
};

// Actualizar un producto
export const actualizarProducto = async (id, nombre, categoria, marca, precio_compra, precio_venta, existencias) => {
    const [result] = await pool.query(
        'UPDATE productos SET nombre = ?, categoria = ?, marca = ?, precio_compra = ?, precio_venta = ?, existencias = ? WHERE id = ?',
        [nombre, categoria, marca, precio_compra, precio_venta, existencias, id]
    );
    return result.affectedRows > 0; // Retorna true si se actualizó el producto
};

// Eliminar un producto
export const eliminarProducto = async (id) => {
    const [result] = await pool.query('DELETE FROM productos WHERE id = ?', [id]);
    return result.affectedRows > 0; // Retorna true si se eliminó el producto
};

// Actualizar existencias de un producto
export const actualizarExistenciasService = async (id, existencias) => {
    const [result] = await pool.query(
        'UPDATE productos SET existencias = ? WHERE id = ?',
        [existencias, id]
    );
    return result.affectedRows > 0; // Retorna true si se actualizó el producto
};

export const obtenerProductosInvent = async () => {
    const [rows] = await pool.query('SELECT * FROM productos');
    return rows;
};
