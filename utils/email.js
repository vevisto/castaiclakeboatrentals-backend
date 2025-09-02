import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export const sendThankYouEmail = async (recipientEmail, message) => {
  const templatePath = path.join(__dirname, 'email.html');
  let htmlContent = await readFile(templatePath, 'utf8');

  const defaultMessage = "We're excited to have you onboard. Stay tuned for updates and offers!";

  htmlContent = htmlContent
    .replace('{{email}}', recipientEmail)
    .replace('{{message}}', message || defaultMessage);

  const mailOptions = {
    from: process.env.EMAIL,
    to: recipientEmail,
    subject: 'Thank You!',
    text: `Hi there,\n\n${message || defaultMessage}\n\nBest regards,\nYour Team`,
    html: htmlContent,
  };

  return transporter.sendMail(mailOptions);
};
