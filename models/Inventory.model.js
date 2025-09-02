import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    productType: { type: mongoose.Schema.Types.ObjectId, ref: "ProductType" },
    productName: {
      type: String,
      required: true,
    },
    totalNumberofstock: {
      type: Number,
      required: true,
      default: 0,
    },
    totalStock: {
      type: Number,
      required: true,
      default: 0,
    },
    addStock: {
      type: Number,
      default: 0,
    },
    removeStock: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    extraStock: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Inventory = mongoose.model("Inventory", inventorySchema);
