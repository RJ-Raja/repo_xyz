const mongoose = require("mongoose");
const dns = require("dns");

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
    const dnsServers = (process.env.DNS_SERVERS || "8.8.8.8,1.1.1.1")
      .split(",")
      .map((server) => server.trim())
      .filter(Boolean);

    if (!mongoUri) {
      throw new Error("Missing MONGODB_URI or MONGO_URI in backend/.env");
    }

    dns.setServers(dnsServers);

    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log("MongoDB connected");
    return true;
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    return false;
  }
};

module.exports = connectDB;
