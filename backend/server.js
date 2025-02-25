const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Ruta de prueba para verificar que el backend funciona
app.get("/api", (req, res) => {
    res.json({ message: "API funcionando en el backend 🚀" });
});

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));

