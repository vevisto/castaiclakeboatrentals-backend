import mongoose from 'mongoose';

const boatSchema = new mongoose.Schema({
  name: { type: String, required: true },
  perfectFor: { type: [String], required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'BoatCategory', required: true },
  boatType: { type: String },
  maxPeople: { type: Number },
  feature: { type: [String] },
  boatEngine: { type: String },
  boatArea: { type: String },
  halfDayPrice: { type: Number, required: true },
  fullDayPrice: { type: Number, required: true },
  images: [{ type: String }],
  status: {
    type: String,
    enum: ['booked', 'sailing', 'idle'],
    default: 'idle',
  },
  rentTime: { type: String },
  rentDate: { type: String },
  code: { type: String },
}, { timestamps: true });

export const Boat = mongoose.model('Boat', boatSchema);
