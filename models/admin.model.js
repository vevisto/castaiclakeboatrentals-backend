
import mongoose from "mongoose";
import { ROLE } from "../constant/constant.js";

const adminSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: { type: String, unique: false },
  password: String,
  role: { type: String, enum: [ROLE.ADMIN, ROLE.ADMIN], default: ROLE.ADMIN },
  profileImage: { type: String },
  address: String,
  resetOTP: {
    type: String,
  },
  resetOTPExpires: {
    type: Date,
  },
  otpResendCount: {
    type: Number,
    default: 0,
  },
  otpLastSent: {
    type: Date,
  },
}, { timestamps: true });

export const Admin = mongoose.model("Admin", adminSchema);
