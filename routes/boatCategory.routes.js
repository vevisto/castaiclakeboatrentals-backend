
import express from 'express';

const router = express.Router();


import * as BoatCategoryController from '../controller/boatCategory.controller.js';
import { auth } from '../middleware/auth.middleware.js';

router.get("/boat-category", BoatCategoryController.getAllBoatCategories);
router.get("/boat-category/:id", BoatCategoryController.getBoatCategoryById);
router.post("/boat-category", auth, BoatCategoryController.createBoatCategory);
router.patch("/boat-category/:id", auth, BoatCategoryController.updateBoatCategoryById);
router.delete("/boat-category/:id", auth, BoatCategoryController.deleteBoatCategoryById);
export default router;