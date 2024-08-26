import express from "express";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";
import { router as authRouter } from "./routes/authRoutes.js";
import { router as protectedRouter } from "./routes/protectedRoutes.js";
import connectDB from "./config/connectDB.js";
import { verifyToken } from "./middlewares/verifyToken.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";

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
app.use(morgan("dev"));
//  - Cookie parser
app.use(cookieParser());

app.disable("x-powered-by");

// Home page
app.get("/", (req, res) => {
  res.send("Hello world");
});

// authRouter => /signup GET & POST, /login GET & POST, /logout GET
app.use("/auth", authRouter);

// protectedRouter => /protected GET, /protected/user
app.use("/protected", verifyToken, protectedRouter);

connectDB().then(() => {
  try {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}...`);
    });
  } catch (err) {
    console.log("Cannot connect to the server");
  }
});
