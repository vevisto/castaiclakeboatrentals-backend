import { SendResponse } from "../lib/SendReponse.js";
import { Contact } from "../models/contact.model.js";

export const createContactData = async (req, res) => {
  try {
    const contactData = await Contact.create(req.body);
    SendResponse(res, 200, "Message received", contactData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllContactData = async (req, res) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    SendResponse(res, 200, "All contact messages fetched", contacts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteContactDataById = async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    SendResponse(res, 200, "Contact message deleted", deleted);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
