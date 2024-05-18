import { Request, Response } from "express";
import { connect } from "../connection/dbConnection";
import { User } from "../interfaces/user.interface";

// DEFINITION OF THE getUsers CONTROLLER TO OBTAIN THE LIST OF USERS
export async function getUsers(req: Request, res: Response): Promise<Response> {
    try {
        const CONNECTION = await connect();
        const QUERY = `
            SELECT *
            FROM tbl_user
            WHERE state = 1;
        `;
        const [rows] = await CONNECTION.query(QUERY);
        const users: User[] = (rows as any[]).map(user => ({
            ...user,
            state: Boolean(user.state)
        }));
        return res.status(200).json(users);
    } catch (error) {
        const ERR = error as Error;
        console.error("Error fetching users:", ERR.message);
        return res.status(500).json({
            message: 'An error occurred while getting the users',
            error: ERR.message
        });
    }
}

// DEFINITION OF THE setUser CONTROLLER TO CREATE A NEW USER
export async function setUser(req: Request, res: Response): Promise<Response> {
    try {
        const NEW_USER: User = req.body;
        const CONNECTION = await connect();
        const CHECK_QUERY = `
            SELECT *
            FROM tbl_user
            WHERE document_number = ?;
        `;
        const [rows] = await CONNECTION.query(CHECK_QUERY, [NEW_USER.document_number]);
        const EXISTING_USER: Array<User> = rows as Array<User>;
        if (EXISTING_USER.length > 0 && EXISTING_USER[0].state) {
            return res.status(200).json({
                message: 'User already exists and it is active'
            });
        } else if (EXISTING_USER.length > 0 && !EXISTING_USER[0].state) {
            return res.status(200).json({
                message: 'User already exists and it is inactive',
                ID_user: EXISTING_USER[0].id
            });
        }

        const QUERY = `
            INSERT INTO tbl_user SET ?;
        `;
        await CONNECTION.query(QUERY, [NEW_USER]);
        return res.status(200).json({
            message: 'User created successfully'
        });
    } catch (error) {
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
        const { ID } = req.params;
        const CONNECTION = await connect();
        const QUERY = `
            SELECT *
            FROM tbl_user
            WHERE id = ?;
        `;
        const [rows] = await CONNECTION.query(QUERY, [ID]);
        const user: User = (rows as any[])[0] as User;
        return res.status(200).json(user);
    } catch (error) {
        const ERR = error as Error;
        return res.status(500).json({
            message: 'An error occurred while getting the user',
            error: ERR.message
        });
    }
}

// DEFINITION OF THE updateUser CONTROLLER TO UPDATE A USER BY ID
export async function updateUser(req: Request, res: Response): Promise<Response> {
    try {
        const { ID } = req.params;
        const UPDATE_USER: Partial<User> = req.body;
        const CONNECTION = await connect();
        const QUERY = `
            UPDATE tbl_user
            SET ?
            WHERE id = ?;
        `;
        await CONNECTION.query(QUERY, [UPDATE_USER, ID]);
        return res.status(200).json({
            message: 'User updated successfully'
        });
    } catch (error) {
        const ERR = error as Error;
        return res.status(500).json({
            message: 'An error occurred while updating the user',
            error: ERR.message
        });
    }
}

// DEFINITION TO THE disableUser CONTROLLER TO DISABLE USER BY ID
export async function disableUser(req: Request, res: Response): Promise<Response> {
    try {
        const { ID } = req.params;
        const CONNECTION = await connect();
        const QUERY = `
            UPDATE tbl_user
            SET state = 0
            WHERE id = ?;
        `;
        await CONNECTION.query(QUERY, [ID]);
        return res.status(200).json({
            message: 'User disabled successfully'
        });
    } catch (error) {
        const ERR = error as Error;
        return res.status(500).json({
            message: 'An error occurred while disabling the user',
            error: ERR.message
        });
    }
}

// DEFINITION TO THE enableUser CONTROLLER TO ENABLE USER BY ID
export async function enableUser(req: Request, res: Response): Promise<Response> {
    try {
        const { ID } = req.params;
        const CONNECTION = await connect();
        const QUERY = `
            UPDATE tbl_user
            SET state = 1
            WHERE id = ?;
        `;
        await CONNECTION.query(QUERY, [ID]);
        return res.status(200).json({
            message: 'User enabled successfully'
        });
    } catch (error) {
        const ERR = error as Error;
        return res.status(500).json({
            message: 'An error occurred while enabling the user',
            error: ERR.message
        });
    }
}
