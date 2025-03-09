import pool from '../config/db.js';

// Registrar una nueva venta
export const registrarVenta = async (total, detalles) => {
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction(); // Iniciar transacción

        // Verificar existencias antes de registrar la venta
        for (const detalle of detalles) {
            const [producto] = await connection.query(
                'SELECT existencias FROM productos WHERE id = ?',
                [detalle.id_producto]
            );

            if (producto.length === 0) {
                throw new Error(`Producto con ID ${detalle.id_producto} no encontrado`);
            }

            if (producto[0].existencias < detalle.cantidad) {
                throw new Error(`No hay suficientes existencias para el producto con ID ${detalle.id_producto}`);
            }
        }

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
        throw new Error(`Error al registrar la venta: ${error.message}`);
    } finally {
        connection.release(); // Liberar la conexión
    }
};

export const obtenerVentas = async () => {
    try {
        // Obtener todas las ventas
        const [ventas] = await pool.query('SELECT * FROM ventas');

        // Para cada venta, obtener sus detalles (productos)
        for (const venta of ventas) {
            const [detalles] = await pool.query(
                `SELECT 
                    dv.id_producto, 
                    p.nombre, 
                    p.foto AS img,  -- Incluir la imagen del producto
                    dv.cantidad, 
                    dv.precio_unitario, 
                    dv.subtotal 
                 FROM detalles_venta dv 
                 JOIN productos p ON dv.id_producto = p.id 
                 WHERE dv.id_venta = ?`,
                [venta.id_venta]
            );
            venta.productos = detalles; // Agregar los productos a la venta
        }

        return ventas;
    } catch (error) {
        throw new Error(`Error al obtener las ventas: ${error.message}`);
    }
};

// Obtener detalles de una venta por ID
export const obtenerDetallesVenta = async (idVenta) => {
    try {
        const [rows] = await pool.query(
            'SELECT dv.id_producto, p.nombre, dv.cantidad, dv.precio_unitario, dv.subtotal FROM detalles_venta dv JOIN productos p ON dv.id_producto = p.id WHERE dv.id_venta = ?',
            [idVenta]
        );
        return rows;
    } catch (error) {
        throw new Error(`Error al obtener los detalles de la venta: ${error.message}`);
    }
};