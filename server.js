import express from "express";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";
import { router as authRouter } from "./routes/authRoutes.js";
import connectDB from "./config/connectDB.js";
import morgan from "morgan";

const PORT = process.env.PORT || 3000;
const app = express();

// Middlewares
//  - CORS
app.use(cors(corsOptions));
//  - Public folder
app.use(express.static("public"));
//  - JSON middleware
app.use(express.json());
//  - Morgan
app.use(morgan("tiny"));

app.disable("x-powered-by");

// Home page
app.get("/", (req, res) => {
  res.send("Hello world");
});

// authRouter => /signup GET & POST, /login GET & POST /logout GET
app.use("/auth", authRouter);

connectDB().then(() => {
  try {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}...`);
    });
  } catch (err) {
    console.log("Cannot connect to the server");
  }
});
