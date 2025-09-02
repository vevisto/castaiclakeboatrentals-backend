
import express from 'express';

const router = express.Router();


import * as checkoutController from '../controller/checkout.controller.js';
import { auth } from '../middleware/auth.middleware.js';
import { uploadThreeImages } from '../services/fileUpload.service.js';

router.post("/checkout", auth, uploadThreeImages('staffSignature', 'renterSignature', 'photoRef'), checkoutController.createCheckout);
router.patch("/checkout/:id", auth, checkoutController.updateCheckoutById);
router.get("/checkout", checkoutController.getAllCheckouts);
router.get("/checkout/:id", checkoutController.getCheckoutById);
export default router;