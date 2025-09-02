import { SendResponse } from "../lib/SendReponse.js";
import { Boat } from "../models/boat.model.js";
import { deleteImage } from "../services/fileUpload.service.js";

// GET all boats
export const getAllBoat = async (req, res) => {
  try {
    const boats = await Boat.find()
      .populate("category")
      .sort({ createdAt: -1 });
    return SendResponse(res, 200, "Boats fetched successfully", boats);
  } catch (error) {
    return SendResponse(res, 500, error.message || "Failed to fetch boats");
  }
};

// Get all boats by category id
export const getAllBoatByCategory = async (req, res) => {
  try {
    const boats = await Boat.find({ category: req.params.id })
      .populate("category")
      .sort({ createdAt: -1 });
    return SendResponse(res, 200, "Boats fetched successfully", boats);
  } catch (error) {
    return SendResponse(res, 500, error.message || "Failed to fetch boats");
  }
};

// GET boat by ID
export const getBoatById = async (req, res) => {
  try {
    const boat = await Boat.findById(req.params.id);
    if (!boat) {
      return SendResponse(res, 404, "Boat not found");
    }
    return SendResponse(res, 200, "Boat fetched successfully", boat);
  } catch (error) {
    return SendResponse(res, 500, error.message || "Failed to fetch boat");
  }
};

// CREATE new boat
export const createBoat = async (req, res) => {
  try {
    const {
      name,
      perfectFor,
      boatType,
      maxPeople,
      feature,
      boatEngine,
      boatArea,
      halfDayPrice,
      fullDayPrice,
      category,
      status,
      rentTime,
      rentDate
    } = req.body;

    if (!name || !perfectFor || !halfDayPrice || !fullDayPrice) {
      return SendResponse(
        res,
        400,
        "Missing required fields: name, perfectFor, halfDayPrice, fullDayPrice"
      );
    }

    const parsedperfectFor = JSON.parse(perfectFor);
    const parsedFeature = feature ? JSON.parse(feature) : [];

    const images = req.files?.map((file) => file.filename) || [];
    const lastBoat = await Boat.findOne().sort({ createdAt: -1 });
    let newCodeNumber = 202501;
    if (lastBoat?.code) {
      const match = lastBoat.code.match(/#f(\d+)/);
      if (match) {
        newCodeNumber = parseInt(match[1]) + 1;
      }
    }

    const generatedCode = `#f${newCodeNumber}`;

    const newBoat = new Boat({
      name,
      perfectFor: parsedperfectFor,
      boatType,
      maxPeople: Number(maxPeople),
      feature: parsedFeature,
      boatEngine,
      boatArea,
      halfDayPrice: Number(halfDayPrice),
      fullDayPrice: Number(fullDayPrice),
      images,
      category,
      status,
      rentTime,
      rentDate,
      code: generatedCode
    });

    await newBoat.save();

    return SendResponse(res, 201, "Boat created successfully", newBoat);
  } catch (error) {
    return SendResponse(res, 500, error.message || "Failed to create boat");
  }
};

// UPDATE boat by ID
export const updateBoatById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // Parse JSON fields
    if (updateData.categoryType) updateData.categoryType = JSON.parse(updateData.categoryType);
    if (updateData.feature) updateData.feature = JSON.parse(updateData.feature);
    if (updateData.perfectFor && typeof updateData.perfectFor === 'string') {
      updateData.perfectFor = JSON.parse(updateData.perfectFor);
    }

    const existingBoat = await Boat.findById(id);
    if (!existingBoat) return SendResponse(res, 404, "Boat not found");

    // Parse filenames to keep
    let existingImagesToKeep = [];
    if (updateData.existingImages) {
      existingImagesToKeep = JSON.parse(updateData.existingImages); // assuming sent as JSON string
    }

    // Get new uploaded files
    const uploadedImages = req.files?.map((file) => file.filename) || [];

    // Combine existing + new images for final update
    updateData.images = [...existingImagesToKeep, ...uploadedImages];

    // Delete old images that are not in the keep list
    const imagesToDelete = existingBoat.images.filter(
      (img) => !existingImagesToKeep.includes(img)
    );
    for (const image of imagesToDelete) {
      await deleteImage(image);
    }

    // Convert number fields
    if (updateData.maxPeople) updateData.maxPeople = Number(updateData.maxPeople);
    if (updateData.halfDayPrice) updateData.halfDayPrice = Number(updateData.halfDayPrice);
    if (updateData.fullDayPrice) updateData.fullDayPrice = Number(updateData.fullDayPrice);

    // Update the boat
    const updatedBoat = await Boat.findByIdAndUpdate(id, updateData, { new: true });

    return SendResponse(res, 200, "Boat updated successfully", updatedBoat);
  } catch (error) {
    return SendResponse(res, 500, error.message || "Failed to update boat");
  }
};


// DELETE boat by ID
export const deleteBoatById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBoat = await Boat.findByIdAndDelete(id);

    if (!deletedBoat) {
      return SendResponse(res, 404, "Boat not found");
    }

    return SendResponse(res, 200, "Boat deleted successfully", deletedBoat);
  } catch (error) {
    return SendResponse(res, 500, error.message || "Failed to delete boat");
  }
};
