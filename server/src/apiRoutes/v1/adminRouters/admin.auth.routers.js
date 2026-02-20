import e from "express";
import * as adminAuthController from "../../../controllers/adminControllers/admin.auth.controller.js";

import { authAdmin } from "../../../middlewares/auth.middleware.js";
import { adminRefreshToken } from "../../../controllers/authControllers/generateToken.js";

const router = e.Router();

router.post("/admin-register", adminAuthController.adminRegister); // working fine
router.post("/admin-login", adminAuthController.adminLogin); //working fine
router.post("/admin-profile", authAdmin, adminAuthController.adminProfile); // working fine
router.get("/admin-logout", authAdmin, adminAuthController.adminLogout); // working fine
router.get("/admin-refresh-token", adminRefreshToken);

export default router;
