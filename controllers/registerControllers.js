import User from "../models/User.js";
import bcrypt from "bcrypt";

// Function to handle GET request for signup
export const signupGet = (req, res) => {
  res.send("Signup page");
};

// Function to handle POST request for signup
export const signupPost = async (req, res) => {
  const { email, password } = req.body;

  // No email or password
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Email & password are required for registration." });

  // Duplicate email in DB
  const duplicate = await User.findOne({ email });
  if (duplicate) {
    return res.status(409).json({ message: "Email already registered" });
  }

  try {
    // Password encryption
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store the new user with email and hashed password
    const newUser = new User({
      email,
      password: hashedPassword,
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
