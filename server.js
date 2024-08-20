import express from "express";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.get("/", (req, res) => {
  res.send("Hello world");
});

// CORS
app.use(cors(corsOptions));

app.listen(PORT, () => {
  console.log(`El servidor está escuchando en el puerto ${PORT}`);
});
