

import { prisma } from "db/client";
import { Router } from "express";

const actionRouter = Router();

actionRouter.get('/available_actions', async(req, res)=> {
    try{    
        const available_actions = await prisma.availableAction.findMany({});
        res.json({
            success:true,
            available_actions
        })
    }catch(err){
        throw(err)
    }
})

export default actionRouter;