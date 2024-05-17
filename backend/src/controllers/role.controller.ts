// IMPORT REQUEST AND RESPONSE MODULES
import { Request, Response } from "express";

// IMPORT THE CONNECTION WITH THE DATABASE
import { connect } from "../connection/dbConnection";

// IMPORT THE USER INTERFACE
import { Role } from "../interfaces/role.interface";

// DEFINITION OF THE getRoles CONTROLLER TO OBTAIN THE LIST OF ROLES
export async function getRoles(req: Request, res: Response): Promise<Response> {
    try {
        // CONNECTION TO THE DATABASE
        const CONNECTION = await connect();
    
        // GET ALL ROLES
        const QUERY = `
            SELECT *
            FROM tbl_role
            WHERE state = 1;
        `;
        const [RESULT] = await CONNECTION.query(QUERY);
    
        // RESPONSE OF THE FUNCTION
        return res.status(200).json(RESULT);
    } catch (error) {
        // HANDLE THE ERROR
        const ERR = error as Error;
        return res.status(500).json({
            message: 'An error occurred while getting the role',
            error: ERR.message
        });
    }
}

// DEFINITION OF THE setRole CONTROLLER TO CREATE A NEW ROLE
export async function setRole(req: Request, res: Response): Promise<Response> {
    try {
        // IDENTIFY THE DATA TO CREATE A NEW ROLE
        const NEW_ROLE: Role = req.body;
        
        // CONNECTION TO THE DATABASE
        const CONNECTION = await connect();

        // CHECK IF ROLE ALREADY EXISTS
        const CHECK_QUERY = `
            SELECT *
            FROM tbl_role
            WHERE name = ?;
        `;
        const [RESULT] = await CONNECTION.query(CHECK_QUERY, NEW_ROLE.name);
        const EXISTING_ROLE: Array<Role> = RESULT as Array<Role>;
        if (EXISTING_ROLE.length > 0 && EXISTING_ROLE[0].state) {
            return res.status(200).json({
                message: "Role already exists and it is active"
            });
        } else if (EXISTING_ROLE.length > 0 && !EXISTING_ROLE[0].state) {
            return res.status(200).json({
                message: "Role already exists and it is inactive",
                id_role: EXISTING_ROLE[0].id
            });
        }
    
        // CREATION THE NEW ROLE
        const QUERY = `
            INSERT INTO tbl_role SET ?;
        `;
        await CONNECTION.query(QUERY, [NEW_ROLE]);
    
        //RESPONSE OF THE FUNCTION
        return res.status(200).json({
            message: 'Role created successfully'
        });
    } catch (error) {
        // HANDLE THE ERROR
        const ERR = error as Error;
        return res.status(500).json({
            message: 'An error occurred while creating the role',
            error: ERR.message
        });
    }
}

// DEFINITION OF THE getRole CONTROLLER TO GET A ROLE BY ID
export async function getRole(req: Request, res: Response): Promise<Response> {
    try {
        // IDENTIFY THE DATA TO GET A ROLE BY ID
        const { ID } = req.params;
        
        // CONNECTION TO THE DATABASE
        const CONNECTION = await connect();
    
        // GET THE ROLE BY ID
        const QUERY = `
            SELECT *
            FROM tbl_role
            WHERE id = ?;
        `;
        const [RESULT] = await CONNECTION.query(QUERY, [ID]);
        // RESPONSE OF THE FUNCTION
        return res.json(RESULT);
    } catch (error) {
        // HANDLE THE ERROR
        const ERR = error as Error;
        return res.status(500).json({
            message: 'An error occurred while getting the role',
            error: ERR.message
        });
    }
}

// DEFINITION OF THE updateRole CONTROLLER TO UPDATE A ROLE BY ID
export async function updateRole(req: Request, res: Response) {
    try {
        // IDENTIFY THE DATA TO UPDATE A ROLE BY ID
        const { ID } = req.params;
        const UPDATE_ROLE: Role = req.body;
        
        // CONNECTION TO THE DATABASE
        const CONNECTION = await connect();

        // CHECK IF ROLE ALREADY EXISTS
        const CHECK_QUERY = `
            SELECT *
            FROM tbl_role
            WHERE name = ?;
        `;
        const [RESULT] = await CONNECTION.query(CHECK_QUERY, UPDATE_ROLE.name);
        const EXISTING_ROLE: Array<Role> = RESULT as Array<Role>;
        if (EXISTING_ROLE.length > 0 && EXISTING_ROLE[0].state) {
            return res.status(200).json({
                message: "Role already exists and it is active"
            });
        } else if (EXISTING_ROLE.length > 0 && !EXISTING_ROLE[0].state) {
            return res.status(200).json({
                message: "Role already exists and it is inactive",
                id_role: EXISTING_ROLE[0].id
            });
        }
    
        // UPDATE DE ROLE
        const QUERY = `
            UPDATE tbl_role
            SET ?
            WHERE id = ?;
        `;
        await CONNECTION.query(QUERY, [UPDATE_ROLE, ID]);
    
        //RESPONSE OF THE FUNCTION
        return res.status(200).json({
            message: 'Role updated successfully'
        });
    } catch (error) {
        // HANDLE THE ERROR
        const ERR = error as Error;
        return res.status(500).json({
            message: 'An error occurred while updating the role',
            error: ERR.message
        });
    }
}

// DEFINITION TO THE disableRole CONTROLLER TO DISABLE ROLE BY ID
export async function disableRole(req: Request, res: Response): Promise<Response> {
    try {
        // IDENTIFY THE ROLE ID TO DISABLE
        const { ID } = req.params;
        console.log(ID);

        // CONNECTION TO DATABASE
        const CONNECTION = await connect();

        // DISABLE THE ROLE
        const QUERY = `
            UPDATE tbl_role
            SET state = 0
            WHERE id = ?;
        `;
        await CONNECTION.query(QUERY, [ID]);

        // RESPONSE OF THE FUNCTION
        return res.status(200).json({
            message: "Role disable successfully"
        });
    } catch (error) {
        // HANDLE THE ERROR
        const ERR = error as Error;
        return res.status(500).json({
            message: 'An error occurred while disabling the role',
            error: ERR.message
        });
    }
}

// DEFINITION TO THE enableRole CONTROLLER TO ENABLE ROLE BY ID
export async function enableRole(req: Request, res: Response): Promise<Response> {
    try {
        // IDENTIFY THE ROLE ID TO ENABLE
        const { ID } = req.params;

        // CONNECTION TO DATABASE
        const CONNECTION = await connect();

        // ENABLE THE ROLE
        const QUERY = `
            UPDATE tbl_role
            SET state = 1
            WHERE id = ?;
        `;
        await CONNECTION.query(QUERY, [ID]);

        // RESPONSE OF THE FUNCTION
        return res.status(200).json({
            message: "Role enable successfully"
        });
    } catch (error) {
        // HANDLE THE ERROR
        const ERR = error as Error;
        return res.status(500).json({
            message: 'An error occurred while enabling the role',
            error: ERR.message
        });
    }
}