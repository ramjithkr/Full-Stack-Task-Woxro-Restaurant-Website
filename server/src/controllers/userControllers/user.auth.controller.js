import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/user/user.model.js";
import AppError from "../../utils/AppError.js";
import User from "../../modules/user/user.model.js";

export const userRegister = async (req, res, next) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
      return next(new AppError("All fields are required", 400));
    }

    if (password !== confirmPassword) {
      return next(new AppError("Passwords do not match", 400));
    }

    if (password.length < 8) {
      return next(new AppError("Password must be at least 8 characters", 400));
    }

    const existingUser = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    if (existingUser) {
      return next(new AppError("Email is already registered", 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User .create({
      name: username.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      role: "user",
    });

    return res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("User Register Error:", error);
    next(error);
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("Email and password are required", 400));
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    }).select("+password");

    if (!user) {
      return next(new AppError("Invalid email or password", 401));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return next(new AppError("Invalid email or password", 401));
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES || "7d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      status: "success",
      message: "Login successful",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("User Login Error:", error);
    next(error);
  }
};

export const userProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const user = await User.findOne({ _id: userId }).select("-password");

    if (!user) {
      return next(new AppError("User not found", 400));
    }

    return res.status(200).json({
      status: "success",
      message: "User profile fetched successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("User Profile Error:", error);
    next(error);
  }
};

export const logoutUser = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};
