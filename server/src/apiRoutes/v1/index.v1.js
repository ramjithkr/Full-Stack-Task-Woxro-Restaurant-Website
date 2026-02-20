import express from "express";
const v1Router = express.Router();

import adminAuthRouter from "./adminRouters/admin.auth.routers.js";
import adminRouter from "./adminRouters/admin.routers.js";

import publicRouter from "./publicRouter/public.router.js";

// import userAuthRouter from "./userRouters/user.auth.routers.js";

// import { authLimiter } from "../../middlewares/rateLimit.middleware.js";

v1Router.use("/admin", adminAuthRouter, adminRouter);

// v1Router.use("/user", authLimiter, userAuthRouter);

v1Router.use("/public", publicRouter);

// v1Router.get("/public", (req, res) => {
//   res.json({ message: "Welcome to the public v1" });
// });

// router.get("/", (req, res) => {
//   res.json({ message: "Welcome to the Admin " });
// });

export default v1Router;
