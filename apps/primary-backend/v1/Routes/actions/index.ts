

import { prisma } from "db/client";
import { Router } from "express";
import { authMiddleware } from "../../../Middlewares/auth";

const actionRouter = Router();

actionRouter.get('/available_actions',authMiddleware, async(req, res)=> {
    try{    
        const available_actions = await prisma.availableAction.findMany({});
        res.json({
            success:true,
            available_actions
        })
        return;
    }catch(err){
        throw(err)
    }
})

export default actionRouter;