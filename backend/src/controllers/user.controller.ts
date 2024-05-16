// IMPORT REQUEST AND RESPONSE MODULES
import { Request, Response } from "express";

// IMPORT THE CONNECTION WITH THE DATABASE
import { connect } from "../connection/dbConnection";

// IMPORT THE USER INTERFACE
import { User } from "../interfaces/user.interface";

// DEFINITION OF THE getUsers CONTROLLER TO OBTAIN THE LIST OF USERS
export async function getUsers(req: Request, res: Response): Promise<Response> {
    try {
        // CONNECTION TO THE DATABASE
        const CONNECTION = await connect();

        //CREATION THE QUERY
        const QUERY = `
            SELECT *
            FROM tbl_user;
        `;

        // EXECUTE THE QUERY
        const [result] = await CONNECTION.query(QUERY);

        // RESPONSE OF THE FUNCTION
        return res.json(result);
    } catch (error) {
        // HANDLE THE ERROR
        const err = error as Error;
        return res.status(500).json({ message: 'An error occurred while getting the users', error: err.message });
    }
}

// DEFINITION OF THE setUser CONTROLLER TO CREATE A NEW USER
export async function setUser(req: Request, res: Response): Promise<Response> {
    try {
        // IDENTIFY THE DATA TO CREATE A NEW USER
        const newUser: User = req.body;
        
        // CONNECTION TO THE DATABASE
        const CONNECTION = await connect();

        // CREATION THE QUERY
        const QUERY = `
            INSERT INTO tbl_user SET ?;
        `;

        // EXECUTE THE QUERY
        await CONNECTION.query(QUERY, [newUser]);

        //RESPONSE OF THE FUNCTION
        return res.json({
            message: 'User created successfully'
        });
    } catch (error) {
        // HANDLE THE ERROR
        const err = error as Error;
        return res.status(500).json({ message: 'An error occurred while creating the user', error: err.message });
    }
}

// DEFINITION OF THE getUser CONTROLLER TO OBTAIN A USER BY ID
export async function getUser(req: Request, res: Response): Promise<Response> {
    try {
        // IDENTIFY THE USER ID
        const { id } = req.params;

        // CONNECTION TO THE DATABASE
        const CONNECTION = await connect();

        // CREATION THE QUERY
        const QUERY = `
            SELECT *
            FROM tbl_user
            WHERE id = ?;
        `;

        // EXECUTE THE QUERY
        const [result] = await CONNECTION.query(QUERY, [id]);

        // RESPONSE OF THE FUNCTION
        return res.json(result);
    } catch (error) {
        // HANDLE THE ERROR
        const err = error as Error;
        return res.status(500).json({ message: 'An error occurred while getting the user', error: err.message });
    }
}