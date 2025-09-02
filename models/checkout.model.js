import mongoose from "mongoose";


const checkoutSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
  damageReport: { type: String, default: "" },
  photosTaken: { type: Boolean, default: false },
  photoRef: { type: String, default: "" },
  chargesApplied: { type: Boolean, default: false },
  amount: { type: Number, default: 0 },
  reason: { type: String, default: "" },

  renterDate: { type: String, default: "" },
  renterSignature: { type: String, default: "" },
  staffSignature: { type: String, default: "" },
  staffDate: { type: String, default: "" },
});

export default mongoose.model("Checkout", checkoutSchema);
