import User from "../models/User.js";

// Function to handle GET request for signup
export const signupGet = (req, res) => {
  res.send("Signup page");
};

// Function to handle POST request for signup
export const signupPost = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).send("User not created");
  }
};

// Function to handle GET request for login
export const loginGet = (req, res) => {
  res.send("Login page");
};

// Function to handle POST request for login
export const loginPost = (req, res) => {
  res.send("Login page POST method");
};

// Function to handle GET request for logout
export const logoutGet = (req, res) => {
  res.send("Logout page");
};
