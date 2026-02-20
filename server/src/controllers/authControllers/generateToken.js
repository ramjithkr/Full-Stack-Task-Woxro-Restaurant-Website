import jwt from "jsonwebtoken";
import AppError from "../../utils/AppError.js";
import Admin from "../../modules/admin/admin.model.js";

export const userRefreshToken = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return next(new AppError("No token found", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const newToken = jwt.sign(
      { id: decoded.id, role: decoded.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES || "7d" },
    );

    res.cookie("token", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      status: "success",
      message: "Token refreshed successfully",
    });
  } catch (error) {
    return next(new AppError("Invalid or expired token", 401));
  }
};

export const adminRefreshToken = async (req, res, next) => {
  try {
    const token = req.cookies?.adminToken;

    if (!token) {
      return next(new AppError("No admin token found", 401));
    }

    const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET);

    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return next(new AppError("Admin no longer exists", 401));
    }

    const newToken = jwt.sign(
      { id: decoded.id, role: decoded.role },
      process.env.ADMIN_JWT_SECRET,
      { expiresIn: process.env.ADMIN_JWT_EXPIRES || "7d" },
    );

    res.cookie("adminToken", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      status: "success",
      message: "Admin token refreshed successfully",
    });
  } catch (error) {
    next(new AppError("Invalid or expired admin token", 401));
  }
};
