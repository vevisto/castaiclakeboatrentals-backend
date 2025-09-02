import express from 'express';

const router = express.Router();


import * as inventoryController from '../controller/inventory.controller.js';

import { auth } from '../middleware/auth.middleware.js';

router.get("/inventory" ,inventoryController.getInventoryData);
router.get("/inventory/:id",  auth , inventoryController.getInventoryDataById);
router.post("/inventory", auth,  inventoryController.createInventoryData);
router.patch("/inventory/:id", auth,  inventoryController.updateInventoryDataById);
router.delete("/inventory/:id", auth,  inventoryController.deleteInventoryDataById);
export default router;