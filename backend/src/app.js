import express from 'express';
import cors from 'cors';
import productosRoutes from './routes/productos.routes.js'; // Asegúrate de importar el enrutador correcto

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Montar el enrutador de productos bajo /api
app.use('/api', productosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});