import express from "express";
import { prisma } from "db/client";
import { HOOKS_PORT } from "config/config"
const app = express();
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


app.listen(PORT, ()=>console.log(`hook server is listining on port ${PORT}`))