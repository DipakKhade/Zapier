import { Router } from "express";
import { authMiddleware } from "../../../Middlewares/auth";
import { prisma } from "db/client";
import { zapSchema } from "common-types";

const zapRouter = Router();

zapRouter.get('/zapRuns', authMiddleware, async(req,res)=>{
    try{
        const zaps = await prisma.zap.findMany({
            where: {
                userId:req.userId,
            },
            select: {
                id:true,
                createdAt:true,
                trigger:{
                    select: {
                        type:{
                            select: {
                                name:true,
                                image:true
                            }
                        }
                    }
                },
                action:{
                    select: {
                        type: {
                            select: {
                                image:true,
                                name:true
                            }
                        },
                        sortingOrder:true
                    }
                }
            }
        })
        res.json({
            data:zaps
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
                userId:req.userId!,
                zapRun: {
                    create: {
                        metadata:parsedPaylaod.data.metadata,
                    }
                }
            }
        })

        res.json({
            success:true,
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


