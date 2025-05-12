import express from "express";
import { prisma } from "db/client";
import { HOOKS_PORT } from "config/config"
import { authMiddleware } from "./auth.middleware";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.HOOKS_PORT || HOOKS_PORT

app.post('/hooks/catch/:userId/:zapId', async(req,res)=>{
    const userId = req.params.userId;
    const zapId = req.params.zapId;
     const tx_id = await prisma.$transaction(async tx=>{
        const zap_run = await tx.zapRun.create({
            data:{
                zapId,
                metadata:{metadata:{commitId:123,commitMessage:"code init"}}
            }
        })

        await tx.zapRunOutBox.create({
            data:{
                zapRunId:zap_run.id
            }
        })

    })

    // push zap run trigger to queue

    res.json({
        message:"zap triggers successfully",
    })
    return;
})

app.get('/hooks/hookid',authMiddleware, async(req, res)=> {
    try{
        const test_hook = await prisma.hookTest.create(({
            data:{
                userId:req.userId!
            }
        }))
        res.json({
            hookId: test_hook.id,
            userId: req.userId
        })
        return;
    }catch (error){
        throw error
    }
})

app.post('/hooks/catch/test/:userId/:hookId', async(req, res)=>{
    try{
        const metadata = req.body
        const hook = await prisma.hookTest.update({
            where:{
                id:req.params.hookId
            },
            data:{
                metadata
            }
        })
        res.json({
            message:"hook triggred successfully",
            hookId: hook.id
        })
        return;
    }catch (error){
        throw error
    }
})

app.get('/hooks/test/metadata/:hookId',authMiddleware, async(req, res)=>{
    try{
        const hook = await prisma.hookTest.findFirst({
            where:{
                id:req.params.hookId
            },
            select:{
                metadata: true
            }
        })
        res.json({
            metadata: hook?.metadata
        })
        return;
    }catch(error) {
        throw error
    }
})

app.listen(PORT, ()=>console.log(`hook server is listining on port ${PORT}`))