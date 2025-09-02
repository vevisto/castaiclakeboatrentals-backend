
import mongoose from "mongoose";

const boatCategorySchema = new mongoose.Schema({
    name: { type: String, required: true  },
    icon: { type: String, required: true },
    status: { type: Boolean, default: true },
}, { timestamps: true });

export const BoatCategory = mongoose.model('BoatCategory', boatCategorySchema);