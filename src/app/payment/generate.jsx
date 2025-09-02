import jsPDF from "jspdf";


const generateReceipt = (booking) => {
  const doc = new jsPDF("p", "pt", "a4");

  // Colors
  const primaryColor = "#4B8063"; // green
  const grayText = "#555";

  // Logo (optional: replace with your logo as base64)
  // doc.addImage(logoBase64, "PNG", 230, 20, 140, 50);

  // Check Circle
  doc.setDrawColor(primaryColor);
  doc.setLineWidth(1.5);
  doc.circle(300, 100, 25); // circle
  doc.setFontSize(28);
  doc.setTextColor(primaryColor);
  doc.text("✓", 293, 110);

  // Title
  doc.setFontSize(16);
  doc.setTextColor(primaryColor);
  doc.setFont("helvetica", "bold");
  doc.text("Transaction Successful", 210, 160);

  doc.setFontSize(20);
  doc.setTextColor("#333");
  doc.text("Boat Rental Payment Receipt", 140, 190);

  // Receipt ID + Date
  doc.setFontSize(11);
  doc.setTextColor(grayText);
  doc.text(`Receipt ID: ${booking._id}`, 40, 230);
  doc.text(
    `Date: ${new Date(booking.updatedAt).toLocaleString()}`,
    40,
    250
  );

  // ========== CUSTOMER INFO ==========
  doc.setFillColor("#f9f9f9");
  doc.roundedRect(40, 270, 520, 90, 8, 8, "F");

  doc.setFontSize(13).setTextColor("#000").setFont("helvetica", "bold");
  doc.text("Customer Information", 50, 290);

  doc.setFont("helvetica", "normal").setFontSize(11).setTextColor(grayText);
  doc.text(`Name: ${booking.userId.firstName} ${booking.userId.lastName}`, 50, 310);
  doc.text(`Email: ${booking.userId.email}`, 50, 325);
  doc.text(`Phone: ${booking.userId.phone}`, 50, 340);

  // ========== BOAT INFO ==========
  doc.setFillColor("#f9f9f9");
  doc.roundedRect(40, 370, 520, 90, 8, 8, "F");

  doc.setFont("helvetica", "bold").setFontSize(13).setTextColor("#000");
  doc.text("Boat Information", 50, 390);

  doc.setFont("helvetica", "normal").setFontSize(11).setTextColor(grayText);
  doc.text(`Boat: ${booking.boatId.name}`, 50, 410);
  doc.text(`Boat Code: ${booking.boatId.code}`, 50, 425);
  doc.text(`Boat Type: ${booking.boatType}`, 50, 440);

  // ========== PAYMENT INFO ==========
  doc.setFillColor("#f9f9f9");
  doc.roundedRect(40, 470, 520, 110, 8, 8, "F");

  doc.setFont("helvetica", "bold").setFontSize(13).setTextColor("#000");
  doc.text("Payment Details", 50, 490);

  doc.setFont("helvetica", "normal").setFontSize(11).setTextColor(grayText);
  doc.text(`Rental Date: ${booking.rentalDate}`, 50, 510);
  doc.text(`Guest Count: ${booking.guestCount}`, 50, 525);
  doc.text(`Rent Time: ${booking.rentTime}`, 50, 540);
  doc.text(`Amount Paid: $${booking.amountPaid}`, 50, 555);
  doc.text(`Deposit: $${booking.depositAmount}`, 50, 570);
  doc.text(`Payment Status: ${booking.paymentStatus}`, 50, 585);

  // Footer Button
  doc.setFillColor(primaryColor);
  doc.roundedRect(220, 650, 150, 35, 15, 15, "F");

  doc.setTextColor("#fff").setFontSize(12).setFont("helvetica", "bold");
  doc.text("Visit Website", 250, 672);

  doc.save(`receipt_${booking._id}.pdf`);
};

export default generateReceipt;
