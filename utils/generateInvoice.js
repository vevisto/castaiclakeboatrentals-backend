import { Counter } from "../models/counter.model.js";
export const getNextInvoiceNumber = async () => {
    const counter = await Counter.findOneAndUpdate(
        { name: "invoice" },
        { $inc: { value: 1 } },
        { new: true, upsert: true } 
    );

    const number = counter.value;
    return `INV-${number.toString().padStart(4, "0")}`;
};
