import express from "express";
import {
  createContactData,
  getAllContactData,
  deleteContactDataById
} from "../controller/contactus.controller.js";

const router = express.Router();

router.post("/contact", createContactData);
router.get("/contact", getAllContactData);
router.delete("/contact/:id", deleteContactDataById);

export default router;
