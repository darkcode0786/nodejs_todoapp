import express from "express";
import userRouter from "./routes/route.js";
import taskRouter from "./routes/task.js";
import cors from "cors";

import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";

export const app = express();

config({
    path: "./data/config.env",
});

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","PUT","POST","DELETE"],
    Credential:true
}))

app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

app.get("/", (req, res) => {
    res.send("hello")
});

app.use(errorMiddleware);  





