
import express from 'express';

const router = express.Router();

import * as BoatController from '../controller/boat.controller.js';
import { auth } from '../middleware/auth.middleware.js';
import { uploadMultipleImages } from '../services/fileUpload.service.js';

router.get("/boat", BoatController.getAllBoat);
router.get("/boat/:id", BoatController.getBoatById);
router.post("/boat", auth, uploadMultipleImages('images'), BoatController.createBoat);
router.patch("/boat/:id", auth, uploadMultipleImages('images'), BoatController.updateBoatById);
router.delete("/boat/:id", auth, BoatController.deleteBoatById);
router.get("/boat/category/:id", BoatController.getAllBoatByCategory);

export default router;