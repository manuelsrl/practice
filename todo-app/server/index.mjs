import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send("Hello world")
})


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`El servidor está escuchando en el puerto ${PORT}...`);
});