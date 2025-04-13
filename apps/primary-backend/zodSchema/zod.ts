import zod from "zod";

const signInSchema = zod.object({
    username:zod.string().min(5),
    password:zod.string().min(5)
})

const signUpSchema = zod.object({
    username:zod.string().min(5),
    password:zod.string().min(5)
})


export {
    signInSchema,
    signUpSchema
}