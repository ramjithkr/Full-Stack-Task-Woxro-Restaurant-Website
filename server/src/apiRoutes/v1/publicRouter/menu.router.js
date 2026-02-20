import e from "express";
import * as menuController from "../../../controllers/publicControllers/menu.controller.js";

const router = e.Router();

// public routess/

router.get("/all-menus", menuController.getAllMenus);
router.get("/:id", menuController.getMenu);

export default router;
