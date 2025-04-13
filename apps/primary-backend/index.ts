
import { PRIMARY_BACKEND_PORT } from "config/config";
import express from "express"
import userRouter from "./Routes/user";
import zapRouter from "./Routes/zap";

const PORT = process.env.PRIMARY_BACKEND_PORT || PRIMARY_BACKEND_PORT

const app = express();

app.use('/api/v1/user', userRouter)

app.use('/api/v1/zap',zapRouter)


app.listen(PORT , ()=>console.log(`primary backend is listeing on PORT ${PORT}`))