import mongoose from "mongoose";
import Joi from "joi";

// Email schema with Joi validator
const emailSchema = Joi.string()
  .email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  })
  .required();

// User schema with Mongoose
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: [true, "Please, enter an email"],
    validate: [
      (val) => {
        // Applying Joi validation and returning true if there was no error
        const { err } = emailSchema.validate(val);
        return !err;
      },
      "Please enter a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please, enter a password"],
  },
  birthdate: {
    type: Date,
    required: [true, "Please, enter your birthdate"],
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("user", userSchema);

export default User;
