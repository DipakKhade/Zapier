
import { prisma } from "db/client";
import { Router } from "express";

const triggerRouter = Router();

triggerRouter.get('/available_triggers', async(req, res)=> {
    try{    
        const available_triggers = await prisma.availableTrigger.findMany({});
        res.json({
            success:true,
            available_triggers
        })
    }catch(err){
        throw(err)
    }
})

export default triggerRouter;