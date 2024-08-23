import User from "../models/User.js";

// Function to handle GET request for signup
export const signupGet = (req, res) => {
  res.send("Signup page");
};

// Function to handle POST request for signup
export const signupPost = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email & password are required." });

  // Duplicate on DB
  const duplicate = User.findOne({ email }) || null;
  if (duplicate !== null) {
    return res.status(409).json({ message: "Email already registered" });
  }

  try {
    const user = await User.create({ email, password });
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("User not created");
  }
};
