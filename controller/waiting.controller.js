import { SendResponse } from "../lib/SendReponse.js";
import { Waiting } from "../models/waiting.model.js";


export const createWaiting = async (req, res) => {
    try {
        const waiting = await Waiting.create(req.body);
        SendResponse(res, 200, "Waiting created successfully", waiting);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getAllWaiting = async (req, res) => {
    try {
        const waiting = await Waiting.find();
        SendResponse(res, 200, "Waiting fetched successfully", waiting);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getWaitingById = async (req, res) => {
    try {
        const waiting = await Waiting.findById(req.params.id);
        SendResponse(res, 200, "Waiting fetched successfully", waiting);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateWaitingById = async (req, res) => {
    try {
        const waiting = await Waiting.findByIdAndUpdate(req.params.id, req.body, { new: true });
        SendResponse(res, 200, "Waiting updated successfully", waiting);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteWaitingById = async (req, res) => {
    try {
        const waiting = await Waiting.findByIdAndDelete(req.params.id);
        SendResponse(res, 200, "Waiting deleted successfully", waiting);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}