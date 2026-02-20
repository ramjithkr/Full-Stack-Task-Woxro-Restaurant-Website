import e from "express";
import * as openingController from "../../../controllers/publicControllers/openingHours.controller.js";

const router = e.Router();

router.get("/get-opening-hours", openingController.getOpeningHours);

export default router;
