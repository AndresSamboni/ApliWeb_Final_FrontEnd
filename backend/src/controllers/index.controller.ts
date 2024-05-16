// IMPORT REQUEST AND RESPONSE MODULES
import { Request, Response } from "express";

// DEFINITION OF THE INDEX CONTROLLER
export function indexWelcome(req: Request, res: Response): Response {
    // RESPONSE OF THE FUNCTION
    return res.json({
        message: 'Welcome to the API'
    });
}