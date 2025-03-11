import express from 'express';
import cors from 'cors';
import productosRoutes from './routes/productos.routes.js'; // Importar el enrutador de productos

const app = express();

// Middlewares
app.use(cors()); // Habilitar CORS
app.use(express.json()); // Parsear el cuerpo de las solicitudes como JSON
app.use('/uploads', express.static('uploads')); // Servir archivos estáticos desde la carpeta "uploads"

// Montar el enrutador de productos bajo /api
app.use('/api', productosRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});