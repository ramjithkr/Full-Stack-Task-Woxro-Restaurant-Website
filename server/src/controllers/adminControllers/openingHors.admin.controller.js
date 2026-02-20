import * as adminOpeningService from "../../services/admin/adminopeningHours.service.js";
import AppError from "../../utils/AppError.js";

export const creatingOpeningHours = async (req, res, next) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return next(new AppError("No data provided", 400));
    }

    const dataHours = await adminOpeningService.createOpeningHoursService(
      req.body,
    );

    if (!dataHours) {
      return next(new AppError("Failed to create hours", 500));
    }

    res.status(201).json({
      message: "Successfully created opening hours",
      success: true,
      data: dataHours,
    });
  } catch (error) {
    console.log("creatingOpeningHours error:", error);
    next(error);
  }
};

export const getOpeningHours = async (req, res, next) => {
  try {
    const data = await adminOpeningService.getAllOpeningHoursService();

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "No opening hours found",
      });
    }

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateOpeningHour = async (req, res, next) => {
  try {
    const { day } = req.params;

    if (!day) {
      return res.status(400).json({
        success: false,
        message: "Day parameter is required",
      });
    }

    const updated = await adminOpeningService.UpsertOpeningHourService(
      day,
      req.body,
    );

    res.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};
