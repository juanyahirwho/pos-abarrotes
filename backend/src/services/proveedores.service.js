import db from '../config/db.js';

// Registrar un nuevo proveedor
export const registrarProveedor = async (nombre, telefono) => {
    const result = await db.run(
        'INSERT INTO proveedores (nombre, telefono) VALUES (?, ?)',
        [nombre, telefono]
    );
    return result.lastID; // Retorna el ID del proveedor registrado
};

// Obtener todos los proveedores
export const obtenerProveedores = async () => {
    const proveedores = await db.all('SELECT * FROM proveedores');
    return proveedores;
};

// Actualizar un proveedor
export const actualizarProveedor = async (id, nombre, telefono) => {
    const result = await db.run(
        'UPDATE proveedores SET nombre = ?, telefono = ? WHERE id = ?',
        [nombre, telefono, id]
    );
    return result.changes; // Retorna el número de filas afectadas
};

// Eliminar un proveedor
export const eliminarProveedor = async (id) => {
    const result = await db.run(
        'DELETE FROM proveedores WHERE id = ?',
        [id]
    );
    return result.changes; // Retorna el número de filas afectadas
};