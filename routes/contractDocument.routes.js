
import express from 'express';

const router = express.Router();


import * as contractDocumentController from '../controller/contractDocument.controller.js';
import { auth } from '../middleware/auth.middleware.js';
import { uploadFiveImages } from '../services/fileUpload.service.js';

router.post("/contract-document", uploadFiveImages('passenger1', 'passenger2', 'passenger3', 'passenger4', 'passenger5'),contractDocumentController.createContractDocument);
router.get("/contract-document/:id", contractDocumentController.getContractDocumentById);
router.get("/contract-document/booking/:id", auth, contractDocumentController.getAllContractDocumentsByBookingId);
router.get("/contract-document", auth, contractDocumentController.getAllContractDocuments);
export default router;