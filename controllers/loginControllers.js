import User from "../models/User.js";
import bcrypt from "bcrypt";

// Function to handle GET request for login
export const loginGet = (req, res) => {
  res.send("Login page");
};

// Function to handle POST request for login
export const loginPost = async (req, res) => {
  const { email, password } = req.body;

  // No email or password
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Email & password are required to login in." });

  // Find user on DB
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "This email is not registered." });
  }

  // Encrypted password validation
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: "Incorrect password" });
  }

  res.status(200).send(`Logged as ${user.email}`);
};

// Function to handle GET request for logout
export const logoutGet = (req, res) => {
  res.send("Logout page");
};
