import { SendResponse } from "../lib/SendReponse.js";
import { Article } from "../models/article.model.js";
import { deleteImage } from "../services/fileUpload.service.js";

export const createArticle = async (req, res) => {
    try {
        const image = req.file ? req.file.filename : null;
        let tags = [];
        try {
            tags = JSON.parse(req.body.tags || '[]');
        } catch (error) {
            return res.status(400).json({ error: "Invalid tags format" });
        }
        const article = await Article.create({ ...req.body, image, tags });
        SendResponse(res, 201, "Article created successfully", article);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find();
        SendResponse(res, 200, "Articles fetched successfully", articles);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getArticleById = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        SendResponse(res, 200, "Article fetched successfully", article);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateArticleById = async (req, res) => {
    try {
        const image = req.file && req.file.filename;
        const article = await Article.findById(req.params.id);
        let tags = [];
        try {
            tags = JSON.parse(req.body.tags || '[]');
        } catch (error) {
            return res.status(400).json({ error: "Invalid tags format" });
        }
        if (article.image && image) {
            deleteImage(article.image);
        }
        const updatedArticle = await Article.findByIdAndUpdate(req.params.id, { ...req.body, image, tags }, { new: true });
        SendResponse(res, 200, "Article updated successfully", updatedArticle);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteArticleById = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (article.image) {
            deleteImage(article.image);
        }
        await Article.findByIdAndDelete(req.params.id);
        SendResponse(res, 200, "Article deleted successfully");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};