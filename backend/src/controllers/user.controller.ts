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

        // GET ALL USERS
        const QUERY = `
            SELECT *
            FROM tbl_user
            WHERE state = 1;
        `;
        const [RESULT] = await CONNECTION.query(QUERY);

        // RESPONSE OF THE FUNCTION
        return res.status(200).json(RESULT);
    } catch (error) {
        // HANDLE THE ERROR
        const ERR = error as Error;
        return res.status(500).json({
            message: 'An error occurred while getting the users',
            error: ERR.message
        });
    }
}

// DEFINITION OF THE setUser CONTROLLER TO CREATE A NEW USER
export async function setUser(req: Request, res: Response):Promise<Response> {
    try {
        // IDENTIFY THE DATA TO CREATE A NEW USER
        const NEW_USER: User = req.body;
        
        // CONNECTION TO THE DATABASE
        const CONNECTION = await connect();

        // CHECK IF USER ALREADY EXISTS
        const CHECK_QUERY = `
            SELECT *
            FROM tbl_user
            WHERE document_number = ?;
        `;
        const [RESULT]= await CONNECTION.query(CHECK_QUERY, [NEW_USER.document_number]);
        const EXISTING_USER: Array<User> = RESULT as Array<User>;
        if (EXISTING_USER.length > 0 && EXISTING_USER[0].state) {
            return res.status(200).json({
                message: 'User already exists and it is active'
            });
        }
        else if (EXISTING_USER.length > 0 && !EXISTING_USER[0].state) {
            return res.status(200).json({
                message: 'User already exists and it is inactive',
                ID_user: EXISTING_USER[0].id
            });
        }

        // CREATION THE NEW USER
        const QUERY = `
            INSERT INTO tbl_user SET ?;
        `;
        await CONNECTION.query(QUERY, [NEW_USER]);

        //RESPONSE OF THE FUNCTION
        return res.status(200).json({
            message: 'User created successfully'
        });
    } catch (error) {
        // HANDLE THE ERROR
        const ERR = error as Error;
        return res.status(500).json({
            message: 'An error occurred while creating the user',
            error: ERR.message
        });
    }
}

// DEFINITION OF THE getUser CONTROLLER TO OBTAIN A USER BY ID
export async function getUser(req: Request, res: Response): Promise<Response> {
    try {
        // IDENTIFY THE USER ID
        const { ID } = req.params;

        // CONNECTION TO THE DATABASE
        const CONNECTION = await connect();

        // GET THE USER BY ID
        const QUERY = `
            SELECT *
            FROM tbl_user
            WHERE id = ?;
        `;
        const [RESULT] = await CONNECTION.query(QUERY, [ID]);

        // RESPONSE OF THE FUNCTION
        return res.status(200).json(RESULT);
    } catch (error) {
        // HANDLE THE ERROR
        const ERR = error as Error;
        return res.status(500).json({
            message: 'An error occurred while getting the user',
            error: ERR.message
        });
    }
}

// DEFINITION OF THE updateUser CONTROLLER TO UPDATE A USER BY ID
export async function updateUser(req: Request, res: Response): Promise<Response>{
    try {
        // IDENTIFY THE DATA TO UPDATE A USER BY ID
        const { ID } = req.params;
        const UPDATE_USER: User = req.body;

        // CONNECTION TO THE DATABASE
        const CONNECTION = await connect();

        // UPDATE THE USER
        const QUERY = `
            UPDATE tbl_user
            SET ?
            WHERE id = ?;
        `;
        await CONNECTION.query(QUERY, [UPDATE_USER, ID]);
        
        // RESPONSE OF THE FUNCTION
        return res.status(200).json({
            message: 'User updated successfully'
        });
    } catch (error) {
        // HANDLE THE ERROR
        const ERR = error as Error;
        return res.status(500).json({
            message: 'An error occurred while updating the user',
            error: ERR.message
        });
    }
}

// DEFINITION TO THE disableUser CONTROLLER TO DISABLE USER BY ID
export async function disableUser(req: Request, res: Response): Promise<Response>{
    try {
        // IDENTIFY THE USER ID TO DISABLE
        const { ID } = req.params;

        // CONNECTION TO THE DATABASE
        const CONNECTION = await connect();

        // DISABLE THE USER
        const QUERY = `
            UPDATE tbl_user
            SET state = 0
            WHERE id = ?;
        `;
        await CONNECTION.query(QUERY, [ID]);

        // RESPONSE OF THE FUNCTION
        return res.status(200).json({
            message: 'User disable successfully'
        });
    } catch (error) {
        // HANDLE THE ERROR
        const ERR = error as Error;
        return res.status(500).json({
            message: 'An error occurred while disabling the user',
            error: ERR.message
        });
    }
}

// DEFINITION TO THE enableUser CONTROLLER TO DISABLE USER BY ID
export async function enableUser(req: Request, res: Response): Promise<Response>{
    try {
        // IDENTIFY THE USER ID TO DISABLE
        const { ID } = req.params;

        // CONNECTION TO THE DATABASE
        const CONNECTION = await connect();

        // ENABLE THE USER
        const QUERY = `
            UPDATE tbl_user
            SET state = 1
            WHERE id = ?;
        `;
        await CONNECTION.query(QUERY, [ID]);

        // RESPONSE OF THE FUNCTION
        return res.status(200).json({
            message: 'User enable successfully'
        });
    } catch (error) {
        // HANDLE THE ERROR
        const ERR = error as Error;
        return res.status(500).json({
            message: 'An error occurred while enabling the user',
            error: ERR.message
        });
    }
}