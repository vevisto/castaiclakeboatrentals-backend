import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true },
  phone:  { type: String },
  address:  { type: String },
  addressLineTo:  { type: String },
  city:  { type: String },
  state:  { type: String },
  zipCode:  { type: String },
}, { timestamps: true });

export const Customer = mongoose.model('Customer', customerSchema);
