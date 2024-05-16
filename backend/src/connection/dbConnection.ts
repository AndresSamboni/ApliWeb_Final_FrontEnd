// IMPORT CONNECTION LIBRARIES
import { createPool } from 'mysql2/promise';

// PARAMETERS TO DATABASE CONNECTION
const DB_CONFIG = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: '',
    DATABASE: 'db_gestion',
    PORT: 3306
};

// CREATE DATABASE CONNECTION
export async function connect() {
    const CONNECTION = await createPool({
        host: DB_CONFIG.HOST,
        user: DB_CONFIG.USER,
        password: DB_CONFIG.PASSWORD,
        database: DB_CONFIG.DATABASE,
        port: DB_CONFIG.PORT,
        connectionLimit: 10
    });

    return CONNECTION;
}