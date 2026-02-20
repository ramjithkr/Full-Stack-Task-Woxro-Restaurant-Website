import express from "express";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import cors from "cors";
import cookieParser from "cookie-parser";

import { env } from "./src/config/env.js";
import { connectDB } from "./src/config/db.js";
import logger from "./src/config/logger.js";

import apiRouter from "./src/apiRoutes/index.api.js";
import notFound from "./src/middlewares/notFound.middleware.js";
import errorHandler from "./src/middlewares/error.middleware.js";
import morganMiddleware from "./src/middlewares/morgan.middleware.js";

// INITIALIZE APP

const app = express();

// CONNECT DATABASE

connectDB();

// SECURITY & CORE MIDDLEWARES

app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());

// LOGGING

app.use(morganMiddleware);

// ROUTES

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Server is running",
  });
});

app.use("/api", apiRouter);

// ERROR HANDLERS

app.use(notFound);
app.use(errorHandler);

//  START SERVER

app.listen(env.PORT, () => {
  logger.info(
    `Server running on http://localhost:${env.PORT} (${env.NODE_ENV})`,
  );
});
