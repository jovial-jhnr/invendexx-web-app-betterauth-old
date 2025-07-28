

import nodemailer from 'nodemailer';

// Configure the SMTP transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // Custom SMTP host
  port: process.env.SMTP_PORT, // SMTP port (e.g., 587 for TLS, 465 for SSL)
  secure: process.env.SMTP_SECURE === 'true', // true for SSL, false for TLS
  auth: {
    user: process.env.SMTP_USER, // SMTP username
    pass: process.env.SMTP_PASS  // SMTP password
  }
});

// Function to send email
export const sendEmail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: `"Invendexx" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text
    });
    console.log(`Email sent: ${info.messageId}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

