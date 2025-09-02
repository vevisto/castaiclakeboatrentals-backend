import express from 'express';

const router = express.Router();
import { auth } from '../middleware/auth.middleware.js';

import * as articleController from '../controller/article.controller.js';
import { uploadSingleImage } from '../services/fileUpload.service.js';

router.get("/article", articleController.getAllArticles);
router.get("/article/:id", articleController.getArticleById);
router.post("/article", auth, uploadSingleImage('image'), articleController.createArticle);
router.patch("/article/:id", auth, uploadSingleImage('image'), articleController.updateArticleById);
router.delete("/article/:id", auth, uploadSingleImage('image'), articleController.deleteArticleById);
export default router;