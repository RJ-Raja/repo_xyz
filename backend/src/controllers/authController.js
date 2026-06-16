const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateOtp = require("../utils/generateOtp");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");

const getOtpExpiryDate = () => {
  const minutes = Number(process.env.OTP_EXPIRES_IN_MINUTES || 10);
  return new Date(Date.now() + minutes * 60 * 1000);
};

const toSafeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  isEmailVerified: user.isEmailVerified,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

const saveHashedOtp = async (user) => {
  const otp = generateOtp();
  user.otp = await bcrypt.hash(otp, 10);
  user.otpExpiresAt = getOtpExpiryDate();
  await user.save();
  return otp;
};

const sendOtpEmail = async ({ email, name, otp, purpose }) => {
  const title = purpose === "login" ? "Login verification OTP" : "Email verification OTP";

  await sendEmail({
    to: email,
    subject: title,
    text: `Hello ${name}, your OTP is ${otp}. It expires in ${
      process.env.OTP_EXPIRES_IN_MINUTES || 10
    } minutes.`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h2>${title}</h2>
        <p>Hello ${name},</p>
        <p>Your OTP is:</p>
        <p style="font-size: 24px; font-weight: bold; letter-spacing: 4px;">${otp}</p>
        <p>This OTP expires in ${process.env.OTP_EXPIRES_IN_MINUTES || 10} minutes.</p>
      </div>
    `,
  });
};

const handleEmailFailure = async ({ user, purpose }) => {
  if (purpose === "register" && user?._id) {
    await User.findByIdAndDelete(user._id);
    return;
  }

  if (user) {
    user.otp = undefined;
    user.otpExpiresAt = undefined;
    await user.save();
  }
};

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Name, email, and password are required");
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      res.status(409);
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      isEmailVerified: false,
    });

    const otp = await saveHashedOtp(user);
    try {
      await sendOtpEmail({ email: user.email, name: user.name, otp, purpose: "register" });
    } catch (error) {
      await handleEmailFailure({ user, purpose: "register" });
      return res.status(error.statusCode || 503).json({
        success: false,
        message: "Email service is not configured. OTP cannot be sent.",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Registration successful. OTP sent to email.",
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
};

const verifyOtpForUser = async ({ email, otp }) => {
  if (!email || !otp) {
    const error = new Error("Email and OTP are required");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() }).select(
    "+otp +otpExpiresAt"
  );

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  if (!user.otp || !user.otpExpiresAt) {
    const error = new Error("OTP not found. Please request a new OTP.");
    error.statusCode = 400;
    throw error;
  }

  if (user.otpExpiresAt < new Date()) {
    const error = new Error("OTP expired. Please request a new OTP.");
    error.statusCode = 400;
    throw error;
  }

  const isOtpValid = await bcrypt.compare(otp, user.otp);

  if (!isOtpValid) {
    const error = new Error("Invalid OTP");
    error.statusCode = 400;
    throw error;
  }

  user.otp = undefined;
  user.otpExpiresAt = undefined;
  return user;
};

const verifyRegisterOtp = async (req, res, next) => {
  try {
    const user = await verifyOtpForUser(req.body);
    user.isEmailVerified = true;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      token: generateToken(user._id),
      user: toSafeUser(user),
    });
  } catch (error) {
    if (error.statusCode) {
      res.status(error.statusCode);
    }
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("Email and password are required");
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() }).select("+password");

    if (!user) {
      res.status(401);
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401);
      throw new Error("Invalid email or password");
    }

    const otp = await saveHashedOtp(user);
    try {
      await sendOtpEmail({ email: user.email, name: user.name, otp, purpose: "login" });
    } catch (error) {
      await handleEmailFailure({ user, purpose: "login" });
      return res.status(error.statusCode || 503).json({
        success: false,
        message: "Email service is not configured. OTP cannot be sent.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Login OTP sent to email.",
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
};

const verifyLoginOtp = async (req, res, next) => {
  try {
    const user = await verifyOtpForUser(req.body);

    if (!user.isEmailVerified) {
      user.isEmailVerified = true;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Login verified successfully",
      token: generateToken(user._id),
      user: toSafeUser(user),
    });
  } catch (error) {
    if (error.statusCode) {
      res.status(error.statusCode);
    }
    next(error);
  }
};

const getProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    user: toSafeUser(req.user),
  });
};

module.exports = {
  registerUser,
  verifyRegisterOtp,
  loginUser,
  verifyLoginOtp,
  getProfile,
};
