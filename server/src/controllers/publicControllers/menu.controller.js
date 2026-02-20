import * as menuService from "../../services/public/menu.service.js";
// import AppError from "../../utils/AppError.js";

export const getAllMenus = async (req, res, next) => {
  try {
    const items = await menuService.getAllMenuItems({ isAvailable: true });
    if (!items) {
      return res.status(200).json({
        message: "No menu items found",
        success: true,
      });
    }

    res.status(200).json({
      message: "Menu items retrieved successfully ",
      success: true,
      data: items,
    });
  } catch (error) {
    console.error("get All Menus Error:", error);
    next(error);
  }
};

export const getMenu = async (req, res, next) => {
  try {
    const items = await menuService.getMenuById(req.params.id);
    if (!items) {
      return next(new AppError("No menu items found", 404));
    }
    res.status(200).json({
      message: "menu items retrieved successfully",
      success: true,
      data: items,
    });
  } catch (error) {
    next(error);
    console.error("Get Menu Error:", error);
  }
};
