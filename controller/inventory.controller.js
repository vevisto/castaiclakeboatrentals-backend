import { SendResponse } from "../lib/SendReponse.js";
import { Inventory } from "../models/Inventory.model.js";
import mongoose from "mongoose";

export const createInventoryData = async (req, res) => {
  try {
    const { addStock = 0, removeStock = 0, extraStock = 0, productType, category, ...rest } = req.body;

    // Validate ObjectIds
    if (productType && !mongoose.Types.ObjectId.isValid(productType)) {
      return res.status(400).json({ error: "Invalid productType ID" });
    }
    if (category && !mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).json({ error: "Invalid category ID" });
    }

    const totalNumberofstock = addStock;
    const totalStock = addStock - removeStock;

    let updatedExtraStock = extraStock;
    if (extraStock > 0) {
      updatedExtraStock = extraStock - addStock;
    }

    if (removeStock > 0) {
      if (totalStock < 0) {
        return res.status(400).json({ error: "Cannot remove more stock than added" });
      }
      updatedExtraStock += removeStock;
    }

    const inventoryData = await Inventory.create({
      ...rest,
      category: category || undefined,
      productType: productType || undefined, // only set if valid
      addStock: 0,
      removeStock: 0,
      totalNumberofstock,
      totalStock,
      extraStock: updatedExtraStock,
    });

    SendResponse(res, 200, "Inventory created", inventoryData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};




export const updateInventoryDataById = async (req, res) => {
  try {
    const existing = await Inventory.findById(req.params.id);
    if (!existing) return res.status(404).json({ error: "Inventory not found" });

    const { addStock = 0, removeStock = 0, ...rest } = req.body;

    let updatedExtraStock = existing.extraStock;

    // 🟢 If adding stock, deduct from extraStock
    if (addStock > 0) {
      if (existing.extraStock < addStock) {
        return res.status(400).json({ error: "Not enough extraStock available" });
      }
      updatedExtraStock -= addStock;
    }

    // 🟢 If removing stock, return it to extraStock
    if (removeStock > 0) {
      if (existing.totalStock < removeStock) {
        return res.status(400).json({ error: "Not enough stock to remove" });
      }
      updatedExtraStock += removeStock;
    }

    // Update total number of stock ever added
    const updatedTotalNumberofstock = existing.totalNumberofstock + addStock;

    // Update total stock in inventory
    const updatedTotalStock = existing.totalStock + addStock - removeStock;

    const updated = await Inventory.findByIdAndUpdate(
      req.params.id,
      {
        ...rest,
        addStock: 0,
        removeStock: 0,
        totalStock: updatedTotalStock,
        totalNumberofstock: updatedTotalNumberofstock,
        extraStock: updatedExtraStock,
      },
      { new: true }
    );

    SendResponse(res, 200, "Inventory updated", updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};






// Get all
export const getInventoryData = async (req, res) => {
  try {
    const inventoryData = await Inventory.find().populate("category").populate("productType").sort({ createdAt: -1 });
    SendResponse(res, 200, "Inventory fetched", inventoryData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get by ID
export const getInventoryDataById = async (req, res) => {
  try {
    const inventoryData = await Inventory.findById(req.params.id).populate("category").populate("productType");
    SendResponse(res, 200, "Inventory fetched", inventoryData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update




// Delete
export const deleteInventoryDataById = async (req, res) => {
  try {
    const inventoryData = await Inventory.findByIdAndDelete(req.params.id);
    SendResponse(res, 200, "Inventory deleted", inventoryData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
