import mongoose from "mongoose";

const userOTPSchema = new mongoose.Schema({
  userId: String,
  otp: String,
  createdAt: Date,
  expiresAt: Date,
});

const UserOTP = mongoose.model("userOTP", userOTPSchema);

export default UserOTP;
