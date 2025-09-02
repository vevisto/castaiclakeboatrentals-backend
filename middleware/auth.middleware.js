import jwt from "jsonwebtoken";
import { ROLE } from "../constant/constant.js";

export const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};


export const isAdmin = (req, res, next) => {
  if (req.user.role !== ROLE.USER) {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};
