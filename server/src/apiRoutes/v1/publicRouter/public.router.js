import express from "express";

const router = express.Router();

import menuRouters from "./menu.router.js";
import openHoursRouters from "./openHours.router.js";
// import blogRouters from "./blog.router.js";
// import reservationRoutes from "./reservations.router.js";

router.use("/menu", menuRouters);
router.use("/hours", openHoursRouters);
// router.use("/reservations", reservationRoutes);
// router.use("/blogs", blogRouters);

export default router;
