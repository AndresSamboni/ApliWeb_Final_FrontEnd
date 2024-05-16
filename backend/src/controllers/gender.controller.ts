// IMPORT REQUEST AND RESPONSE MODULES
import { Request, Response } from "express";

// IMPORT THE CONNECTION WITH THE DATABASE
import { connect } from "../connection/dbConnection";

// IMPORT THE GENDER INTERFACE
import { Gender } from './../interfaces/gender.interface';

// DEFINITION OF THE getGenders CONTROLLER TO OBTAIN THE LIST OF GENDERS
export async function getGenders(req: Request, res: Response): Promise<Response> {
    try {
        // CONNECTION TO THE DATABASE
        const CONNECTION = await connect();
    
        // GET ALL THE GENDERS
        const QUERY = `
            SELECT *
            FROM tbl_gender
            WHERE state = 1;

        `;
        const [RESULT] = await CONNECTION.query(QUERY);
    
        // RESPONSE OF THE FUNCTION
        return res.status(200).json(RESULT);
    } catch (error) {
        // HANDLE THE ERROR
        const ERR = error as Error;
        return res.status(500).json({
            message: 'An error occurred while getting the gender',
            error: ERR.message
        });
    }
}

// DEFINITION OF THE setGender CONTROLLER TO CREATE A NEW GENDER
export async function setGender(req: Request, res: Response): Promise<Response> {
    try {
        // IDENTIFY THE DATA TO CREATE A NEW GENDER
        const NEW_GENDER: Gender = req.body;

        // CONNECTION TO THE DATABASE
        const CONNECTION = await connect();

        // CHECK IF GENDER ALREADY EXISTS
        const CHECK_QUERY = `
            SELECT *
            FROM tbl_gender
            WHERE name = ?;
        `;
        const [RESULT] = await CONNECTION.query(CHECK_QUERY, NEW_GENDER.name);
        const EXISTING_GENDER: Array<Gender> = RESULT as Array<Gender>;
        if (EXISTING_GENDER.length > 0 && EXISTING_GENDER[0].state) {
            return res.status(200).json({
                message: "Gender already exists and it is active"
            });
        } else if (EXISTING_GENDER.length > 0 && !EXISTING_GENDER[0].state) {
            return res.status(200).json({
                message: "Gender already exists and it is inactive",
                id_gender: EXISTING_GENDER[0].id
            });
        }

        // CREATION THE NEW GENDER
        const QUERY = `
            INSERT INTO tbl_gender SET ?;
        `;
        await CONNECTION.query(QUERY, [NEW_GENDER]);

        //RESPONSE OF THE FUNCTION
        return res.status(200).json({
            message: 'Gender created successfully'
        });
    } catch (error) {
        // HANDLE THE ERROR
        const ERR = error as Error;
        return res.status(500).json({
            message: 'An error occurred while getting the gender',
            error: ERR.message
        });
    }
}

// DEFINITION TO THE getGender CONTROLLER TO OBTAIN A GENDER BY ID
export async function getGender(req: Request, res: Response): Promise<Response> {
    try {
        // IDENTIFY THE GENDER ID
        const { ID } = req.params;

        // CONNECTION TO THE DATABASE
        const CONNECTION = await connect();

        // GET GENDER BY ID
        const QUERY = `
            SELECT *
            FROM tbl_gender
            WHERE id = ?;
        `;
        const [RESULT] = await CONNECTION.query(QUERY, [ID]);

        // RESPONSE OF THE FUNCTION
        return res.status(200).json(RESULT);
    } catch (error) {
        // HANDLE THE ERROR
        const ERR = error as Error;
        return res.status(500).json({
            message: 'An error occurred while getting the gender',
            error: ERR.message
        });
    }
}

// DEFINITION OF THE updateGender CONTROLLER TO UPDATE A ROLE BY ID
export async function updateGender(req: Request, res: Response) {
    try {
        // IDENTIFY THE DATA TO UPDATE A ROLE BY ID
        const { ID } = req.params;
        const UPDATE_GENDER: Gender = req.body;
        
        // CONNECTION TO THE DATABASE
        const CONNECTION = await connect();
    
        // UPDATE GENDER
        const QUERY = `
            UPDATE tbl_gender
            SET ?
            WHERE id = ?;
        `;
        await CONNECTION.query(QUERY, [UPDATE_GENDER, ID]);
    
        //RESPONSE OF THE FUNCTION
        return res.status(200).json({
            message: 'Gender updated successfully'
        });
    } catch (error) {
        // HANDLE THE ERROR
        const ERR = error as Error;
        return res.status(500).json({
            message: 'An error occurred while updating the gender',
            error: ERR.message
        });
    }
}

// DEFINITION TO THE disableGender CONTROLLER TO DISABLE GENDER BY ID
export async function disableGender(req: Request, res: Response):Promise<Response> {
    try {
        // IDENTIFY THE GENDER ID
        const { ID } = req.params;

        // CONNECTION TO DATABASE
        const CONNECTION = await connect();

        // DISABLE THE GENDER
        const QUERY = `
            UPDATE tbl_gender
            SET state = 0
            WHERE id = ?;
        `;
        await CONNECTION.query(QUERY, [ID]);

        //RESPONSE OF THE FUNCTION
        return res.status(200).json({
            message: "Gender disable successfully"
        });
    } catch (error) {
        // HANDLE THE ERROR
        const ERR = error as Error;
        return res.status(500).json({
            message: 'An error occurred while disabling the gender',
            error: ERR.message
        });
    }
}

// DEFINITION TO THE enableGender CONTROLLER TO ENABLE GENDER BY ID
export async function enableGender(req: Request, res: Response):Promise<Response> {
    try {
        // IDENTIFY THE GENDER ID
        const { ID } = req.params;

        // CONNECTION TO DATABASE
        const CONNECTION = await connect();

        // ENABLE THE GENDER
        const QUERY = `
            UPDATE tbl_gender
            SET state = 1
            WHERE id = ?;
        `;
        await CONNECTION.query(QUERY, [ID]);

        //RESPONSE OF THE FUNCTION
        return res.status(200).json({
            message: "Gender disable successfully"
        });
    } catch (error) {
        // HANDLE THE ERROR
        const ERR = error as Error;
        return res.status(500).json({
            message: 'An error occurred while enabling the gender',
            error: ERR.message
        });
    }
}