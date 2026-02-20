import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
import User from "../modules/user/user.model.js";
import Admin from "../modules/admin/admin.model.js";

export const authUser = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return next(new AppError("Not authorized, token missing", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new AppError("User no longer exists", 401));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new AppError("Invalid or expired token", 401));
  }
};

export const authAdmin = async (req, res, next) => {
  try {
    const adminToken = req.cookies?.adminToken;

    if (!adminToken) {
      return next(new AppError("Not authorized, token missing", 401));
    }

    const decoded = jwt.verify(adminToken, process.env.ADMIN_JWT_SECRET);

    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return next(new AppError("Admin no longer exists"), 401);
    }

    req.admin = admin;
    next();
  } catch (error) {
    return next(new AppError("Invalid or expired token", 401));
  }
};
