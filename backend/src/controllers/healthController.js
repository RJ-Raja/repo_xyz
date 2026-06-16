const { getSmtpStatus } = require("../config/smtp");

const getHealthStatus = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is running",
    environment: process.env.NODE_ENV || "development",
    emailService: getSmtpStatus().configured ? "configured" : "not_configured",
    timestamp: new Date().toISOString(),
  });
};

module.exports = {
  getHealthStatus,
};
