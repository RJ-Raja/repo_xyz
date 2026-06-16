require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/db");
const connectCloudinary = require("./src/config/cloudinary");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  const dbConnected = await connectDB();

  if (!dbConnected) {
    console.error("Server startup stopped because MongoDB is required.");
    process.exit(1);
  }

  try {
    connectCloudinary();
  } catch (error) {
    console.error("Cloudinary configuration failed:", error.message);
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
