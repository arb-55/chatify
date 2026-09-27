import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // 👈 Ensures JWT_SECRET is loaded

export const generateToken = (userId, res) => {
    const { JWT_SECRET } = ENV;
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
    httpOnly: true, // prevents XSS attacks
    sameSite: "strict", // prevents CSRF attacks
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};