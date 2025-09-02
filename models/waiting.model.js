import mongoose from "mongoose";

const waitingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String,  },
    phone: { type: String, required: true },
});

export const Waiting = mongoose.model("Waiting", waitingSchema);