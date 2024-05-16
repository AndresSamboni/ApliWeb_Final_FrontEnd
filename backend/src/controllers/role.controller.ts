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
    
        //CREATION THE QUERY
        const QUERY = `
            SELECT *
            FROM tbl_role;
        `;
    
        // EXECUTE THE QUERY
        const [result] = await CONNECTION.query(QUERY);
    
        // RESPONSE OF THE FUNCTION
        return res.json(result);
    } catch (error) {
        // HANDLE THE ERROR
        const err = error as Error;
        return res.status(500).json({ message: 'An error occurred while getting the role', error: err.message });
    }
}

// DEFINITION OF THE setRole CONTROLLER TO CREATE A NEW ROLE
export async function setRole(req: Request, res: Response): Promise<Response> {
    try {
        // IDENTIFY THE DATA TO CREATE A NEW ROLE
        const newRole: Role = req.body;
        
        // CONNECTION TO THE DATABASE
        const CONNECTION = await connect();
    
        // CREATION THE QUERY
        const QUERY = `
            INSERT INTO tbl_role SET ?;
        `;
    
        // EXECUTE THE QUERY
        await CONNECTION.query(QUERY, [newRole]);
    
        //RESPONSE OF THE FUNCTION
        return res.json({
            message: 'Role created successfully'
        });
    } catch (error) {
        // HANDLE THE ERROR
        const err = error as Error;
        return res.status(500).json({ message: 'An error occurred while creating the role', error: err.message });
    }
}

// DEFINITION OF THE getRole CONTROLLER TO GET A ROLE BY ID
export async function getRole(req: Request, res: Response): Promise<Response> {
    try {
        // IDENTIFY THE DATA TO GET A ROLE BY ID
        const { id } = req.params;
        
        // CONNECTION TO THE DATABASE
        const CONNECTION = await connect();
    
        // CREATION THE QUERY
        const QUERY = `
            SELECT *
            FROM tbl_role
            WHERE id = ?;
        `;
    
        // EXECUTE THE QUERY
        const [result] = await CONNECTION.query(QUERY, [id]);
    
        // RESPONSE OF THE FUNCTION
        return res.json(result);
    } catch (error) {
        // HANDLE THE ERROR
        const err = error as Error;
        return res.status(500).json({ message: 'An error occurred while getting the role', error: err.message });
    }
}