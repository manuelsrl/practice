import User from "../models/User.js";

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
