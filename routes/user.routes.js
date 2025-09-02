import express from 'express';
import { changedPassword, forgotPassword, getAllUsers, getUserById, resetPassword, updateUserById, userLogin, userRegister, UserVerifyEmail, verifyOTP } from '../controller/user.controller.js';
import { auth } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/user/register", userRegister);
router.post("/user/login", userLogin);
router.get("/user/verify-email/:token", UserVerifyEmail);
router.get("/user", auth, getAllUsers);
router.get("/user/:id", auth, getUserById);
router.patch("/user/:id", auth, updateUserById);
router.post("/user/change-password", auth, changedPassword);


router.post("/user/forgot-password", forgotPassword);
router.post("/user/reset-password", resetPassword);
router.post("/user/verify-otp", verifyOTP);
export default router;