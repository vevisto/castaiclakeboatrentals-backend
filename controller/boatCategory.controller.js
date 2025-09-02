import { SendResponse } from "../lib/SendReponse.js";
import { BoatCategory } from "../models/boatCategory.model.js";
import { deleteImage } from "../services/fileUpload.service.js";


export const createBoatCategory = async (req, res) => {
    try {
        const boatCategory = await BoatCategory.create(req.body);
        SendResponse(res, 200, "Boat category created successfully", boatCategory);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const getAllBoatCategories = async (req, res) => {
    try {
        const boatCategories = await BoatCategory.find().sort({ createdAt: -1 });
        SendResponse(res, 200, "Boat categories fetched successfully", boatCategories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const getBoatCategoryById = async (req, res) => {
    try {
        const boatCategory = await BoatCategory.findById(req.params.id);
        SendResponse(res, 200, "Boat category fetched successfully", boatCategory);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const updateBoatCategoryById = async (req, res) => {
    try {
        const boatCategory = await BoatCategory.findById(req.params.id);
        if (!boatCategory) {
            return res.status(404).json({ error: "Boat category not found" });
        }
        const updatedBoatCategory = await BoatCategory.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
        SendResponse(res, 200, "Boat category updated successfully", updatedBoatCategory);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const deleteBoatCategoryById = async (req, res) => {
    try {
        const boatCategory = await BoatCategory.findById(req.params.id);
        await BoatCategory.findByIdAndDelete(req.params.id);
        SendResponse(res, 200, "Boat category deleted successfully");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}