import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    return res.status(404).json({ message: "This email is not registered." });
  }

  // Encrypted password validation
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: "Incorrect password" });
  }

  // JWT sign and cookie storage
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res
    .cookie("access_token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60, // 1h
    })
    .status(200)
    .send(`Logged as ${user.email} and with token: ${token}`);
};

// Function to handle GET request for logout
export const logoutGet = (req, res) => {
  res.send("Logout page");
};
