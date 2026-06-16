const nodemailer = require("nodemailer");

const requiredKeys = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "SMTP_FROM"];

const getSmtpStatus = () => {
  const missingKeys = requiredKeys.filter((key) => !process.env[key]);
  const smtpPort = Number(process.env.SMTP_PORT);
  const hasInvalidPort = Boolean(process.env.SMTP_PORT) && !Number.isInteger(smtpPort);

  return {
    configured: missingKeys.length === 0 && !hasInvalidPort,
    missingKeys,
    hasInvalidPort,
  };
};

const createTransporter = () => {
  const { configured, missingKeys, hasInvalidPort } = getSmtpStatus();

  if (!configured) {
    const reasons = [];

    if (missingKeys.length > 0) {
      reasons.push(`Missing: ${missingKeys.join(", ")}`);
    }

    if (hasInvalidPort) {
      reasons.push("SMTP_PORT must be a number");
    }

    console.warn(
      `SMTP not configured. ${reasons.join(". ")}. Email features are disabled. Backend will still start.`
    );
    return null;
  }

  const smtpPort = Number(process.env.SMTP_PORT);

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

const transporter = createTransporter();

const verifySmtpConnection = async () => {
  if (!transporter) {
    console.warn("SMTP verify skipped because SMTP is not configured.");
    return false;
  }

  try {
    await transporter.verify();
    console.log("SMTP connection verified");
    return true;
  } catch (error) {
    console.warn(`SMTP verify failed: ${error.message}`);
    return false;
  }
};

module.exports = {
  transporter,
  getSmtpStatus,
  verifySmtpConnection,
};
