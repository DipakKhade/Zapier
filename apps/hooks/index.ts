import express from "express";
import { prisma } from "db/client";
import { HOOKS_PORT } from "config/config"
import { randomUUIDv7 } from "bun";

const app = express();
const PORT = process.env.HOOKS_PORT || HOOKS_PORT

app.post('/hooks/getTestHook/:userId', async(req,res)=>{
    const userId = req.params.userId;
    const current_hook_test_id = randomUUIDv7();
   try{
        const hook_tes = await prisma.hookTest.create({
            data:{
                uuid:current_hook_test_id,
                userId
            }
        })
   } catch(error){
       throw error
   }

    res.json({
        message:"zap triggers successfully",
        hook_test_id: current_hook_test_id
    })
    return;
})

app.post('/hooks/catch/test/:userId/:hookUuid', async(req, res)=> {
    const userId = req.params.userId;
    const hookId = req.params.hookUuid;
    const metadata = req.body
    try{
        const hook_test = await prisma.hookTest.update({
            where:{
                userId,
                uuid:hookId
            },
            data: {
                metadata
            }
        })

        res.json({
            message:"zap triggers successfully",
            hook_test_id: hook_test.id
        })
        return;
    }catch (error){
        throw error
    }
})

app.get('/hooks/getMetadata/:hookTestId', async (req, res)=>{
    try{
        const hook_test = await prisma.hookTest.findFirst({
            where:{
                id:req.params.hookTestId
            },
            select:{
                metadata:true
            }
        })

        res.json({
            message:"",
            metadata:hook_test.metadata
        })
        return;
    }catch (error){
        throw error
    }
})


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


app.listen(PORT, ()=>console.log(`hook server is listining on port ${PORT}`))