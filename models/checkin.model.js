
import mongoose from "mongoose";
const conditionSchema = new mongoose.Schema({
    good: { type: Boolean, default: true },
    damaged: { type: Boolean, default: false },
    notes: { type: String, default: "" },
});

const CheckInSchema = new mongoose.Schema({
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
    date: { type: String, required: true },
    renterName: { type: String, required: true },
    boatNumber: { type: String },
    engineSerial: { type: String },

    hullExterior: conditionSchema,
    motorPropeller: conditionSchema,
    fuelTankLevel: conditionSchema,
    batteryElectrical: conditionSchema,
    safetyEquipment: conditionSchema,
    otherAccessories: conditionSchema,

    renterSignature: { type: String, default: "" },
    staffSignature: { type: String, default: "" },
})

export default mongoose.model("CheckIn", CheckInSchema);