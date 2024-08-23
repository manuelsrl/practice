import express from "express";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";
import { router as authRouter } from "./routes/authRoutes.js";
import connectDB from "./config/connectDB.js";

const PORT = process.env.PORT || 3000;
const app = express();

// Middlewares
//  - CORS
app.use(cors(corsOptions));

//  - Public folder
app.use(express.static("public"));

//  - JSON middleware
app.use(express.json());

// Connection to MongoDB
connectDB();

// Router
//  - Auth routes
//     - /signup GET & POST
//     - /login GET & POST
//     - /logout GET

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api", authRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
