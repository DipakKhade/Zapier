import z from "zod";

const signInSchema = z.object({
    username:z.string().min(5),
    email:z.string().email(),
    password:z.string().min(5)
})

const signUpSchema = z.object({
    username:z.string().min(5),
    email:z.string().email(),
    password:z.string().min(5)
})

const zapSchema = z.object({
    availableTriggerId:z.string(),
    actions:z.array(z.object({
        availableActionId: z.string(),
        metadata: z.any().optional()
    }))
})

export {
    signInSchema,
    signUpSchema,
    zapSchema
}