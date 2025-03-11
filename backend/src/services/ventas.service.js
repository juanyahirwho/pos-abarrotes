import db from '../config/db.js';

// Registrar una nueva venta
export const registrarVenta = async (total, detalles) => {
    try {
        await db.run('BEGIN TRANSACTION'); // Iniciar transacción

        // Verificar existencias antes de registrar la venta
        for (const detalle of detalles) {
            const producto = await db.get(
                'SELECT existencias FROM productos WHERE id = ?',
                [detalle.id_producto]
            );

            if (!producto) {
                throw new Error(`Producto con ID ${detalle.id_producto} no encontrado`);
            }

            if (producto.existencias < detalle.cantidad) {
                throw new Error(`No hay suficientes existencias para el producto con ID ${detalle.id_producto}`);
            }
        }

        // Insertar la venta en la tabla ventas
        const resultVenta = await db.run(
            'INSERT INTO ventas (total) VALUES (?)',
            [total]
        );
        const idVenta = resultVenta.lastID; // Obtener el ID de la venta insertada

        // Insertar los detalles de la venta en la tabla detalles_venta
        for (const detalle of detalles) {
            await db.run(
                'INSERT INTO detalles_venta (id_venta, id_producto, cantidad, precio_unitario, subtotal) VALUES (?, ?, ?, ?, ?)',
                [idVenta, detalle.id_producto, detalle.cantidad, detalle.precio_unitario, detalle.subtotal]
            );

            // Actualizar las existencias del producto
            await db.run(
                'UPDATE productos SET existencias = existencias - ? WHERE id = ?',
                [detalle.cantidad, detalle.id_producto]
            );
        }

        await db.run('COMMIT'); // Confirmar transacción
        return idVenta;
    } catch (error) {
        await db.run('ROLLBACK'); // Revertir transacción en caso de error
        throw new Error(`Error al registrar la venta: ${error.message}`);
    }
};

// Obtener todas las ventas
export const obtenerVentas = async () => {
    try {
        // Obtener todas las ventas
        const ventas = await db.all('SELECT * FROM ventas');

        // Para cada venta, obtener sus detalles (productos)
        for (const venta of ventas) {
            const detalles = await db.all(
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
        const detalles = await db.all(
            'SELECT dv.id_producto, p.nombre, dv.cantidad, dv.precio_unitario, dv.subtotal FROM detalles_venta dv JOIN productos p ON dv.id_producto = p.id WHERE dv.id_venta = ?',
            [idVenta]
        );
        return detalles;
    } catch (error) {
        throw new Error(`Error al obtener los detalles de la venta: ${error.message}`);
    }
};