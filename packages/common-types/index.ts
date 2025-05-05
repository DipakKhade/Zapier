import z from "zod";

const signInSchema = z.object({
    username:z.string().min(5),
    email:z.string().email(),
    password:z.string().min(5)
})

const signUpSchema = z.object({
    email:z.string().email(),
    password:z.string().min(5)
})

const zapSchema = z.object({
    availableTriggerId:z.string(),
    actions:z.array(z.object({
        availableActionId: z.string(),
        metadata: z.any().optional()
    })),
    metadata:z.any().optional()
})

type signUpType = z.infer<typeof signUpSchema>
type signInType = z.infer<typeof signInSchema>
type zapType = z.infer<typeof zapSchema>

export {
    signInSchema,
    signUpSchema,
    zapSchema,
    type signUpType,
    type signInType, 
    type zapType
}