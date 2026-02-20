import e from "express";
const router = e.Router();



router.post("/user-register", userRegiste); // working fine
router.post("/user-login", userLogin); // working fine
router.post("/user-profile", authUser, userProfile); //  workingfine
router.get("/user-logout", logoutUser); // working fine
router.get("/user-refresh-token", userRefreshToken); // working fine

export default router;
