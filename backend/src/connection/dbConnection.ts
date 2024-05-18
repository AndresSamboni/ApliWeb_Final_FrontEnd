import { createPool } from 'mysql2/promise';

const DB_CONFIG = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: '',
    DATABASE: 'db_gestion',
    PORT: 3306
};

export async function connect() {
    const connection = await createPool({
        host: DB_CONFIG.HOST,
        user: DB_CONFIG.USER,
        password: DB_CONFIG.PASSWORD,
        database: DB_CONFIG.DATABASE,
        port: DB_CONFIG.PORT
    });

    return connection;
}
