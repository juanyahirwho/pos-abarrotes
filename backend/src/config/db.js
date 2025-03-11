import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Abrir la conexión a la base de datos SQLite
const db = await open({
    filename: './src/config/database.sqlite', // Ruta a tu archivo de base de datos SQLite
    driver: sqlite3.Database
});

export default db;