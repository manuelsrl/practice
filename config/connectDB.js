import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect("mongodb://127.0.0.1:27017/test");
    connection.STATES.connected
      ? console.log("MongoDB connected")
      : console.log("Error connecting MongoDB");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDB;
