import { Router } from "express";
import { prisma } from "db/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SEC } from "config/config";
import { authMiddleware } from "../../Middlewares/auth";
import { signInSchema, signUpSchema } from "common-types";

const userRouter = Router();
const SALT = 10;

userRouter.post('/signin', async(req,res)=>{
    try{
        const { payload } = req.body;
        const parsedPaylaod = signInSchema.safeParse(payload);
        if(parsedPaylaod.error){
            res.status(411).json({
                message:parsedPaylaod.error.message
            })
            return;
        }
        
        const { username, email, password } = parsedPaylaod.data
        //TODO: send user email to verify
        const hashed_password = await bcrypt.hash(password, SALT)
        const new_user = await prisma.user.create({
            data:{
                name:username,
                email,
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
        console.log(req.body)
        const { payload } = req.body;
        const parsedPaylaod = signUpSchema.safeParse(payload);
    
        if(parsedPaylaod.error){
            res.status(411).json({
                message:parsedPaylaod.error.message
            })
            return;
        }
    
        const user = await prisma.user.findFirst({
            where:{
                email:parsedPaylaod.data.email
            }
        })
    
        if(!user){
            res.status(404).json({
                message:"no user found with username " + parsedPaylaod.data.username  
            })
            return;
        }
    
        const is_password_valid = await bcrypt.compare(parsedPaylaod.data.password, user.password);

        if(!is_password_valid){
            res.status(200).json({
                message:"wrong password"
            })
            return;
        }

        const token = jwt.sign({
            userId:user.id,
            username:user.name,
            email:user.email
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

userRouter.get('/getUserDetails', authMiddleware, async(req, res)=>{
    try{    
        const user = await prisma.user.findFirst({
            where:{
                id:req.userId
            },
            select:{
                email:true,
                name:true,
                id:true
            }
        })

        res.json({
            message:"user details retrived",
            data:user
        })
        return;
    }catch(error){
        throw error
    }

})

userRouter.get('/isValidEmail',async (req,res)=>{
    const { email } = req.query;
    try{
        const user = await prisma.user.findFirst({
            where:{
                email: email as string
            }
        })

        if(user){
            res.json({
                message:"email is valid",
                success:true
            })

            return;
        }

        res.json({
             message:"email is not valid",
            success:false
         })

        return;
    }catch(error){
        throw error
    }
})

export default userRouter;
