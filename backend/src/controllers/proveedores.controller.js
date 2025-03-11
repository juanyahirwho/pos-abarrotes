import {
    registrarProveedor as registrarProveedorService,
    obtenerProveedores as obtenerProveedoresService,
    actualizarProveedor as actualizarProveedorService,
    eliminarProveedor as eliminarProveedorService
} from '../services/proveedores.service.js';

// Registrar un nuevo proveedor
export const registrarProveedor = async (req, res) => {
    try {
        const { nombre, telefono } = req.body;
        const id = await registrarProveedorService(nombre, telefono);
        res.status(201).json({ message: 'Proveedor registrado exitosamente', id });
    } catch (error) {
        console.error('Error al registrar al proveedor:', error);
        res.status(500).json({ message: 'Error al registrar al proveedor' });
    }
};

// Obtener todos los proveedores
export const obtenerProveedores = async (req, res) => {
    try {
        const proveedores = await obtenerProveedoresService();
        res.status(200).json(proveedores);
    } catch (error) {
        console.error('Error al obtener los proveedores:', error);
        res.status(500).json({ message: 'Error al obtener los proveedores' });
    }
};

// Actualizar un proveedor
export const actualizarProveedor = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, telefono } = req.body;
        const affectedRows = await actualizarProveedorService(id, nombre, telefono);
        if (affectedRows > 0) {
            res.status(200).json({ message: 'Proveedor actualizado exitosamente' });
        } else {
            res.status(404).json({ message: 'Proveedor no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar el proveedor:', error);
        res.status(500).json({ message: 'Error al actualizar el proveedor' });
    }
};

// Eliminar un proveedor
export const eliminarProveedor = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedRows = await eliminarProveedorService(id);
        if (affectedRows > 0) {
            res.status(200).json({ message: 'Proveedor eliminado exitosamente' });
        } else {
            res.status(404).json({ message: 'Proveedor no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar el proveedor:', error);
        res.status(500).json({ message: 'Error al eliminar el proveedor' });
    }
};