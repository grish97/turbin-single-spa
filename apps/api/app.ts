import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import * as ProccessEvent from "./src/services/ProccessEvent";
import AppError from "./src/services/AppError";

ProccessEvent.unhandledRejection();
ProccessEvent.uncaughtRejection();

import envConfig from "./src/configs/envConfig";
import { errorHandler } from "./src/middleware/errorHandler";

// DB connection
import connectDb from "./src/db/db";

// connect to database
connectDb();

// socket
import useSocketIo from "./src/listeners";

// routes
import authRoute from "./src/routes/auth";
import userRoute from "./src/routes/user";
import groupRoute from "./src/routes/group";
import messageRoute from "./src/routes/message";

// cors
import credentials from "./src/middleware/credentials";
import corsOptions from "./src/configs/corsOptions";

const app = express();

app.use(credentials);

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/group", groupRoute);
app.use("/api/message", messageRoute);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

const server = app.listen(envConfig.PORT, () => {
  console.log("Conected");
});

useSocketIo(server);
