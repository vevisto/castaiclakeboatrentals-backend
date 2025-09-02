import { SendResponse } from "../lib/SendReponse.js";
import { User } from "../models/user.model.js";
import { getAllUsersService, UserLoginService, UserRegisterService } from "../services/user.service.js";
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import bcrypt from 'bcrypt';
import { sendEmail } from "../services/emails.service.js";
export const getAllUsers = async (req, res) => {
    try {
        const users = await getAllUsersService();
        SendResponse(res, 200, "Users fetched successfully", users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        SendResponse(res, 200, "User fetched successfully", user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const updateUserById = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        SendResponse(res, 200, "User updated successfully", user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const userRegister = async (req, res) => {
    try {
        const user = await UserRegisterService(req.body);
        SendResponse(res, 200, "User registered successfully", user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const userLogin = async (req, res) => {
    try {
        const user = await UserLoginService(req.body);
        SendResponse(res, 200, "User logged in successfully", user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const UserVerifyEmail = async (req, res) => {
    try {
        const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(400).send('Invalid link');
        if (user.isVerified) return res.status(400).send('User already verified');
        user.isVerified = true;
        await user.save();
        res.redirect(`${process.env.CLIENT_URL}/login?verified=true`);
    } catch (error) {
        res.status(400).send('Invalid link');
    }
}
export const changedPassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword, userId } = req.body;
        if (!currentPassword || !newPassword) {
            return res.status(500).json({
                success: false,
                message: "Please provide current password and new password",
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(501).json({
                success: false,
                message: "Current password is incorrect",
            });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password changed successfully",
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
}



export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    const now = Date.now();
    const lastSent = user.otpLastSent ? new Date(user.otpLastSent).getTime() : 0;
    const cooldownTime = 60 * 1000;
    const maxResendAttempts = 5;

    if (now - lastSent < cooldownTime) {
      const wait = Math.ceil((cooldownTime - (now - lastSent)) / 1000);
      return res.status(429).json({
        success: false,
        message: `Please wait ${wait} seconds before requesting a new OTP.`,
      });
    }

    if (user.otpResendCount >= maxResendAttempts) {
      return res.status(429).json({
        success: false,
        message: "You have reached the maximum number of OTP requests. Try again later.",
      });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetOTP = otp;
    user.resetOTPExpires = new Date(now + 15 * 60 * 1000); // 15 min
    user.otpResendCount += 1;
    user.otpLastSent = new Date(now);
    await user.save();

    const html = `
      <p>Your OTP to reset password is: <b>${otp}</b></p>
      <p>This OTP is valid for 15 minutes.</p>
    `;

    await sendEmail(user.email, "Reset Your Password - OTP", html);

    res.status(200).json({
      success: true,
      message: "OTP sent to email",
    });
  } catch (error) {
    next(error);
  }
};

export const verifyOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.resetOTP !== otp || user.resetOTPExpires < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }
    res.status(200).json({
      success: true,
      message: "OTP verified",
    })
  } catch (error) {
    next(error);
  }
}

export const resetPassword = async (req, res, next) => {
  try {
    const { email, otp, password } = req.body;
    // Validate inputs
    if (!email || !otp || !password) {
      return res.status(400).json({
        success: false,
        message: "Email, OTP, and new password are required",
      });
    }

    const user = await User.findOne({ email });
    if (
      !user ||
      user.resetOTP !== otp ||
      user.resetOTPExpires < Date.now()
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    // Hash and update the password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetOTP = undefined;
    user.resetOTPExpires = undefined;
    user.otpResendCount = 0;
    user.otpLastSent = undefined;

    await user.save();
    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    next(error);
  }
};