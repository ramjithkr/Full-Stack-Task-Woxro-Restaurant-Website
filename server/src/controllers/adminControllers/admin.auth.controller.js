import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import AppError from "../../utils/AppError.js";
import Admin from "../../modules/admin/admin.model.js";

export const adminRegister = async (req, res, next) => {
  try {
    const { adminName, email, password, confirmPassword } = req.body;

    if (!adminName || !email || !password || !confirmPassword) {
      return next(new AppError("All fields are required", 400));
    }

    if (password !== confirmPassword) {
      return next(new AppError("Passwords do not match", 400));
    }

    if (password.length < 8) {
      return next(new AppError("Password must be at least 8 characters", 400));
    }

    const existingAdmin = await Admin.findOne({
      email: email.trim().toLowerCase(),
    });

    if (existingAdmin) {
      return next(new AppError("Admin already exists", 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name: adminName.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      role: "admin",
    });

    res.status(201).json({
      status: "success",
      message: "Admin registered successfully",
      data: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Admin Register Error:", error);
    next(error);
  }
};

export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("Email and password are required", 400));
    }

    const admin = await Admin.findOne({
      email: email.trim().toLowerCase(),
    }).select("+password");

    if (!admin) {
      return next(new AppError("Invalid email or password", 401));
    }
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return next(new AppError("Invalid email or password", 401));
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.ADMIN_JWT_SECRET,
      { expiresIn: process.env.ADMIN_JWT_EXPIRES || "7d" },
    );

    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      status: "success",
      message: "Admin logged in successfully",
      data: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Admin Login Error:", error);
    next(error);
  }
};

export const adminProfile = async (req, res, next) => {
  try {
    const adminId = req.admin._id;

    const admin = await Admin.findOne({ _id: adminId }).select("-password");

    if (!admin) {
      return next(new AppError("Admin not found", 404));
    }

    return res.status(200).json({
      status: "success",
      message: "Admin profile fetched successfully",

      data: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    (console.error("Admin profile Error:", error), next(error));
  }
};

export const adminLogout = async (req, res, next) => {
  res.cookie("adminToken", "", {
    httpOnly: true,
    expire: new Date(0),
  });

  res.status(200).json({
    status: "success",
    message: "Admin logged out successfully",
  });
};
