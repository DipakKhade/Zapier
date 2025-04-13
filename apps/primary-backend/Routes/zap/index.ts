import { Router } from "express";
import { authMiddleware } from "../../Middlewares/auth";
import { prisma } from "db/client";

const zapRouter = Router();

zapRouter.get('/zapRuns', authMiddleware, async(req,res)=>{
    try{
        const zap_runs = await prisma.zap.findMany({
            where:{
                userId:req.userId
            },
            include:{
                trigger:true,
                action:true
            }
        })

        res.json({
            data:zap_runs
        })
        
    }catch(error){
        throw error
    }
})

export default zapRouter;


