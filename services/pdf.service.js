import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const generateBookingPDF = (booking, user, boat) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const filePath = path.join(
        "uploads",
        `booking_receipt_${booking._id}.pdf`
      );

      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      // Header
      doc.fontSize(18).text("Boat Rental Payment Receipt", { align: "center" });
      doc.moveDown();

      // Receipt Info
      doc.fontSize(12).text(`Receipt ID: ${booking._id}`);
      doc.text(`Date: ${new Date().toLocaleString()}`);
      doc.moveDown();

      // Customer Info
      doc.fontSize(14).text("Customer Information", { underline: true });
      doc.text(`Name: ${user.firstName}`);
      doc.text(`Email: ${user.email}`);
      doc.moveDown();

      // Boat Info
      doc.fontSize(14).text("Boat Information", { underline: true });
      doc.text(`Boat: ${boat.name}`);
      doc.text(`Boat Type: ${booking.boatType}`);
      doc.moveDown();

      // Payment Info
      doc.fontSize(14).text("Payment Details", { underline: true });
      doc.text(`Rental Date: ${booking.rentalDate}`);
      doc.text(`Guest Count: ${booking.guestCount}`);
      doc.text(`Rent Time: ${booking.rentTime}`);
      doc.text(`Amount Paid: $${booking.amountPaid}`);
      doc.text(`Deposit: $${booking.depositAmount}`);
      doc.text(`Payment Status: ${booking.paymentStatus}`);
      doc.moveDown();

      doc.end();

      stream.on("finish", () => resolve(filePath));
    } catch (err) {
      reject(err);
    }
  });
};
