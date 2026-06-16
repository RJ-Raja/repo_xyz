const mongoose = require("mongoose");
const { v2: cloudinary } = require("cloudinary");

const getTestMessage = async (req, res, next) => {
  try {
    const cloudinaryConfigured = Boolean(
      process.env.CLOUDINARY_CLOUD_NAME &&
        process.env.CLOUDINARY_API_KEY &&
        process.env.CLOUDINARY_API_SECRET
    );

    res.status(200).json({
      success: true,
      message: "Frontend and backend connection is working",
      mongodbConnected: mongoose.connection.readyState === 1,
      cloudinaryConfigured,
      cloudinaryCloudName: cloudinary.config().cloud_name || null,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTestMessage,
};
