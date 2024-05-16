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
    
        //CREATION THE QUERY
        const QUERY = `
            SELECT *
            FROM tbl_gender;
        `;
    
        // EXECUTE THE QUERY
        const [result] = await CONNECTION.query(QUERY);
    
        // RESPONSE OF THE FUNCTION
        return res.json(result);
    } catch (error) {
        // HANDLE THE ERROR
        const err = error as Error;
        return res.status(500).json({ message: 'An error occurred while getting the gender', error: err.message });
    }
}

// DEFINITION OF THE setGender CONTROLLER TO CREATE A NEW GENDER
export async function setGender(req: Request, res: Response): Promise<Response> {
    try {
        // IDENTIFY THE DATA TO CREATE A NEW GENDER
        const newGender: Gender = req.body;

        // CONNECTION TO THE DATABASE
        const CONNECTION = await connect();

        // CREATION THE QUERY
        const QUERY = `
            INSERT INTO tbl_gender SET ?;
        `;

        // EXECUTE THE QUERY
        await CONNECTION.query(QUERY, [newGender]);

        //RESPONSE OF THE FUNCTION
        return res.json({
            message: 'Gender created successfully'
        });
    } catch (error) {
        // HANDLE THE ERROR
        const err = error as Error;
        return res.status(500).json({ message: 'An error occurred while getting the gender', error: err.message });
    }
}

// DEFINITION TO THE getGender CONTROLLER TO OBTAIN A GENDER BY ID
export async function getGender(req: Request, res: Response): Promise<Response> {
    try {
        // IDENTIFY THE GENDER ID
        const { id } = req.params;

        // CONNECTION TO THE DATABASE
        const CONNECTION = await connect();

        // CREATION THE QUERY
        const QUERY = `
            SELECT *
            FROM tbl_gender
            WHERE id = ?;
        `;

        // EXECUTE THE QUERY
        const [result] = await CONNECTION.query(QUERY, [id]);

        // RESPONSE OF THE FUNCTION
        return res.json(result);
    } catch (error) {
        // HANDLE THE ERROR
        const err = error as Error;
        return res.status(500).json({ message: 'An error occurred while getting the gender', error: err.message });
    }
}