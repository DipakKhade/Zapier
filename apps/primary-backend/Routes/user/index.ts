import { Router } from "express";
import { signInSchema, signUpSchema } from "../../zodSchema/zod";
import { prisma } from "db/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userRouter = Router();
const SALT = 10;
const JWT_SEC = process.env.JWT_SEC || "asd123"

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
        const hashed_password = await bcrypt.hash(password, SALT)
        const new_user = await prisma.user.create({
            data:{
                name:username,
                password:hashed_password
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
    try{
        const { paylaod } = req.body;
        const parsedPaylaod = signUpSchema.safeParse(paylaod);
    
        if(parsedPaylaod.error){
            res.status(411).json({
                message:parsedPaylaod.error.message
            })
            return;
        }
    
        const user = await prisma.user.findFirst({
            where:{
                name:parsedPaylaod.data.username
            }
        })
    
        if(!user){
            res.status(404).json({
                message:"no user found with username " + parsedPaylaod.data.username  
            })
            return;
        }
    
        const is_password_valid = bcrypt.compare(parsedPaylaod.data.password, user.password);
    
        if(!is_password_valid){
            res.status(200).json({
                message:"wrong password"
            })
            return;
        }

        const token = jwt.sign({
            userId:user.id,
            username:user.name,
        }, JWT_SEC)
    
        res.json({
            message:"user signup successfully",
            success:true,
            token
        })
    }catch(error){
        throw error
    }

})

userRouter.get('/getUsers', async(req, res)=>{

})

export default userRouter;
