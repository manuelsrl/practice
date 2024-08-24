import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello, you have acces to user protected route");
});

router.get("/account", (req, res) => {
  res.send("Here you will see your user info :)");
});

export { router };
