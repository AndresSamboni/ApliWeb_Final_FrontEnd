import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { connect } from '../connection/dbConnection';

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const connection = await connect();
    const [rows]: any = await connection.query('SELECT * FROM tbl_user WHERE user_name = ?', [username]);

    if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await bcrypt.compare(password, user.password);

        if (validPassword) {
            const userRole = user.role_id_fk === 1 ? 'SUPER ADMINISTRADOR' : 'USUARIO'; // Ajusta según tu lógica de roles
            return res.json({ success: true, userRole });
        } else {
            return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
        }
    } else {
        return res.status(401).json({ success: false, message: 'Usuario no encontrado' });
    }
};
