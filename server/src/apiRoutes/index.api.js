import express from "express";
import v1Router from "./v1/index.v1.js";
import v2Router from "./v2/index.v2.js";

const apiRouter = express.Router();

apiRouter.use("/v1", v1Router);
apiRouter.use("/v2", v2Router);

export default apiRouter;
