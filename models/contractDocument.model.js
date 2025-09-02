
import mongoose from "mongoose";

const passengerInfoSchema = new mongoose.Schema({
  fullName: { type: String },
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  isDrivingLicense: { type: Boolean, default: false },
  drivingLicenseNumber: { type: String },
})

const contractDocumentSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
  renterInfo: { type: String },
  renterDetailsInfo: { type: String },
  passengerInfo: [passengerInfoSchema],
  isInspectionAgree: { type: Boolean, default: false },
  isLifeJacketAndSafetyAgree: { type: Boolean, default: false },
  isCastaicLakeAgree: { type: Boolean, default: false },
  isRenterWarrantyAgree: { type: Boolean, default: false },
  isSafetyVideoAgree: { type: Boolean, default: false },
  isSignatureAgree: { type: Boolean, default: false },
  documents: {
    passenger1: { type: String },
    passenger2: { type: String },
    passenger3: { type: String },
    passenger4: { type: String },
    passenger5: { type: String },
  }
});

export const ContractDocument = mongoose.model("ContractDocument", contractDocumentSchema);