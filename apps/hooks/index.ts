import express from "express";
import { prisma } from "db/client";

const app = express();
const PORT = process.env.HOOKS_PORT || 3000

app.post('/hooks/catch/:userId/:zapId', async(req,res)=>{
    const userId = req.params.userId;
    const zapId = req.params.zapId;
    console.log(userId, zapId)
     const tx_id = prisma.$transaction(async tx=>{
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
})


app.listen(PORT, ()=>console.log(`hook server is listining on port ${PORT}`))