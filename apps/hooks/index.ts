import express from "express";
import { prisma } from "db/client";

const app = express();
const PORT = process.env.HOOKS_PORT || 3000

app.post('/hooks/catch/:userId/:zapId', async(req,res)=>{
    const userId = req.params.userId;
    const zapId = req.params.zapId;
    await prisma.$transaction(async tx=>{
        const zap_run = await tx.zapRun.create({
            data:{
                zapId
            }
        })
    })

    // push zap run trigger to queue
})


app.listen(PORT, ()=>console.log(`hook server is listining on port ${PORT}`))