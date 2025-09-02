
import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: { type: String },
    status: { type: Boolean, default: true }
})

const ProductTypeSchema = new mongoose.Schema({
    name: { type: String },
    status: { type: Boolean, default: true }
})
export const Category = mongoose.model("Category", CategorySchema);
export const ProductType = mongoose.model("ProductType", ProductTypeSchema);