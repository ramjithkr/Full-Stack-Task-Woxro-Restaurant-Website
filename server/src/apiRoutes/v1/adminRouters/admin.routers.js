import e from "express";

import * as menuController from "../../../controllers/adminControllers/menu.admin.controller.js";
import * as openingConroller from "../../../controllers/adminControllers/openingHors.admin.controller.js";
import * as reservationController from "../../../controllers/adminControllers/reservation.admin.controller.js";
import * as blogController from "../../../controllers/publicControllers/blog.controller.js";
const router = e.Router();

//Admin menu routes
router.get("/all-menus", menuController.getAllMenus);
router.get("/get-menu/:id", menuController.getMenu);
router.post("/create-menu", menuController.createMenu);
router.put("/update-menu/:id", menuController.updateMenu);
router.delete("/delete-menu/:id", menuController.deleteMenu);

// Admin opening-Hours routess

router.post("/opening-hours-data", openingConroller.creatingOpeningHours);
router.put("/opening-hours-update/:day", openingConroller.updateOpeningHour);
router.get("/get-opening-hours", openingConroller.getOpeningHours);

// Admin Reservation  public
router.get("/available-slots", reservationController.getSlots);
router.post("/create-reservation", reservationController.createReservation);

// Admin
router.get("/get-reservation", reservationController.getReservations);

// Admin blog routes

// Public
router.get("/get-blog", blogController.getBlogs);
router.get("/:slug", blogController.getBlog);

/* Admin */
router.get("/admin/all", blogController.getBlogsAdmin);

router.post("/create-blog", blogController.createBlog);

router.put("/update-blog/:id", blogController.updateBlog);

router.delete("delete-blog/:id", blogController.deleteBlog);

// router.get("/", (req, res) => {
//   res.json({ message: "Welcome to the Admin ! " });
// });

export default router;
