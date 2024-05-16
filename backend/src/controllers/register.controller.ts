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
        const NEW_REGISTER: Register = req.body;

        // CONNECTION TO THE DATABASE
        const CONNECTION = await connect();

        // CREATION THE QUERY
        const QUERY = `
            INSERT INTO tbl_register SET ?;
        `;

        // EXECUTE THE QUERY
        await CONNECTION.query(QUERY, [NEW_REGISTER]);

        // RESPONSE OF THE FUNCTION
        return res.status(200).json({
            message: 'Register created successfully'
        });
    } catch (error) {
        // HANDLE THE ERROR
        const ERR = error as Error;
        return res.status(500).json({
            message: 'An error occurred while creating the register',
            error: ERR.message
        });
    }
}

//DEFINITION TO THE updateRegister CONTROLLER TO UPDATE A REGISTER BY ID
export async function updateRegister(req: Request, res: Response): Promise<Response> {
    try {
        // IDENTIFY THE DATA TO UPDATE A REGISTER
        const UPDATE_REGISTER: Register = req.body;

        // CONNECTION TO THE DATABASE
        const CONNECTION = await connect();

        // UPDATE THE REGISTER
        const QUERY = `
            UPDATE tbl_register
            SET ?
            WHERE document_id_fk = ?;
        `;
        await CONNECTION.query(QUERY, [UPDATE_REGISTER, UPDATE_REGISTER.document_id_fk]);

        // RESPONSE OF THE FUNCTION
        return res.status(200).json({
            message: 'Register updated successfully'
        });
    } catch (error) {
        // HANDLE THE ERROR
        const ERR = error as Error;
        return res.status(500).json({
            message: 'An error occurred while updating the register',
            error: ERR.message
        });
    }
}