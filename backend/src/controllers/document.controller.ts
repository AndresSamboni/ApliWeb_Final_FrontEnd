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
    
        // GET ALL THE DOCUMENTS
        const QUERY = `
            SELECT
                d.id,
                d.name,
                r.start_date,
                r.modify_date,
                r.delete_date,
                CONCAT(u.name, ' ', COALESCE(u.last_name, '')) as user
            FROM tbl_document d
            JOIN tbl_register r ON r.document_id_fk = d.id
            JOIN tbl_user u ON u.id = r.user_id_fk
            WHERE d.state = 1
            ORDER BY d.id;
        `;
        const [RESULT] = await CONNECTION.query(QUERY);
    
        // RESPONSE OF THE FUNCTION
        return res.status(200).json(RESULT);
    } catch (error) {
        // HANDLE THE ERROR
        const ERR = error as Error;
        return res.status(500).json({
            message: 'An error occurred while getting the documents',
            error: ERR.message
        });
    }
}

// DEFINITION OF THE setDocument CONTROLLER TO CREATE A NEW DOCUMENT
export async function setDocument(req: Request, res: Response): Promise<Response> {
    try {
        // IDENTIFY THE DATA TO CREATE A NEW DOCUMENT
        const NEW_DOCUMENT: Document = req.body;

        // CONNECTION TO THE DATABASE
        const CONNECTION = await connect();

        // CHECK IF DOCUMENT ALREADY EXISTS
        const CHECK_QUERY = `
            SELECT *
            FROM tbl_document
            WHERE name = ?
        `;
        const [RESULT] = await CONNECTION.query(CHECK_QUERY, NEW_DOCUMENT.name);
        const EXISTING_DOCUMENT: Array<Document> = RESULT as Array<Document>;
        if (EXISTING_DOCUMENT.length > 0 && EXISTING_DOCUMENT[0].state) {
            return res.status(200).json({
                message: "Document already exists and it is active"
            });
        } else if (EXISTING_DOCUMENT.length > 0 && !EXISTING_DOCUMENT[0].state) {
            return res.status(200).json({
                message: "Document already exists and it is inactive",
                id_document: EXISTING_DOCUMENT[0].id
            });
        }

        // CREATE NEW DOCUMENT
        const QUERY = `
            INSERT INTO tbl_document SET ?;
        `;
        await CONNECTION.query(QUERY, [NEW_DOCUMENT]);

        //RESPONSE OF THE FUNCTION
        return res.status(200).json({
            message: 'Document created successfully'
        });
    } catch (error) {
        // HANDLE THE ERROR
        const ERR = error as Error;
        return res.status(500).json({
            message: 'An error occurred while getting the document',
            error: ERR.message
        });
    }
}

// DEFINITION OF THE getDocument CONTROLLER TO OBTAIN A DOCUMENT BY ID
export async function getDocument(req: Request, res: Response): Promise<Response> {
    try {
        // IDENTIFY THE ID OF THE DOCUMENT
        const { ID } = req.params;

        // CONNECTION TO THE DATABASE
        const CONNECTION = await connect();

        // CREATION THE QUERY
        const QUERY = `
            SELECT
                d.id,
                d.name,
                d.state,
                r.start_date,
                r.modify_date,
                r.delete_date,
                CONCAT(u.name, ' ', COALESCE(u.last_name, '')) as user
            FROM tbl_document d
            JOIN tbl_register r ON r.document_id_fk = d.id
            JOIN tbl_user u ON u.id = d.id
            WHERE d.state = 1 AND d.id = ?;
        `;

        // EXECUTE THE QUERY
        const [RESULT] = await CONNECTION.query(QUERY, [ID]);

        // RESPONSE OF THE FUNCTION
        return res.status(200).json(RESULT);
    } catch (error) {
        // HANDLE THE ERROR
        const ERR = error as Error;
        return res.status(500).json({
            message: 'An error occurred while getting the document',
            error: ERR.message
        });
    }
}
// DEFINITION OF THE updateDocument CONTROLLER TO UPDATE A DOCUMENT BY ID
export async function updateDocument(req: Request, res: Response):Promise<Response> {
    try {
        // IDENTIFY THE DATA TO UPDATE A DOCUMENT BY ID
        const { ID } = req.params;
        const UPDATE_DOCUMENT = req.body;

        // CONNECTION TO THE DATABASE
        const CONNECTION = await connect();

        // UPDATE DOCUMENT
        const QUERY = `
            UPDATE tbl_document
            SET ?
            WHERE id = ?;
        `;
        await CONNECTION.query(QUERY, [UPDATE_DOCUMENT, ID]);

        //RESPONSE OF THE FUNCTION
        return res.status(200).json({
            message: "Document updated successfully"
        });
    } catch (error) {
        // HANDLE THE ERROR
        const ERR = error as Error;
        return res.status(500).json({
            message: 'An error occurred while updating the document',
            error: ERR.message
        });
    }
}

// DEFINITION TO THE disableDocument CONTROLLER TO DISABLE DOCUMENT BY ID
export async function disableDocument(req: Request, res: Response):Promise<Response> {
    try {
        // IDENTIFY THE DOCUMENT ID TO DISABLE
        const { ID } = req.params;

        // CONNECTION TO THE DATABASE
        const CONNECTION = await connect();

        // DISABLE DOCUMENT
        const QUERY = `
            UPDATE tbl_document
            SET state = 0
            WHERE id = ?;
        `;
        await CONNECTION.query(QUERY, [ID]);

        //RESPONSE OF THE FUNCTION
        return res.status(200).json({
            message: "Document disable successfully"
        });
    } catch (error) {
        // HANDLE THE ERROR
        const ERR = error as Error;
        return res.status(500).json({
            message: 'An error occurred while disabling the document',
            error: ERR.message
        });
    }
}

// DEFINITION TO THE enableDocument CONTROLLER TO ENABLE DOCUMENT BY ID
export async function enableDocument(req: Request, res: Response):Promise<Response> {
    try {
        // IDENTIFY THE DOCUMENT ID TO ENABLE
        const { ID } = req.params;

        // CONNECTION TO THE DATABASE
        const CONNECTION = await connect();

        // ENABLE DOCUMENT
        const QUERY = `
            UPDATE tbl_document
            SET state = 1
            WHERE id = ?;
        `;
        await CONNECTION.query(QUERY, [ID]);

        //RESPONSE OF THE FUNCTION
        return res.status(200).json({
            message: "Document enable successfully"
        });
    } catch (error) {
        // HANDLE THE ERROR
        const ERR = error as Error;
        return res.status(500).json({
            message: 'An error occurred while enabling the document',
            error: ERR.message
        });
    }
}