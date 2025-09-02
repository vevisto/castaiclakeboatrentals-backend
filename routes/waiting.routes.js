
import express from 'express';

const router = express.Router();


import * as waitingController from '../controller/waiting.controller.js';
import { auth } from '../middleware/auth.middleware.js';

router.get("/waiting-list", auth, waitingController.getAllWaiting);
router.get("/waiting-list/:id", auth, waitingController.getWaitingById);
router.post("/waiting-list", waitingController.createWaiting);
router.patch("/waiting-list/:id", auth, waitingController.updateWaitingById);
router.delete("/waiting-list/:id", auth, waitingController.deleteWaitingById);
export default router;