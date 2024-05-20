const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');

const users = [
    { id: 1, password: 'admin' },
    { id: 2, password: 'contraseña2' },
    { id: 3, password: 'contraseña1' }
];

async function hashPassword(plainPassword) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;
}

async function updatePasswords() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'db_gestion'
    });

    for (const user of users) {
        const hashedPassword = await hashPassword(user.password);
        await connection.execute('UPDATE tbl_user SET password = ? WHERE id = ?', [hashedPassword, user.id]);
    }

    connection.end();
}

updatePasswords().then(() => {
    console.log('Passwords updated successfully');
}).catch(err => {
    console.error('Error updating passwords:', err);
});
