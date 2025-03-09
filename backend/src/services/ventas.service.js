import pool from '../config/db.js';

// Registrar una nueva venta
export const registrarVenta = async (total, detalles) => {
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction(); // Iniciar transacción

        // Insertar la venta en la tabla ventas
        const [resultVenta] = await connection.query(
            'INSERT INTO ventas (total) VALUES (?)',
            [total]
        );
        const idVenta = resultVenta.insertId;

        // Insertar los detalles de la venta en la tabla detalles_venta
        for (const detalle of detalles) {
            await connection.query(
                'INSERT INTO detalles_venta (id_venta, id_producto, cantidad, precio_unitario, subtotal) VALUES (?, ?, ?, ?, ?)',
                [idVenta, detalle.id_producto, detalle.cantidad, detalle.precio_unitario, detalle.subtotal]
            );

            // Actualizar las existencias del producto
            await connection.query(
                'UPDATE productos SET existencias = existencias - ? WHERE id = ?',
                [detalle.cantidad, detalle.id_producto]
            );
        }

        await connection.commit(); // Confirmar transacción
        return idVenta;
    } catch (error) {
        await connection.rollback(); // Revertir transacción en caso de error
        throw error;
    } finally {
        connection.release(); // Liberar la conexión
    }
};

// Obtener detalles de una venta por ID
export const obtenerDetallesVenta = async (idVenta) => {
    const [rows] = await pool.query(
        'SELECT dv.id_producto, p.nombre, dv.cantidad, dv.precio_unitario, dv.subtotal FROM detalles_venta dv JOIN productos p ON dv.id_producto = p.id WHERE dv.id_venta = ?',
        [idVenta]
    );
    return rows;
};