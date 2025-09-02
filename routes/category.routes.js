
import express from 'express';

const router = express.Router();
import { auth } from '../middleware/auth.middleware.js';

import * as categoryController from '../controller/category.controller.js';

router.post("/category", auth, categoryController.createCategory)
router.patch("/category/:id", auth, categoryController.updateCategoryById)
router.get("/category", auth, categoryController.getAllCategory)
router.delete("/category/:id", auth, categoryController.deleteCategoryById)

// Product type routes
router.post("/product-type", auth, categoryController.createProductType)
router.patch("/product-type/:id", auth, categoryController.updateProductTypeById)
router.get("/product-type", auth, categoryController.getAllProductType)
router.delete("/product-type/:id", auth, categoryController.deleteProductTypeById)
export default router;