import pool from '../config/db.js';

// Registrar un nuevo proveedor
export const registrarProveedor = async (nombre, telefono) => {
    const [result] = await pool.query(
        'INSERT INTO proveedores (nombre, telefono) VALUES (?, ?)',
        [nombre, telefono]
    );
    return result.insertId; // Retorna el ID del proveedor registrado
};

// Mostrar los proveedores
export const obtenerProveedores = async () => {
    const [proveedores] = await pool.query('SELECT * FROM proveedores');
    return proveedores;
};

export const actualizarProveedor = async (id, nombre, telefono) => {
    const [result] = await pool.query(
        'UPDATE proveedores SET nombre = ?, telefono = ? WHERE id = ?',
        [nombre, telefono, id]
    );
    return result.affectedRows;
};

export const eliminarProveedor = async (id) => {
    const [result] = await pool.query('DELETE FROM proveedores WHERE id = ?', [id]);
    return result.affectedRows;
};


