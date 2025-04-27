import { PRIMARY_BACKEND_PORT } from "config/config";
import express from "express";
import cors from "cors";
import userRouter from "./v1/Routes/user";
import zapRouter from "./v1/Routes/zap";
import triggerRouter from "./v1/Routes/trigger";
import actionRouter from "./v1/Routes/actions";

const PORT = process.env.PRIMARY_BACKEND_PORT || PRIMARY_BACKEND_PORT

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1/user', userRouter);

app.use('/api/v1/zap',zapRouter);

app.use('/api/v1/trigger', triggerRouter);

app.use('/api/v1/action', actionRouter);


app.listen(PORT , ()=> console.log(`primary backend is listeing on PORT ${PORT}`))