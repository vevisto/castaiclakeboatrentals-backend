import nodemailer from 'nodemailer';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
const transporter = nodemailer.createTransport({
  host: 'mail.nepalisoftware.com',
  port: 465,
  auth: {
    user: "contact@nepalisoftware.com",
    pass: "Nepali@Software1234",
  },
});

export const sendEmail = async (to, subject, html) => {
  try {
    if (!to) {
      throw { status: 400, message: "Recipient email (to) is required" };
    }
    if (!isValidEmail(to)) {
      throw { status: 400, message: "Invalid email format" };
    }
    const mailOptions = {
      from: `"E-commerce" <${"contact@nepalisoftware.com"}>`,
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    const status = error.status || 500;
    const message = error.message || "Failed to send email";
    throw { status, message };
  }
};

export const sendThankYouEmail = async (recipientEmail, message) => {
  const templatePath = path.join(__dirname, 'email.html');
  let htmlContent = await readFile(templatePath, 'utf8');

  const defaultMessage = "We're excited to have you onboard. Stay tuned for updates and offers!";

  htmlContent = htmlContent
    .replace('{{email}}', recipientEmail)
    .replace('{{message}}', message || defaultMessage);

  const mailOptions = {
    from: `"Boat Renter" <${"contact@nepalisoftware.com"}>`,
    to: recipientEmail,
    subject: 'Thank You!',
    text: `Hi there,\n\n${message || defaultMessage}\n\nBest regards,\nYour Team`,
    html: htmlContent,
  };

  return transporter.sendMail(mailOptions);
};


export const sendBookingEmailWithPDF = async (to, subject, text, pdfPath) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    attachments: [
      {
        filename: pdfPath.split("/").pop(),
        path: pdfPath,
        contentType: "application/pdf",
      },
    ],
  });
};
export default transporter;
