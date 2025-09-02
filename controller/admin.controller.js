import { SendResponse } from '../lib/SendReponse.js';
import * as adminService from '../services/admin.service.js';
import { generateToken } from '../utils/jwt.js';
export const register = async (req, res) => {
  try {
    const admin = await adminService.register(req.body);
    res.status(201).json({ message: "Registered", admin });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const admin = await adminService.login(req.body);
    const token = generateToken(admin);



    res.json({
      token,
      email: admin.email,
      role: admin.role,
      id: admin._id,
      name: admin.name,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


export const getUsers = async (req, res) => {
  try {
    const users = await adminService.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getAdminById = async (req, res) => {
  try {
    const admin = await adminService.getAdminById(req.params.id); 
    res.json({
      message: "Admin fetched",
      success: true,
      data: admin,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const updateAdminById = async (req, res) => {
  try {
    const imagePath = req.file && req.file.filename;
    const admin = await adminService.updateAdminById(req.params.id, { ...req.body, profileImage: imagePath });
    SendResponse(res, 200, "Admin updated", admin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

