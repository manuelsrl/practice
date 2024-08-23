import { Router } from "express";
import {
  signupGet,
  signupPost,
  loginGet,
  loginPost,
  logoutGet,
} from "../controllers/authControllers.js";

const router = Router();

// Route for signup (GET)
router.get("/signup", signupGet);

// Route for signup (POST)
router.post("/signup", signupPost);

// Route for login (GET)
router.get("/login", loginGet);

// Route for login (POST)
router.post("/login", loginPost);

// Route for logout (GET)
router.get("/logout", logoutGet);

export { router };
