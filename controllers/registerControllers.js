import User from "../models/User.js";
import bcrypt from "bcrypt";
import { isValid, parse } from "date-fns";
import { format, differenceInYears } from "date-fns";
import { enGB } from "date-fns/locale";

// Function to handle GET request for signup
export const signupGet = (req, res) => {
  res.send("Signup page");
};

// Function to handle POST request for signup
export const signupPost = async (req, res) => {
  const { email, password, birthdate } = req.body;

  // No email, password or birthdate
  if (!email || !password || !birthdate)
    return res.status(400).json({
      message: "Email, password and birthdate are required for registration.",
    });

  // Password lenght
  if (password.length < 6)
    return res.status(400).json({
      message: "Password is too short",
    });

  // Duplicate email in DB
  const duplicate = await User.findOne({ email });
  if (duplicate) {
    return res.status(409).json({ message: "Email already registered." });
  }

  // Simple REGEX date validation with no 3th libraries
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!regex.test(birthdate)) {
    return res
      .status(400)
      .json({ message: "Invalid date format. Use DD/MM/YYYY." });
  }
  // Parsing data
  const parsedDate = parse(birthdate, "dd/MM/yyyy", new Date(), {
    locale: enGB,
  });
  // parsedDate verification
  if (!isValid(parsedDate)) {
    return res.status(400).json({ message: "Invalid date." });
  }
  // Verification of legal age
  const age = differenceInYears(new Date(), parsedDate);
  if (age < 18) {
    return res
      .status(400)
      .json({ message: "You must be at least 18 years old." });
  }

  try {
    // Password encryption
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store the new user with email and hashed password
    const newUser = new User({
      email,
      password: hashedPassword,
      birthdate: parsedDate,
    });
    await newUser.save();
    return res
      .status(201)
      .json({ message: "User created successfully", newUser });
  } catch (err) {
    console.log(err);
    res.status(500).send("User not created");
  }
};
