import { SendResponse } from "../lib/SendReponse.js";
import { Booking } from "../models/booking.model.js";
import { ContractDocument } from "../models/contractDocument.model.js";

export const createContractDocument = async (req, res) => {
  try {
    const passenger1 = req.files.passenger1 ? req.files.passenger1[0].filename : null;
    const passenger2 = req.files.passenger2 ? req.files.passenger2[0].filename : null;
    const passenger3 = req.files.passenger3 ? req.files.passenger3[0].filename : null;
    const passenger4 = req.files.passenger4 ? req.files.passenger4[0].filename : null;
    const passenger5 = req.files.passenger5 ? req.files.passenger5[0].filename : null;

    const parsedBody = {
      ...req.body,
      passengerInfo: JSON.parse(req.body.passengerInfo || "[]"),
      renterInfo: JSON.parse(req.body.renterInfo || "[]"),
      renterDetailsInfo: JSON.parse(req.body.renterDetailsInfo || "false"),
      isInspectionAgree: JSON.parse(req.body.isInspectionAgree || "false"),
      isLifeJacketAndSafetyAgree: JSON.parse(req.body.isLifeJacketAndSafetyAgree || "false"),
      isCastaicLakeAgree: JSON.parse(req.body.isCastaicLakeAgree || "false"),
      isRenterWarrantyAgree: JSON.parse(req.body.isRenterWarrantyAgree || "false"),
      isSafetyVideoAgree: JSON.parse(req.body.isSafetyVideoAgree || "false"),
      isSignatureAgree: JSON.parse(req.body.isSignatureAgree || "false"),
    };

    const contractDocument = await ContractDocument.create({
      ...parsedBody,
      documents: { passenger1, passenger2, passenger3, passenger4, passenger5 },
    });
    await Booking.findByIdAndUpdate(req.body.bookingId, { contractId: contractDocument._id });

    SendResponse(res, 201, "Contract document created successfully", contractDocument);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



export const getContractDocumentById = async (req, res) => {
  try {
    const contractDocument = await ContractDocument.findById(req.params.id)
    SendResponse(res, 200, "Contract document fetched successfully", contractDocument);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export const getAllContractDocuments = async (req, res) => {
  try {
    const contractDocuments = await ContractDocument.find().populate("images");
    SendResponse(res, 200, "Contract documents fetched successfully", contractDocuments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export const getAllContractDocumentsByBookingId = async (req, res) => {
  try {
    const contractDocuments = await ContractDocument.find({ bookingId: req.params.id }).populate("bookingId");
    SendResponse(res, 200, "Contract documents fetched successfully", contractDocuments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}