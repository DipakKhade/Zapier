import type { NextFunction, Request, Response } from "express";

export const authMiddleware = async (req:Request, res:Response, next:NextFunction) =>{

    req.userId = 'asd123'
    next();
} 