
import { SendResponse } from "../lib/SendReponse.js";
import { Category, ProductType } from '../models/category.model.js';

export const createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        SendResponse(res, 200, "Category created successfully", category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getAllCategory = async (req, res) => {
    try {
        const category = await Category.find();
        SendResponse(res, 200, "category fetched successfully", category);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        SendResponse(res, 200, "category fetched successfully", category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateCategoryById = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        SendResponse(res, 200, "category updated successfully", category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteCategoryById = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        SendResponse(res, 200, "category deleted successfully", category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const createProductType = async (req, res) => {
    try {
        const productType = await ProductType.create(req.body);
        SendResponse(res, 200, "Product type created successfully", productType);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getAllProductType = async (req, res) => {
    try {
        const productType = await ProductType.find();
        SendResponse(res, 200, "Product type fetched successfully", productType);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getProductTypeById = async (req, res) => {
    try {
        const productType = await ProductType.findById(req.params.id);
        SendResponse(res, 200, "Product type fetched successfully", productType);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateProductTypeById = async (req, res) => {
    try {
        const productType = await ProductType.findByIdAndUpdate(req.params.id, req.body, { new: true });
        SendResponse(res, 200, "Product type updated successfully", productType);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteProductTypeById = async (req, res) => {
    try {
        const productType = await ProductType.findByIdAndDelete(req.params.id);
        SendResponse(res, 200, "Product type deleted successfully", productType);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


