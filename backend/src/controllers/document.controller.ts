// IMPORT REQUEST AND RESPONSE MODULES
import { Request, Response } from "express";

// IMPORT THE CONNECTION WITH THE DATABASE
import { connect } from "../connection/dbConnection";

// IMPORT THE DOCUMENT INTERFACCE
import { Document } from './../interfaces/document.interface';

// DEFINITION OF THE getDocuments CONTROLLER TO OBTAIN THE LIST OF DOCUMENTS
export async function getDocuments(req: Request, res: Response): Promise<Response> {
    try {
        // CONNECTION TO THE DATABASE
        const CONNECTION = await connect();
    
        //CREATION THE QUERY
        const QUERY = `
            SELECT *
            FROM tbl_document;
        `;
    
        // EXECUTE THE QUERY
        const [result] = await CONNECTION.query(QUERY);
    
        // RESPONSE OF THE FUNCTION
        return res.json(result);
    } catch (error) {
        // HANDLE THE ERROR
        const err = error as Error;
        return res.status(500).json({ message: 'An error occurred while getting the document', error: err.message });
    }
}

// DEFINITION OF THE setDocument CONTROLLER TO CREATE A NEW DOCUMENT
export async function setDocument(req: Request, res: Response): Promise<Response> {
    try {
        // IDENTIFY THE DATA TO CREATE A NEW DOCUMENT
        const newDocument: Document = req.body;

        // CONNECTION TO THE DATABASE
        const CONNECTION = await connect();

        // CREATION THE QUERY
        const QUERY = `
            INSERT INTO tbl_document SET ?;
        `;

        // EXECUTE THE QUERY
        await CONNECTION.query(QUERY, [newDocument]);

        //RESPONSE OF THE FUNCTION
        return res.json({
            message: 'Document created successfully'
        });
    } catch (error) {
        // HANDLE THE ERROR
        const err = error as Error;
        return res.status(500).json({ message: 'An error occurred while getting the document', error: err.message });
    }
}

// DEFINITION OF THE getDocument CONTROLLER TO OBTAIN A DOCUMENT BY ID
export async function getDocument(req: Request, res: Response): Promise<Response> {
    try {
        // IDENTIFY THE ID OF THE DOCUMENT
        const { id } = req.params;

        // CONNECTION TO THE DATABASE
        const CONNECTION = await connect();

        // CREATION THE QUERY
        const QUERY = `
            SELECT *
            FROM tbl_document
            WHERE id = ?;
        `;

        // EXECUTE THE QUERY
        const [result] = await CONNECTION.query(QUERY, [id]);

        // RESPONSE OF THE FUNCTION
        return res.json(result);
    } catch (error) {
        // HANDLE THE ERROR
        const err = error as Error;
        return res.status(500).json({ message: 'An error occurred while getting the document', error: err.message });
    }
}