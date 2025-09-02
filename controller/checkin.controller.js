import { SendResponse } from "../lib/SendReponse.js";
import { Booking } from "../models/booking.model.js";
import CheckInModel from "../models/checkin.model.js";

export const createCheckIn = async (req, res) => {
    try {
        const hullExterior = JSON.parse(req.body.hullExterior || '{}');
        const motorPropeller = JSON.parse(req.body.motorPropeller || '{}');
        const fuelTankLevel = JSON.parse(req.body.fuelTankLevel || '{}');
        const batteryElectrical = JSON.parse(req.body.batteryElectrical || '{}');
        const safetyEquipment = JSON.parse(req.body.safetyEquipment || '{}');
        const otherAccessories = JSON.parse(req.body.otherAccessories || '{}');

        const staffSignature = req.files?.staffSignature?.[0]?.filename || null;
        const renterSignature = req.files?.renterSignature?.[0]?.filename || null;

        const checkIns = await CheckInModel.create({
            bookingId: req.body.bookingId,
            date: req.body.date,
            renterName: req.body.renterName,
            boatNumber: req.body.boatNumber,
            engineSerial: req.body.engineSerial,

            hullExterior,
            motorPropeller,
            fuelTankLevel,
            batteryElectrical,
            safetyEquipment,
            otherAccessories,

            staffSignature,
            renterSignature,
        });


        // Update Booking to mark it as checked out
        await Booking.findByIdAndUpdate(checkIns.bookingId, { checkIn: true });

        SendResponse(res, 200, "checkIns created successfully", checkIns);
    } catch (error) {
        console.error("checkIns creation error:", error);
        res.status(500).json({ error: error.message });
    }
};


export const getAllCheckIns = async (req, res) => {
    try {
        const checkInss = await CheckInModel.find().populate("bookingId").sort({ createdAt: -1 });
        SendResponse(res, 200, "checkInss fetched successfully", checkInss);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getCheckInById = async (req, res) => {
    try {
        const checkIns = await CheckInModel.findById(req.params.id).populate("bookingId");
        SendResponse(res, 200, "checkIns fetched successfully", checkIns);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateCheckInById = async (req, res) => {
    try {
        const checkIns = await CheckInModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        SendResponse(res, 200, "checkIns updated successfully", checkIns);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}