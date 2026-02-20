import express from "express";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import cors from "cors";
import cookieParser from "cookie-parser";

import apiRouter from "./src/apiRoutes/index.api.js";
import notFound from "./src/middlewares/notFound.middleware.js";
import errorHandler from "./src/middlewares/error.middleware.js";
import morganMiddleware from "./src/middlewares/morgan.middleware.js";

const app = express();

/* ---------- Security & Core Middlewares ---------- */
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

/* ---------- Logging ---------- */
app.use(morganMiddleware);

/* ---------- Routes ---------- */
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Server is running",
  });
});

app.use("/api", apiRouter);

/* ---------- Error Handlers ---------- */
app.use(notFound);
app.use(errorHandler);

export default app;
