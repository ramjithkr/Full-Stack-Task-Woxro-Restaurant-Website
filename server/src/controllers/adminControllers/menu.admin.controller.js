import * as adminMenuService from "../../services/admin/admin.menu.service.js";
import AppError from "../../utils/AppError.js";

export const getAllMenus = async (req, res, next) => {
  try {
   

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
    console.error("Get All Menus Error:", error);
    next(error);
  }
};

export const getMenu = async (req, res, next) => {
  try {
    const items = await adminMenuService.getMenuById(req.params.id);
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

export const createMenu = async (req, res, next) => {
  try {
    const item = await adminMenuService.createMenuItem(req.body);
    if (!item) {
      return next(new AppError("Failed to create menu item", 500));
    }

    res.status(201).json({
      message: "Menu item created successfully",
      success: true,
      data: item,
    });
  } catch (error) {
    next(error);
    console.error("Create Menu Error:", error);
  }
};

export const updateMenu = async (req, res, next) => {
  try {
    const updated = await adminMenuService.updateMenuItem(
      req.params.id,
      req.body,
    );
    if (!updated) {
      return next(new AppError("Failed to update menu item", 500));
    }

    res.status(200).json({
      message: "Menu item updated successfully",
      success: true,
      data: updated,
    });
  } catch (error) {
    next(error);
    console.error("Update Menu Error:", error);
  }
};

export const deleteMenu = async (req, res, next) => {
  try {
    const deleted = await adminMenuService.deleteMenuItem(req.params.id);
    if (!deleted) {
      return next(new AppError("Failed to delete menu item ", 500));
    }
    res.status(200).json({
      message: "Menu item deleted successfully",
      success: true,
    });
  } catch (error) {
    next(error);
    console.error("Delete Menu Error:", error);
  }
};
