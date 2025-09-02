import { SendResponse } from "../lib/SendReponse.js";
import { Boat } from "../models/boat.model.js";
import { Booking } from "../models/booking.model.js";
import CheckoutModel from "../models/checkout.model.js";
import { deleteImage } from "../services/fileUpload.service.js";


export const createCheckout = async (req, res) => {
    try {
        const staffSignature = req.files?.staffSignature?.[0]?.filename || null;
        const renterSignature = req.files?.renterSignature?.[0]?.filename || null;
        const photoRef = req.files?.photoRef?.[0]?.filename || null;

        // Create checkout record
        const checkout = await CheckoutModel.create({
            ...req.body,
            staffSignature,
            renterSignature,
            photoRef,
        });

        // Update booking: mark checkout as done
        const booking = await Booking.findByIdAndUpdate(
            checkout.bookingId,
            { checkOut: true, isOnGoing: false },
            { new: true }
        );

        if (booking?.boatId) {
            await Boat.findByIdAndUpdate(booking.boatId, { status: "idle" });
        }

        SendResponse(res, 201, "Checkout created successfully", checkout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



export const getAllCheckouts = async (req, res) => {
    try {
        const checkouts = await CheckoutModel.find().populate("bookingId").sort({ createdAt: -1 });
        SendResponse(res, 200, "checkouts fetched successfully", checkouts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getCheckoutById = async (req, res) => {
    try {
        const checkout = await CheckoutModel.findById(req.params.id).populate("bookingId");
        SendResponse(res, 200, "checkout fetched successfully", checkout);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateCheckoutById = async (req, res) => {
    try {
        const staffSignature = req.file?.staffSignature[0] && req.file.filename;
        const renterSignature = req.file?.renterSignature[0] && req.file.filename;
        const checkout = await CheckoutModel.findById(req.params.id);
        if (checkout.staffSignature && staffSignature) {
            await deleteImage(checkout.staffSignature);
        }
        if (checkout.renterSignature && renterSignature) {
            await deleteImage(checkout.renterSignature);
        }
        const checkouts = await CheckoutModel.findByIdAndUpdate(req.params.id, { ...req.body, staffSignature, renterSignature }, { new: true });
        SendResponse(res, 200, "checkout updated successfully", checkouts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

