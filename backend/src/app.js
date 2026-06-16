const express = require("express");
const cors = require("cors");



// const dns = require('dns');
// dns.setServers(['8.8.8.8', '1.1.1.1']);



const healthRoutes = require("./routes/healthRoutes");
const testRoutes = require("./routes/testRoutes");
const authRoutes = require("./routes/authRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || process.env.FRONTEND_URL || "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "Backend is running",
  });
});

app.use("/api/health", healthRoutes);
app.use("/api/test", testRoutes);
app.use("/api/auth", authRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
