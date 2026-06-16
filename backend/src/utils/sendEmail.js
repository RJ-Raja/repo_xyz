const { transporter } = require("../config/smtp");

const createEmailError = (message = "Email service is not configured") => {
  const error = new Error(message);
  error.statusCode = 503;
  return error;
};

const sendEmail = async ({ to, subject, text, html }) => {
  if (!transporter) {
    throw createEmailError("Email service is not configured");
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      text,
      html,
    });
  } catch (error) {
    console.warn(`Email sending failed: ${error.message}`);
    const mailError = createEmailError("Email service is not configured");
    mailError.originalError = error;
    throw mailError;
  }
};

module.exports = sendEmail;
