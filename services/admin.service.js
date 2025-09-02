import bcrypt from "bcrypt";
import { Admin } from "../models/admin.model.js";
import { deleteImage } from "./fileUpload.service.js";
export const register = async ({ name, email, password, address, phone }) => {
  const hashed = await bcrypt.hash(password, 10);
  return await Admin.create({ name, email, password: hashed, address, phone });
};

export const login = async ({ email, password }) => {
  const admin = await Admin.findOne({ email });
  if (!admin) throw new Error('Admin not found');

  const match = await bcrypt.compare(password, admin.password);
  if (!match) throw new Error('Invalid credentials');
  return admin;
};

export const getAllUsers = async () => {
  return await Admin.find();
};


export const getLoginHistoryByAdmin = async (adminId) => {
  return
};

export const getAdminById = async (adminId) => {
  return await Admin.findById(adminId).select('-password');
};

export const updateAdminById = async (id, data) => {
  const admin = await Admin.findById(id);
  if (!admin) {
    throw new Error('Admin not found');
  }
  if (admin.profileImage && data?.profileImage) {
    await deleteImage(admin.profileImage);
  }
  return await Admin.findByIdAndUpdate(id, data, { new: true });
};



