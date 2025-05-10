import { JWT_SEC } from "config/config";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req:Request, res:Response, next:NextFunction) =>{
    const authorization = req.headers.authorization;
    const token = authorization?.split(' ')[1];
    if(!token){
        res.status(404).json({
            message:"invalid auth headers"
        })
    }
    const verify_token = jwt.verify(token!,JWT_SEC) as unknown as {
        userId:string,
        email:string,
        username:string
    }
    if(verify_token){
        req.userId = verify_token.userId;
        next();
        return;
    }

    res.json({
        message:"auth failed"
    })
    return;
} 