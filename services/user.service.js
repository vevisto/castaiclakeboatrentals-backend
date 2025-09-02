import { User } from "../models/user.model.js";
import { generateToken } from "../utils/jwt.js";
import transporter from "./emails.service.js";
import { deleteImage } from "./fileUpload.service.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const UserRegisterService = async (data) => {
    const { fullName, email, phone, password } = data;
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ fullName, email, phone, password: hashed, isVerified: false });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    const url = `${process.env.CLIENT_URL}/verify-email/${token}`;
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Verify your email',
        html: `<p>Hi ${user.fullName}, please verify your email by clicking <a href="${url}">this link</a>.</p>`,
    });
    return user;
};

export const UserLoginService = async ({ email, password }) => {
    try {
        const user = await User.findOne({ email });
        if (!user) throw new Error('User not found');
        if (!user.isVerified) throw new Error('User is not verified');
        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new Error('Invalid credentials');
        const token = generateToken(user);
        return { user, token };
    } catch (error) {
        throw error;
    }
};

export const getAllUsersService = async () => {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    return users;
};

export const getUserByIdService = async (id) => {
    return await User.findById(id).populate('roleId');
};

export const updateUserByIdService = async (id, data) => {
    const user = await User.findById(id);
    if (!user) throw new Error('User not found');
    if (user.profileImage && data?.profileImage) {
        await deleteImage(user.profileImage);
    }
    if (user.document && data?.document) {
        await deleteImage(user.document);
    }
    return await User.findByIdAndUpdate(id, data, { new: true });
};

export const deleteUserByIdService = async (id) => {
    const user = await User.findById(id);
    if (!user) throw new Error('User not found');
    if (user.profileImage) {
        await deleteImage(user.profileImage);
    }
    return await User.findByIdAndDelete(id);
};