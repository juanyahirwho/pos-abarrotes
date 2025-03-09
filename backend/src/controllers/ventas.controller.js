import {
    registrarVenta as registrarVentaService,
    obtenerVentas as obtenerVentasService,
    obtenerDetallesVenta as obtenerDetallesVentaService
} from '../services/ventas.service.js';

// Registrar una nueva venta
export const registrarVenta = async (req, res) => {
    try {
        const { total, detalles } = req.body; // Detalles incluye id_producto, cantidad, precio_unitario, subtotal

        // Validar que los detalles no estén vacíos
        if (!detalles || detalles.length === 0) {
            return res.status(400).json({ message: 'No se han proporcionado detalles de la venta' });
        }

        // Validar que el total sea un número positivo
        if (typeof total !== 'number' || total <= 0) {
            return res.status(400).json({ message: 'El total de la venta no es válido' });
        }

        // Registrar la venta y obtener el ID de la venta
        const idVenta = await registrarVentaService(total, detalles);

        res.status(201).json({ message: 'Venta registrada exitosamente', idVenta });
    } catch (error) {
        console.error('Error al registrar la venta:', error);
        res.status(500).json({ message: error.message || 'Error al registrar la venta' });
    }
};

// Obtener todas las ventas
export const obtenerVentas = async (req, res) => {
    try {
        const ventas = await obtenerVentasService();
        res.status(200).json(ventas);
    } catch (error) {
        console.error('Error al obtener las ventas:', error);
        res.status(500).json({ message: 'Error al obtener las ventas' });
    }
};

// Obtener detalles de una venta por ID
export const obtenerDetallesVenta = async (req, res) => {
    try {
        const { id } = req.params;
        const detalles = await obtenerDetallesVentaService(id);

        if (!detalles || detalles.length === 0) {
            return res.status(404).json({ message: 'No se encontraron detalles para la venta' });
        }

        res.status(200).json(detalles);
    } catch (error) {
        console.error('Error al obtener los detalles de la venta:', error);
        res.status(500).json({ message: 'Error al obtener los detalles de la venta' });
    }
};