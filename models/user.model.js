import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  profileImage: String,
  password: String,
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  dob: String,
  gender: String,
  phone: String,

  isVerified: { type: Boolean, default: false },
  otp: { type: String },
  otpExpires: { type: Date },
  otpResendCount: { type: Number, default: 0 },
  otpLastSent: { type: Date },

  resetOTP: {
    type: String,
  },
  resetOTPExpires: {
    type: Date,
  },
});

export const User = mongoose.model('User', userSchema);
