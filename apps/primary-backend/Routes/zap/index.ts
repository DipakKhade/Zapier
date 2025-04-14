import { Router } from "express";
import { authMiddleware } from "../../Middlewares/auth";
import { prisma } from "db/client";
import { zapSchema } from "../../zodSchema/zod";

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
        return;

    }catch(error){
        throw error
    }
})

zapRouter.post('/create', authMiddleware, async(req,res)=>{
    try{
        const { payload } = req.body;
        const parsedPaylaod = zapSchema.safeParse(payload);

        if(!parsedPaylaod.success){
            res.json({
                message:parsedPaylaod.error
            })
            return;
        }

        const zap = await prisma.zap.create({
            data:{
                trigger:{
                    create:{
                        availableTriggerId:parsedPaylaod.data.availableTriggerId,
                    }
                },
                action:{
                    create:parsedPaylaod.data.actions.map((a,index)=>{
                        return{
                            actionId:a.availableActionId,
                            sortingOrder:index
                        }
                    })
                },
                userId:req.userId!
            }
        })

        res.json({
            message:"zap created",
            zapId:zap.id
        })

        return;
    }catch(error){
        throw error
    }
})

zapRouter.get('/:zapId', authMiddleware, async(req, res)=>{
    try{
        const zapId = req.params.zapId;
        const zap = await prisma.zap.findFirst({
            where:{
                id:zapId,
                userId:req.userId
            },
            include:{
                trigger:true,
                action:true
            }
        })
        res.json({
            message:"zap retrived successfully",
            data:zap
        })
        return;

    }catch(error){
        throw error
    }
})

export default zapRouter;


