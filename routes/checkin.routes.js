
import express from "express";

const router = express.Router();


import * as checkinController from "../controller/checkin.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import { uploadTwoImages } from "../services/fileUpload.service.js";

router.get("/checkin", checkinController.getAllCheckIns);
router.get("/checkin/:id", checkinController.getCheckInById);
router.post("/checkin", uploadTwoImages('staffSignature', 'renterSignature'), auth, checkinController.createCheckIn);
router.patch("/checkin/:id", uploadTwoImages('staffSignature', 'renterSignature'), auth, checkinController.updateCheckInById);


export default router;

