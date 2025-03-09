import {
    registrarProducto as registrarProductoService,
    obtenerProductos as obtenerProductosService,
    obtenerProductoPorId as obtenerProductoPorIdService,
    actualizarProducto as actualizarProductoService,
    eliminarProducto as eliminarProductoService,
    obtenerProductosInvent as obtenerProductosInventService,
    actualizarExistencias as actualizarExistenciasService,
    buscarProductosPorNombre as buscarProductosPorNombreService
} from '../services/productos.service.js';
import multer from 'multer';

// Configuración de Multer para guardar las fotos en la carpeta "uploads"
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// Registrar un nuevo producto
export const registrarProducto = async (req, res) => {
    try {
        const { nombre, categoria, marca, precio_compra, precio_venta, existencias } = req.body;
        const foto = req.file ? req.file.path : null; // Ruta de la foto

        const id = await registrarProductoService(nombre, categoria, marca, precio_compra, precio_venta, foto, existencias);

        res.status(201).json({ message: 'Producto registrado exitosamente', id });
    } catch (error) {
        console.error('Error al registrar el producto:', error);
        res.status(500).json({ message: 'Error al registrar el producto' });
    }
};

// Obtener todos los productos
export const obtenerProductos = async (req, res) => {
    try {
        const productos = await obtenerProductosService();
        res.status(200).json(productos);
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ message: 'Error al obtener los productos' });
    }
};

// Obtener todos los productos para el inventario
export const obtenerProductosInvent = async (req, res) => {
    try {
        const productos = await obtenerProductosInventService();
        res.status(200).json(productos);
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ message: 'Error al obtener los productos' });
    }
};

// Obtener un producto por ID
export const obtenerProductoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await obtenerProductoPorIdService(id);

        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.status(200).json(producto);
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).json({ message: 'Error al obtener el producto' });
    }
};

// Actualizar un producto
export const actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, categoria, marca, precio_compra, precio_venta, existencias } = req.body;

        const actualizado = await actualizarProductoService(id, nombre, categoria, marca, precio_compra, precio_venta, existencias);

        if (!actualizado) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.status(200).json({ message: 'Producto actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).json({ message: 'Error al actualizar el producto' });
    }
};

// Eliminar un producto
export const eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const eliminado = await eliminarProductoService(id);

        if (!eliminado) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.status(200).json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ message: 'Error al eliminar el producto' });
    }
};

export const reabastecerProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { existencias } = req.body;

        const producto = await obtenerProductoPorIdService(id);
        if(!producto){
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        if (existencias <= producto.existencias) {
            return res.status(400).json({ message: 'La cantidad de existencias debe ser mayor a la actual' });
        }

        const actualizado = await actualizarExistenciasService(id, existencias);  
        if(!actualizado){
            return res.status(404).json({ message: 'No se pudo actualizar' });
        }

        res.status(200).json({ message: 'Producto actualizado exitosamente' }); 
    } catch (error) {
        console.error('Error al reabastecer el producto:', error);
        res.status(500).json({ message: 'Error al reabastecer el producto' });
    }
};

// Buscar productos por nombre
export const buscarProductosPorNombre = async (req, res) => {
    try {
        const { nombre } = req.query; // Obtener el nombre desde la query string
        if (!nombre) {
            return res.status(400).json({ message: 'El parámetro "nombre" es requerido' });
        }

        const productos = await buscarProductosPorNombreService(nombre);

        // Si no se encuentran productos, devolver un arreglo vacío
        if (productos.length === 0) {
            return res.status(200).json([]);
        }

        res.status(200).json(productos);
    } catch (error) {
        console.error('Error al buscar productos por nombre:', error);
        res.status(500).json({ message: 'Error al buscar productos por nombre' });
    }
};

// Subir foto de producto
export const subirFoto = upload.single('foto');