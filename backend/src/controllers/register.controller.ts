// IMPORT REQUEST AND RESPONSE FROM EXPRESS
import { Request, Response } from 'express';

// IMPORT DATABASE CONNECTION
import { connect } from '../connection/dbConnection';

// IMPORT REGISTER INTERFACE
import { Register } from '../interfaces/register.interface';

// DEFINITION OF THE setRegister CONTROLLER TO CREATE A NEW REGISTER
export async function setRegister(req: Request, res: Response): Promise<Response> {
    try {
        // IDENTIFY THE DATA TO CREATE A NEW REGISTER
        const newRegister: Register = req.body;

        // CONNECTION TO THE DATABASE
        const CONNECTION = await connect();

        // CREATION THE QUERY
        const QUERY = `
            INSERT INTO tbl_register SET ?;
        `;

        // EXECUTE THE QUERY
        await CONNECTION.query(QUERY, [newRegister]);

        // RESPONSE OF THE FUNCTION
        return res.json({
            message: 'Register created successfully'
        });
    } catch (error) {
        // HANDLE THE ERROR
        const err = error as Error;
        return res.status(500).json({ message: 'An error occurred while creating the register', error: err.message });
    }
}