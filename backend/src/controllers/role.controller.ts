// IMPORT REQUEST AND RESPONSE MODULES
import { Request, Response } from "express";

// IMPORT THE CONNECTION WITH THE DATABASE
import { connect } from "../connection/dbConnection";

// DEFINITION OF THE USER CONTROLLER TO OBTAINT THE LIST OF USERS
export async function getRoles(req: Request, res: Response): Promise<Response> {
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
}