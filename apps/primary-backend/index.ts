import { PRIMARY_BACKEND_PORT } from "config/config";
import express from "express";
import cors from "cors";
import userRouter from "./v1/Routes/user";
import zapRouter from "./v1/Routes/zap";

const PORT = process.env.PRIMARY_BACKEND_PORT || PRIMARY_BACKEND_PORT

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1/user', userRouter)

app.use('/api/v1/zap',zapRouter)


app.listen(PORT , ()=>console.log(`primary backend is listeing on PORT ${PORT}`))