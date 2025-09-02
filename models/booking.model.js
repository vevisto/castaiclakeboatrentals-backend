import mongoose from 'mongoose';
const familyMemberSchema = new mongoose.Schema({
  name: { type: String, },
  dateOfBirth: { type: Date, },
  photo: { type: String },
});


const inventorySchema = new mongoose.Schema({
  quantity: { type: Number, required: true },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Inventory',
    required: true,
  },
})

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  boatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Boat' },
  contractId: { type: String, required: false },
  inventory: [inventorySchema],
  boatType: { type: String },
  rentalDate: { type: String },
  amountPaid: { type: String }, // total cost
  depositAmount: { type: Number, default: 0 }, // security deposit
  stripePaymentIntentId: { type: String }, // Stripe payment reference
  refundAmount: { type: Number, default: 0 },
  refundRemarks: { type: String },
  refundStatus: {
    type: String,
    enum: ['not_refunded', 'refunded', 'partial_refunded'],
    default: 'not_refunded',
  },
  isFree: { type: Boolean, default: false },
  guestCount: { type: Number, default: 0 },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending',
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending',
  },
  familyMembers: [familyMemberSchema],
  rentTime: {
    type: String,
    enum: ['full_day', 'half_day_morning', 'half_day_evening'],
    required: true,
  },
  checkIn: { type: Boolean },
  checkOut: { type: Boolean },
  cancelNote: { type: String },
  isAdmin: { type: Boolean, default: false },
  isOnGoing: { type: Boolean, default: true },
}, { timestamps: true });

bookingSchema.virtual("checkInDetails", {
  ref: "CheckIn",
  localField: "_id",
  foreignField: "bookingId",
  justOne: true,
});

bookingSchema.virtual("checkOutDetails", {
  ref: "Checkout",
  localField: "_id",
  foreignField: "bookingId",
  justOne: true, // same reason
});

bookingSchema.set("toObject", { virtuals: true });
bookingSchema.set("toJSON", { virtuals: true });


export const Booking = mongoose.model('Booking', bookingSchema);
