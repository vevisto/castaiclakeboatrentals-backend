import express from "express";
import * as adminController from "../controller/admin.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import { uploadSingleImage } from "../services/fileUpload.service.js";
const router = express.Router();


router.post("/admin/register", adminController.register);
router.post("/admin/login", adminController.login);
router.get("/admin/:id", adminController.getAdminById);
router.patch("/admin/:id", auth, uploadSingleImage('profileImage'), adminController.updateAdminById);


export default router;