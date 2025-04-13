import { Router } from "express";
import { signInSchema } from "../../zodSchema/zod";
import { prisma } from "db/client";

const userRouter = Router();

userRouter.post('/signin', async(req,res)=>{
    try{
        const { paylaod } = req.body;
        const parsedPaylaod = signInSchema.safeParse(paylaod);
        
        if(parsedPaylaod.error){
            res.status(411).json({
                message:parsedPaylaod.error.message
            })
            return;
        }
        
        const { username, password } = parsedPaylaod.data
        const new_user = await prisma.user.create({
            data:{
                name:username,
                password
            }
        })

        res.status(200).json({
            message:"user created successfully",
            userId: new_user.id
        })
        
    }catch(error){
        throw error
    }
})

userRouter.post('/signup', async(req, res)=>{
    

})

userRouter.get('/getUsers', async(req, res)=>{

})

export default userRouter;
