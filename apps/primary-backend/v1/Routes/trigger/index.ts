
import { prisma } from "db/client";
import { Router } from "express";
import { authMiddleware } from "../../../Middlewares/auth";

const triggerRouter = Router();

triggerRouter.get('/available_triggers',authMiddleware, async(req, res)=> {
    try{    
        const available_triggers = await prisma.availableTrigger.findMany({});
        res.json({
            success:true,
            available_triggers
        })
        return;
    }catch(err){
        throw(err)
    }
})

export default triggerRouter;